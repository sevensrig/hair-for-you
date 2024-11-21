const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/') // change path once controllers implemented

router.get('/check-date-time', appointmentController.getNonFreeTimes);

module.exports = router;