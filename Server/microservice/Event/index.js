const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const eventRoutes = require('./src/routes/eventRoutes');
const eventScheduleRoutes = require('./src/routes/eventScheduleRoutes');
const eventZoneRoutes = require('./src/routes/eventZoneRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/event', eventRoutes);
app.use('/api/eventSchedule', eventScheduleRoutes);
app.use('/api/eventZone', eventZoneRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Event service is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error', error: process.env.NODE_ENV === 'development' ? err.message : undefined });
});

const PORT = process.env.PORT || 8003;
app.listen(PORT, () => {
  console.log(`Event service running on port ${PORT}`);
});
