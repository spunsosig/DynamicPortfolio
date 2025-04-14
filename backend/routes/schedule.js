const express = require('express');
const router = express.Router();
const { handleScheduleSubmission } = require('../controllers/scheduleController');

// Handle POST requests to /contact
router.post('/', handleScheduleSubmission); 
module.exports = router;