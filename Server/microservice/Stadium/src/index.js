require('dotenv').config(); // Simple dotenv loading like Ticket service
const express = require('express');
const stadiumRoutes = require('./routes/stadiumRoutes');
// Add cors middleware if needed, similar to other services
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 8011; // Use PORT from .env, fallback to 8011

// Middleware
app.use(cors()); // Enable if cross-origin requests are needed
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/stadiums', stadiumRoutes); // Base path for stadium routes

// Basic root route
app.get('/', (req, res) => {
  res.send('Stadium Service Running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Stadium service listening on port ${PORT}`);
});