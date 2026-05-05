// Polyfills must be loaded BEFORE any other imports
import 'cross-fetch/polyfill'
import fetch from 'node-fetch'
import FormData from 'form-data'

// Set up globals immediately
global.fetch = fetch
global.FormData = FormData
global.Headers = fetch.Headers
global.Request = fetch.Request
global.Response = fetch.Response

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
const serviceAccountKey = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || '')
	.replace(/\\n/g, '\n')  // Convert escaped newlines
	.replace(/"/g, '')      // Remove any quotes
	.trim()                 // Remove whitespace

console.log('Service account key length:', serviceAccountKey.length)
console.log('Service account key starts with:', serviceAccountKey.substring(0, 50))
console.log('Service account key ends with:', serviceAccountKey.substring(serviceAccountKey.length - 50))
const credentialsKeyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS
const calendarId = process.env.GOOGLE_CALENDAR_ID

let calendar
async function getCalendarClient() {
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
		// Force token refresh to avoid caching issues
		await auth.authorize()
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

async function getAvailableTimes(req, res) {
	try {
		const { date } = req.query // expected YYYY-MM-DD
		console.log('Getting availability for date:', date)

		if (!date) {
			console.log('Missing date parameter')
			return res.status(400).json({ error: 'Missing required query param: date (YYYY-MM-DD)' })
		}

		// If Google is not configured, serve computed demo slots
		console.log('Checking calendar configuration...')
		console.log('Calendar ID:', calendarId ? 'present' : 'missing')
		console.log('Service account email:', serviceAccountEmail ? 'present' : 'missing')
		console.log('Service account key:', serviceAccountKey ? 'present' : 'missing')

		const client = await getCalendarClient()
		console.log('Calendar client:', client ? 'created' : 'failed')

		if (!calendarId || !client) {
			console.log('Using demo slots since Google not configured')
			const demo = computeSlotsForDate(date).map(slot => `${slot.start.toFormat('h:mm a')} - ${slot.end.toFormat('h:mm a')}`)
			return res.json({ date, timezone, times: demo, demo: true })
		}

		console.log('Querying Google Calendar freebusy API...')
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

		console.log('Freebusy data received:', data)

		const busyWindows = (data.calendars?.[calendarId]?.busy || []).map(b => {
			const start = DateTime.fromISO(b.start, { zone: 'utc' }).setZone(timezone)
			const end = DateTime.fromISO(b.end, { zone: 'utc' }).setZone(timezone)
			return Interval.fromDateTimes(start, end)
		})

		const candidateSlots = computeSlotsForDate(date)
		const available = candidateSlots.filter(slot => !intervalsOverlapAny(slot, busyWindows))

		const times = available.map(slot => `${slot.start.toFormat('h:mm a')} - ${slot.end.toFormat('h:mm a')}`)

		console.log('Returning available times:', times)
		return res.json({ date, timezone, times })
	} catch (err) {
		console.error('Error in getAvailableTimes:', err)
		return res.status(500).json({ error: 'Failed to fetch availability', details: err?.message })
	}
}

function createResponse() {
  let statusCode = 200
  let payload

  return {
    status(code) {
      statusCode = code
      return this
    },
    json(value) {
      payload = JSON.stringify(value)
      return this
    },
    send(value) {
      payload = typeof value === 'string' ? value : JSON.stringify(value)
      return this
    },
    get response() {
      return {
        statusCode,
        headers: {
          'Content-Type': 'application/json'
        },
        body: payload
      }
    }
  }
}

export const handler = async (event) => {
  console.log('Availability function called with:', event.queryStringParameters)

  const req = {
    query: event.queryStringParameters || {},
    body: event.body ? JSON.parse(event.body) : {}
  }
  const res = createResponse()

  try {
    await getAvailableTimes(req, res)
    console.log('Function completed successfully')
    return res.response
  } catch (error) {
    console.error('Function error:', error)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error', details: error.message })
    }
  }
}
