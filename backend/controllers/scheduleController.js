const pool = require('../config/database');
const logger = require('../utils/logger');

exports.handleScheduleSubmission = async (req, res) => {
    try {
        const { name, email, date, time, notes } = req.body;

        // Check if timeslot is available
        const [existing] = await pool.execute(
            'SELECT id FROM interviews WHERE date = ? AND time = ? AND cancelled = 0',
            [date, time]
        );

        if (existing.length > 0) {
            return res.status(400).json({ error: 'This time slot is already booked' });
        }

        // Save interview
        const [result] = await pool.execute(
            'INSERT INTO interviews (name, email, date, time, notes) VALUES (?, ?, ?, ?, ?)',
            [name, email, date, time, notes]
        );

        logger.info(`Interview scheduled by ${email} for ${date} ${time}`);
        res.status(200).json({ 
            message: 'Interview scheduled successfully!',
            interviewId: result.insertId 
        });

    } catch (error) {
        logger.error('Schedule submission error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};