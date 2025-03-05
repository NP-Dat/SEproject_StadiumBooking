const express = require('express');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes/routes');

const app = express();

// Middleware
app.use(cors());
// app.use(express.json()); //For future use if needed

// Routes
app.use('/api', routes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(`Auth Service URL: ${process.env.AUTH_SERVICE_URL}`);
  console.log(`User Service URL: ${process.env.USER_SERVICE_URL}`);
  console.log(`Event Service URL: ${process.env.EVENT_SERVICE_URL}`);
  console.log(`Booking Service URL: ${process.env.BOOKING_SERVICE_URL}`);
});