const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    secure: true,
    tls: {
        rejectUnauthorized: process.env.NODE_ENV === 'development'
    }
});

transporter.verify()
    .then(() => console.log('Email service ready'))
    .catch(err => console.error('Email service error:', err));

module.exports = transporter;