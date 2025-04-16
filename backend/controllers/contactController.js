const transporter = require('../config/email');
const pool = require('../config/database');
const logger = require('../utils/logger');
const { validateContactInput } = require('../utils/validation');

exports.handleContactSubmission = async (req, res) => {
    try {
        const validation = validateContactInput(req.body);
        
        if (!validation.isValid) {
            return res.status(400).json({ 
                error: validation.errors[0]
            });
        }

        const { name, email, message } = req.body;

        // Save to database
        const [result] = await pool.execute(
            'INSERT INTO contact_submissions (name, email, message) VALUES (?, ?, ?)',
            [name, email, message]
        );

        // Send notification email to you
        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            replyTo: email,
            to: process.env.EMAIL_USER,
            subject: `New Contact Form Submission from ${name}`,
            text: `
Message from contact form:

Name: ${name}
Email: ${email}
Message: ${message}

Submission ID: ${result.insertId}
            `.trim()
        });

        logger.info(`Contact form submitted by ${email}`);
        res.status(200).json({ 
            message: 'Message sent successfully!',
            submissionId: result.insertId 
        });

    } catch (error) {
        logger.error('Contact submission error:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
};