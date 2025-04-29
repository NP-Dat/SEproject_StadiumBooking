const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;

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

// Register user with Auth service
const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Login user with Auth service
const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

module.exports = {
  verifyToken,
  registerUser,
  loginUser
};
