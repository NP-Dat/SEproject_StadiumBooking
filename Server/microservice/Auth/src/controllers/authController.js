const jwt = require('jsonwebtoken');
const AuthModel = require('../models/AuthModel');
const { generateToken, verifyToken } = require('../utils/jwtUtils');

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

      
      const hashedPassword = await AuthModel.findPasswordByUsername(username);
      const validPassword = await AuthModel.verifyPassword(password, hashedPassword);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = generateToken(user);
      // res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });

      res.json({
        message: 'Login successful',
        token: token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


  static async verifyToken(req, res) {    
    // Token is valid and user ID matches
    res.json({ message: 'Valid token', userId: req.user.id });
    
  }
}

module.exports = AuthController;
