const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token is required' });
  }

  // Log the token being used (only for debugging purposes)
  console.log('Verifying token with secret:', process.env.JWT_SECRET ? 'Secret is set' : 'Secret is NOT set');
  
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || 'stadium_booking_secret_key');
    console.log('Token verified successfully, user:', { id: user.userId || user.id, isAdmin: user.isAdmin });
    req.user = user;
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return res.status(403).json({ message: 'Invalid or expired token', error: err.message });
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  if (!req.user.isAdmin) {
    console.log('Admin access denied for user:', req.user);
    return res.status(403).json({ message: 'Requires admin privileges' });
  }
  
  console.log('Admin access granted for user:', req.user);
  next();
};

module.exports = {
  authenticateToken,
  isAdmin
};