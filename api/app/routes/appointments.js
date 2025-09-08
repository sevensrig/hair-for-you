import { Router } from 'express'
import { getAvailableTimes } from '../controllers/appointments.js'

const router = Router()

router.get('/availability', getAvailableTimes)

export default router