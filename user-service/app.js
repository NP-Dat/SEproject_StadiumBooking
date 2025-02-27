const express = require('express');
const app = express();
require('dotenv').config();

// Middleware to parse JSON
app.use(express.json());

// User Routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('User Service API');
});

const PORT = process.env.USER_SERVICE_PORT || 3001;
app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));