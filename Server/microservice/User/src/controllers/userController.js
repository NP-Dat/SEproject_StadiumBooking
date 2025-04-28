const UserModel = require('../models/User');
const bcrypt = require('bcrypt');

class UserController {
  
  static async getProfile(req, res) {
    try {
      const profile = await UserModel.findById(req.user.userId);
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.json(profile);
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async updateProfile(req, res) {
    try {
      const { fullname, phonenumber, address, email, password } = req.body;
      const userId = req.user.userId;
  
      let updatedData = { fullname, phonenumber, address, email };
  
      if (typeof password === 'string' && password.trim() !== '') {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        updatedData.password = hashedPassword;
      }
  
      const success = await UserModel.updateProfile(userId, updatedData);
  
      if (success) {
        const updatedProfile = await UserModel.findById(userId);
        res.json({ message: 'Profile updated successfully', user: updatedProfile });
      } else {
        res.status(400).json({ message: 'Profile not found' });
      }
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  static async deleteProfile(req, res) {
    try {
      const success = await UserModel.deleteProfile(req.user.userId);
      if (success) {
        res.json({ message: 'Profile deleted successfully' });
      } else {
        res.status(404).json({ message: 'Profile not found' });
      }
    } catch (error) {
      console.error('Delete profile error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getAllUsers(req, res) {
    console.log('getAllUsers endpoint called'); 

    const { page = 1, limit = 10 } = req.query;
    try {
      const users = await UserModel.findAllUsers(page, limit);
      if (!users.length) {
        return res.status(404).json({ message: 'No users found' });
      }
      console.log('Users retrieved successfully');
      res.json(users);
    } catch (error) {
      console.error('Get all users error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = UserController;