const express = require('express');
const cors = require('cors');
require('dotenv').config();

const ticketTypesRoutes = require('./routes/ticketTypeRoutes');
const ticketsRoutes = require('./routes/ticketRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/events', ticketTypesRoutes);
app.use('/api', ticketsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Ticket service is running' });
});

const PORT = process.env.PORT || 8005;
app.listen(PORT, () => {
  console.log(`Ticket service running on port ${PORT}`);
});