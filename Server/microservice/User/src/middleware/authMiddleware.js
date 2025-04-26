const axios = require('axios');

async function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Get userId from request - can be from req.params, req.query, or req.body
    // depending on how your API is structured
    const userId = req.params.userId || req.query.userId || (req.body && req.body.userId);
    
    if (!userId) {
      return res.status(403).json({ message: 'User ID is required' });
    }

    // Clean token if it comes with "Bearer " prefix
    const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;
    
    // Call the Auth microservice to verify the token
    const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:3000/api/auth';
    const response = await axios.post(`${authServiceUrl}/verify-token`, {
      token: cleanToken,
      userId: userId
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