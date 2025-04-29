const User = require('../models/userModel');
const { registerUser, loginUser } = require('../utils/authService');

// Register user (proxies to Auth service)
const register = async (req, res) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Login user (proxies to Auth service)
const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await User.getProfileById(userId);
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }
    
    res.status(200).json({
      success: true,
      profile
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user profile',
      error: error.message
    });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, birth, phoneNumber, address } = req.body;
    
    const updated = await User.updateProfile(userId, {
      fullName,
      birth,
      phoneNumber,
      address
    });
    
    if (!updated) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update or user not found'
      });
    }
    
    // Get updated profile
    const profile = await User.getProfileById(userId);
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      profile
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
};

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    
    res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get all users',
      error: error.message
    });
  }
};

// Search Users (Admin only)
const searchUsers = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const users = await User.searchUsers(searchTerm);
    
    res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search users',
      error: error.message
    });
  }
}; 

// Get Statistics (Admin only)
const getStatistics = async (req, res) => {
  try {
    const statistics = await User.getStatistics();
    
    res.status(200).json({
      success: true,
      statistics
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get statistics',
      error: error.message
    });
  }
}; 

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  searchUsers,
  getStatistics,
  getAllUsers
};
