import { getAvailableTimes } from '../../api/app/controllers/appointments.js'

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

  await getAvailableTimes(req, res)
  return res.response
}
