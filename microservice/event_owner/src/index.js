const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/ownerRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/owner', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Event Owner service running on port ${PORT}`);
});