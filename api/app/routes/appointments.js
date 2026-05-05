import { Router } from 'express'
import { getAvailableTimes, bookAppointment } from '../controllers/appointments.js'

const router = Router()

router.get('/availability', getAvailableTimes)
router.post('/book', bookAppointment)

export default router