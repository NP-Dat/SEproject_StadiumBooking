const express = require('express');
const cors = require('cors');
require('dotenv').config();

const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/payments', paymentRoutes);
app.use('/api/wallets', paymentRoutes);
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Booking service is running' });
});

const PORT = process.env.PORT || 8004;
app.listen(PORT, () => {
  console.log(`Booking service running on port ${PORT}`);
});
