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

function parseSlotDateTime(dateISO, timeStr) {
	// timeStr format: "10:00 AM - 10:40 AM"
	const [startStr, endStr] = timeStr.split(' - ')
	const start = DateTime.fromFormat(`${dateISO} ${startStr}`, 'yyyy-MM-dd h:mm a', { zone: timezone })
	const end = DateTime.fromFormat(`${dateISO} ${endStr}`, 'yyyy-MM-dd h:mm a', { zone: timezone })
	return { start, end }
}

async function bookAppointment(req, res) {
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
  const req = {
    query: event.queryStringParameters || {},
    body: event.body ? JSON.parse(event.body) : {}
  }
  const res = createResponse()

  await bookAppointment(req, res)
  return res.response
}
