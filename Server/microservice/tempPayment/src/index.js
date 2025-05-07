const express = require('express');
const cors = require('cors');
require('dotenv').config();

const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/payment', paymentRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Payment service is running' });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Payment service running on port ${PORT}`);
});