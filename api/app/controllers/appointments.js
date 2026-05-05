import { google } from 'googleapis'
import { DateTime, Interval } from 'luxon'

const timezone = process.env.BUSINESS_TIMEZONE || 'America/New_York'
const businessStartHour = parseInt(process.env.BUSINESS_START_HOUR || '10', 10)
const businessEndHour = parseInt(process.env.BUSINESS_END_HOUR || '17', 10)
const slotDurationMinutes = parseInt(process.env.SLOT_DURATION_MINUTES || '40', 10)
const slotGapMinutes = parseInt(process.env.SLOT_GAP_MINUTES || '20', 10)
const lunchStartHour = parseInt(process.env.LUNCH_START_HOUR || '12', 10)
const lunchEndHour = parseInt(process.env.LUNCH_END_HOUR || '13', 10)

const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
const serviceAccountKey = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || '').replace(/\\n/g, '\n')
const credentialsKeyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS
const calendarId = process.env.GOOGLE_CALENDAR_ID

let calendar
async function getCalendarClient() {
	if (calendar) return calendar

	const calendarScopes = [
		'https://www.googleapis.com/auth/calendar',
		'https://www.googleapis.com/auth/calendar.events',
		'https://www.googleapis.com/auth/calendar.events.readonly',
		'https://www.googleapis.com/auth/calendar.readonly'
	]

	if (credentialsKeyFile) {
		const auth = new google.auth.GoogleAuth({
			keyFile: credentialsKeyFile,
			scopes: calendarScopes
		})
		const authClient = await auth.getClient()
		calendar = google.calendar({ version: 'v3', auth: authClient })
		return calendar
	}

	if (serviceAccountEmail && serviceAccountKey) {
		const auth = new google.auth.JWT({
			email: serviceAccountEmail,
			key: serviceAccountKey,
			scopes: calendarScopes
		})
		calendar = google.calendar({ version: 'v3', auth })
		return calendar
	}

	return undefined
}

function computeSlotsForDate(dateISO) {
	const dayStart = DateTime.fromISO(dateISO, { zone: timezone })
		.set({ hour: businessStartHour, minute: 0, second: 0, millisecond: 0 })
	const dayEnd = DateTime.fromISO(dateISO, { zone: timezone })
		.set({ hour: businessEndHour, minute: 0, second: 0, millisecond: 0 })
	const lunch = Interval.fromDateTimes(
		DateTime.fromISO(dateISO, { zone: timezone }).set({ hour: lunchStartHour, minute: 0 }),
		DateTime.fromISO(dateISO, { zone: timezone }).set({ hour: lunchEndHour, minute: 0 })
	)

	const slots = []
	let cursor = dayStart
	while (cursor < dayEnd) {
		const slotStart = cursor
		const slotEnd = slotStart.plus({ minutes: slotDurationMinutes })
		if (slotEnd > dayEnd) break

		const slotInterval = Interval.fromDateTimes(slotStart, slotEnd)
		if (!slotInterval.overlaps(lunch)) {
			slots.push(slotInterval)
		}
		cursor = slotEnd.plus({ minutes: slotGapMinutes })
	}
	return slots
}

function intervalsOverlapAny(interval, intervals) {
	return intervals.some(busy => interval.overlaps(busy))
}

function parseSlotDateTime(dateISO, timeStr) {
	// timeStr format: "10:00 AM - 10:40 AM"
	const [startStr, endStr] = timeStr.split(' - ')
	const start = DateTime.fromFormat(`${dateISO} ${startStr}`, 'yyyy-MM-dd h:mm a', { zone: timezone })
	const end = DateTime.fromFormat(`${dateISO} ${endStr}`, 'yyyy-MM-dd h:mm a', { zone: timezone })
	return { start, end }
}

export async function bookAppointment(req, res) {
	try {
		const { name, email, service, date, time } = req.body
		if (!name || !email || !service || !date || !time) {
			return res.status(400).json({ error: 'Missing required fields: name, email, service, date, time' })
		}

		const client = await getCalendarClient()
		if (!calendarId || !client) {
			return res.status(503).json({ error: 'Google Calendar not configured on this server' })
		}

		const { start, end } = parseSlotDateTime(date, time)
		if (!start.isValid || !end.isValid) {
			return res.status(400).json({ error: 'Could not parse time slot' })
		}

		const { data } = await client.events.insert({
			calendarId,
			requestBody: {
				summary: `${service} — ${name}`,
				description: `Client: ${name}\nEmail: ${email}\nService: ${service}`,
				start: { dateTime: start.toISO(), timeZone: timezone },
				end: { dateTime: end.toISO(), timeZone: timezone },
			},
		})

		return res.json({ success: true, eventId: data.id })
	} catch (err) {
		console.error(err)
		return res.status(500).json({ error: 'Failed to create appointment', details: err?.message })
	}
}

export async function getAvailableTimes(req, res) {
	try {
		const { date } = req.query // expected YYYY-MM-DD
		if (!date) {
			return res.status(400).json({ error: 'Missing required query param: date (YYYY-MM-DD)' })
		}

		// If Google is not configured, serve computed demo slots
		const client = await getCalendarClient()
		if (!calendarId || !client) {
			const demo = computeSlotsForDate(date).map(slot => `${slot.start.toFormat('h:mm a')} - ${slot.end.toFormat('h:mm a')}`)
			return res.json({ date, timezone, times: demo, demo: true })
		}

		const dayStart = DateTime.fromISO(date, { zone: timezone }).startOf('day')
		const dayEnd = dayStart.endOf('day')

		const { data } = await client.freebusy.query({
			requestBody: {
				timeMin: dayStart.toISO(),
				timeMax: dayEnd.toISO(),
				timeZone: timezone,
				items: [{ id: calendarId }]
			}
		})

		const busyWindows = (data.calendars?.[calendarId]?.busy || []).map(b => {
			const start = DateTime.fromISO(b.start, { zone: 'utc' }).setZone(timezone)
			const end = DateTime.fromISO(b.end, { zone: 'utc' }).setZone(timezone)
			return Interval.fromDateTimes(start, end)
		})

		const candidateSlots = computeSlotsForDate(date)
		const available = candidateSlots.filter(slot => !intervalsOverlapAny(slot, busyWindows))

		const times = available.map(slot => `${slot.start.toFormat('h:mm a')} - ${slot.end.toFormat('h:mm a')}`)

		return res.json({ date, timezone, times })
	} catch (err) {
		console.error(err)
		return res.status(500).json({ error: 'Failed to fetch availability', details: err?.message })
	}
}