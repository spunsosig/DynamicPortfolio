const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001; // Backend port

// Serve static files from the Vite build
app.use(express.static(path.join(__dirname, '../frontend/dist'))); // Adjust the path if necessary

// Cors Handling
app.use(cors());
app.use(express.json());

// Add API routes here
app.get('/api', (req, res) => {
    res.send('API response');
});

// All /contact-related requests go here
const contactRoutes = require('./routes/contact');
app.use('/contact', contactRoutes);

// Serve the front-end app for all other GET requests
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
// });

// Start the server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});