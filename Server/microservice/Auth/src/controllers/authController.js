const jwt = require('jsonwebtoken');
const AuthModel = require('../models/AuthModel');

class AuthController {
  static async register(req, res) {
    try {
      const { username, password, fullname, birth, phonenumber, email, address } = req.body;

      if (!username ||  !password || !fullname || !birth || !phonenumber || !email || !address) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const existingUser = await AuthModel.findByUsername(username);
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      const userId = await AuthModel.create(username, password, fullname, birth, phonenumber, email, address);
      // const role = await AuthModel.setRole(userId);
      // if (!role) {
      //   return res.status(500).json({ message: 'Failed to set user role' });
      // }

      res.status(201).json({
        message: 'User registered successfully',
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }

      const user = await AuthModel.findByUsername(username);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      // const role = await AuthModel.getRole(user.id);

      // Fix: Change email to username since we're using username for login
      const hashedPassword = await AuthModel.findPasswordByUsername(username);
      const validPassword = await AuthModel.verifyPassword(password, hashedPassword);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // const token = jwt.sign(
      //   { userId: user.id, email: user.email },
      //   process.env.JWT_SECRET || 'default_secret_key',
      //   { expiresIn: '1h' }
      // );

      // Decode token to get expiration time
      // const decoded = jwt.decode(token);
      // const expiresAt = new Date(decoded.exp * 1000);

      res.json({
        message: 'Login successful',
        userId: user.id
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


  static async verifyToken(req, res) {
    const {token} = req.body;
    
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }

    // Verify the token 
    jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }      

      // Token is valid and user ID matches
      res.json({ message: 'Valid token', userId: decoded.userId});
    });
  }
}

module.exports = AuthController;
