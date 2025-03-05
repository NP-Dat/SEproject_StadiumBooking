const UserModel = require('../models/User');

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
      const { full_name, phone, address, preferences } = req.body;
      const userId = req.user.userId;

      const existingProfile = await UserModel.findById(userId);
      let success;

      if (existingProfile) {
        success = await UserModel.updateProfile(userId, {
          full_name,
          phone,
          address,
          preferences
        });
      } else {
        success = await UserModel.createProfile(userId, {
          full_name,
          phone,
          address,
          preferences
        });
      }

      if (success) {
        res.json({ message: 'Profile updated successfully' });
      } else {
        res.status(400).json({ message: 'Failed to update profile' });
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
}

module.exports = UserController;