const axios = require('axios');

async function authenticateToken(req, res, next) {
  const token = req.body.token;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {    
    // Call the Auth microservice to verify the token
    const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:8001/api/auth';
    const response = await axios.post(`${authServiceUrl}/verify-token`, {
      token: token
    });

    // Token is verified by Auth service, set user info for use in routes
    req.user = { userId: response.data.userId };
    next();
  } catch (error) {
    if (error.response) {
      // The auth service responded with an error
      return res.status(error.response.status).json(error.response.data);
    } else {
      // Network error or other issue
      console.error('Authentication error:', error.message);
      return res.status(500).json({ message: 'Error during authentication' });
    }
  }
}

module.exports = { authenticateToken };