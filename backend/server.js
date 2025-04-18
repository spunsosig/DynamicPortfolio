const express = require('express');
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, 'env', `.env.${process.env.NODE_ENV || 'development'}`)
});
const validateEnv = require('./config/validateEnv');
validateEnv();
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const { csrfProtection, preventParamPollution, sanitizeData } = require('./utils/security');

// Import routes
const contactRoutes = require('./routes/contact');
const scheduleRoutes = require('./routes/schedule');
const adminRoutes = require('./routes/admin');
const projectRoutes = require('./routes/project');

const app = express();
const PORT = process.env.PORT;

// Libraries 
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],  
      styleSrc: ["'self'", "'unsafe-inline'"], 
      scriptSrc: ["'self'"],  
      imgSrc: ["'self'", "data:", "https:"], 
      connectSrc: ["'self'", process.env.FRONTEND_URL]  
    }
  },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true
}));

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

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'development'
    ? ['http://localhost:5173', 'http://127.0.0.1:5173']
    : process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Added PUT/DELETE for admin commands
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
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

// Serve static files (uploaded images)
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/projects', projectRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'Internal server error' 
  });
});

// 404 handling
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});