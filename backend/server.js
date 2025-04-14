const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
require('dotenv').config();
const { csrfProtection, preventParamPollution, sanitizeData } = require('./utils/security');

const app = express();
const PORT = process.env.PORT || 3001;

// Libraries 
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(helmet());
app.use(compression({
  level: 6,
  threshold: 100 * 1000, // 100kb
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Security 
app.use(sanitizeData);
app.use(preventParamPollution);

// Rate limiting (after sanitization for clean data)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // IP request limit
  message: 'Too many requests, please try again later.',
  standardHeaders: true, 
  legacyHeaders: false, 
});

app.use('/api/', limiter);

// Routes
app.use('/api/contact', require('./routes/contact'));
app.use('/api/schedule', require('./routes/schedule'));

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// // Handle React routing, return all requests to React app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handling
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});