const express = require('express');
const app = express();
require('dotenv').config();
require('dotenv').config({ path: '../.env' });

// Middleware to parse JSON
app.use(express.json());

// Customer routes
const customerRoutes = require('./routes/customerRoutes');
app.use('/customers', customerRoutes);

app.get('/', (req, res) => {
  res.send('Customer Service API');
});

const PORT = process.env.CUSTOMER_SERVICE_PORT || 3001;
app.listen(PORT, () => console.log(`Customer Service running on port ${PORT}`));