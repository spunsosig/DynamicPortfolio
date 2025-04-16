const transporter = require('../config/email');
const pool = require('../config/database');
const logger = require('../utils/logger');
const { validateScheduleInput } = require('../utils/validation');

exports.handleScheduleSubmission = async (req, res) => {
    const connection = await pool.getConnection();
    
    try {
        const validation = validateScheduleInput(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ 
                error: validation.errors[0]
            });
        }

        await connection.beginTransaction();
        const { name, email, date, time, notes } = req.body;

        // Check if timeslot is available
        const [existing] = await connection.execute(
            'SELECT id FROM interviews WHERE date = ? AND time = ? AND status != "cancelled"',
            [date, time]
        );

        if (existing.length > 0) {
            await connection.rollback();
            return res.status(400).json({ error: 'This time slot is already booked' });
        }

        // Save interview
        const [result] = await connection.execute(
            'INSERT INTO interviews (name, email, date, time, notes, status) VALUES (?, ?, ?, ?, ?, "pending")',
            [name, email, date, time, notes]
        );

        // Send confirmation email to them
        await transporter.sendMail({
            from: `"Interview Scheduler" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Interview Scheduled Successfully',
            text: `
Hello ${name},

Your interview has been scheduled successfully.

Details:
Date: ${date}
Time: ${time}
${notes ? `Notes: ${notes}` : ''}

Interview ID: ${result.insertId}

Please let us know if you need to reschedule.

Best regards,
Your Name
            `.trim()
        });

        // Send notification to you
        await transporter.sendMail({
            from: `"Interview Scheduler" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `New Interview Scheduled with ${name}`,
            text: `
New interview scheduled:

Name: ${name}
Email: ${email}
Date: ${date}
Time: ${time}
Notes: ${notes || 'None'}
Interview ID: ${result.insertId}
            `.trim()
        });

        await connection.commit();
        logger.info(`Interview scheduled by ${email} for ${date} ${time}`);
        res.status(200).json({ 
            message: 'Interview scheduled successfully!',
            interviewId: result.insertId 
        });

    } catch (error) {
        await connection.rollback();
        logger.error('Schedule submission error:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        connection.release();
    }
};