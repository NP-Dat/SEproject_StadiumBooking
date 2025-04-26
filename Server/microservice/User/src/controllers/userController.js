const UserModel = require('../models/User');

class UserController {
  
  static async getProfile(req, res) {
    try {
      const profile = await UserModel.findById(req.body.id);
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
      const { fullname, phonenumber, address, birth, email, password } = req.body;
      const userId = req.body.id;
      const success = await UserModel.updateProfile(userId, {
          fullname,
          phonenumber,
          address,
          birth,
          email,
          password, // only hash the password if it's provided
        });


      if (success) {
        res.json({ message: 'Profile updated successfully' });
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
      const success = await UserModel.deleteProfile(req.body.id);
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

    try {
      const users = await UserModel.findAllUsers();
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