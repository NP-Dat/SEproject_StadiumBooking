const express = require('express');
const cors = require('cors');
require('dotenv').config();

const eventRoutes = require('./routes/eventRoutes');
const eventScheduleRoutes = require('./routes/eventScheduleRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/schedules', eventScheduleRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Event service is running' });
});

const PORT = process.env.PORT || 8003;
app.listen(PORT, () => {
  console.log(`Event service running on port ${PORT}`);
});