const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:8001/api/auth';

// Verify token with Auth service
const verifyToken = async (token) => {
  try {
    const response = await axios.get(`${AUTH_SERVICE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.user;
  } catch (error) {
    console.error('Token verification error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Authentication failed');
  }
};

module.exports = { verifyToken };
