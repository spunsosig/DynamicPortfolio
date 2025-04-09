const express = require('express');
const router = express.Router();
const { handleContactSubmission } = require('../controllers/contactController');

// Handle POST requests to /contact
router.post('/', handleContactSubmission); 
module.exports = router;