const express = require('express');
const router = express.Router();
const { handleContact } = require('../controllers/contactController');

// Handle POST requests to /contact
router.post('/', handleContact); 
module.exports = router;