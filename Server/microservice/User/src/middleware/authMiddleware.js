const axios = require('axios');

async function authenticateToken(req, res, next) {
     
  try {
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }  

    const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:8001/api/auth';
    const response = await axios.get(`${authServiceUrl}/verify-token`, {
      headers: {
        'Authorization': `${token}`
      }
    });

    req.user = { userId: response.data.userId };
    next();
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    } else {
      console.error('Authentication error:', error.message);
      return res.status(500).json({ message: 'Error during authentication' });
    }
  }
}

module.exports = { authenticateToken };