const nodemailer = require('nodemailer');
const pool = require('../config/database');
const logger = require('../utils/logger');
const { validateEmail } = require('../utils/validation');

exports.handleContactSubmission = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate inputs
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Save to database
        const [result] = await pool.execute(
            'INSERT INTO contact_submissions (name, email, message) VALUES (?, ?, ?)',
            [name, email, message]
        );

        // Send email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Contact Form" <${process.env.EMAIL_USER}>`,
            replyTo: email,
            to: process.env.EMAIL_USER,
            subject: `New Contact Form Submission from ${name}`,
            text: `Message from contact form:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
        });

        logger.info(`Contact form submitted by ${email}`);
        res.status(200).json({ 
            message: 'Form submitted successfully!',
            submissionId: result.insertId 
        });

    } catch (error) {
        logger.error('Contact submission error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};