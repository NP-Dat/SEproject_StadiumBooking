const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { generateToken } = require('../utils/jwtUtils');

// Register new user
const register = async (req, res) => {
  try {
    const { userName, email, passWord, fullName, birth, phoneNumber, address } = req.body;
    
    // Check if username or email already exists
    const existingUsers = await User.checkExisting(userName, email);
    
    if (existingUsers.length > 0) {
      const isUsernameTaken = existingUsers.some(user => user.userName === userName);
      const isEmailTaken = existingUsers.some(user => user.email === email);
      
      if (isUsernameTaken) {
        return res.status(400).json({
          success: false,
          message: 'Username is already taken'
        });
      }
      
      if (isEmailTaken) {
        return res.status(400).json({
          success: false,
          message: 'Email is already registered'
        });
      }
    }
    
    // Create new user - always as customer role for public registration
    const newUser = await User.create({
      userName,
      passWord,
      fullName,
      birth: birth || null,
      phoneNumber,
      address: address || null,
      email,
      role: 'customer' // Default role for all new registrations
    });
    
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        userName: newUser.userName,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { credential, passWord } = req.body;
    
    // Find user by username or email
    const user = await User.findByCredentials(credential);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(passWord, user.passWord);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Generate JWT token
    const token = generateToken(user);
    
    // Determine redirect URL based on role
    let redirectUrl;
    switch (user.role) {
      case 'admin':
        redirectUrl = '/admin/dashboard';
        break;
      case 'organizer':
        redirectUrl = '/organizer/events';
        break;
      case 'customer':
      default:
        redirectUrl = '/events';
    }
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        userName: user.userName,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: {
        id: req.user.id,
        userName: req.user.userName,
        fullName: req.user.fullName,
        email: req.user.email,
        role: req.user.role
      }
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

// Admin-only: Create a new admin user
const createAdmin = async (req, res) => {
  try {
    const { userName, email, passWord, fullName, phoneNumber, address } = req.body;
    
    // Check if username or email already exists
    const existingUsers = await User.checkExisting(userName, email);
    
    if (existingUsers.length > 0) {
      const isUsernameTaken = existingUsers.some(user => user.userName === userName);
      const isEmailTaken = existingUsers.some(user => user.email === email);
      
      if (isUsernameTaken) {
        return res.status(400).json({
          success: false,
          message: 'Username is already taken'
        });
      }
      
      if (isEmailTaken) {
        return res.status(400).json({
          success: false,
          message: 'Email is already registered'
        });
      }
    }
    
    // Create new admin user
    const newAdmin = await User.create({
      userName,
      passWord,
      fullName,
      phoneNumber,
      address: address || null,
      email,
      role: 'admin'
    });
    
    res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      user: {
        id: newAdmin.id,
        userName: newAdmin.userName,
        fullName: newAdmin.fullName,
        email: newAdmin.email,
        role: newAdmin.role
      }
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create admin user',
      error: error.message
    });
  }
};

// Admin-only: Create a new organizer user
const createOrganizer = async (req, res) => {
  try {
    const { userName, email, passWord, fullName, phoneNumber, address } = req.body;
    
    // Check if username or email already exists
    const existingUsers = await User.checkExisting(userName, email);
    
    if (existingUsers.length > 0) {
      const isUsernameTaken = existingUsers.some(user => user.userName === userName);
      const isEmailTaken = existingUsers.some(user => user.email === email);
      
      if (isUsernameTaken) {
        return res.status(400).json({
          success: false,
          message: 'Username is already taken'
        });
      }
      
      if (isEmailTaken) {
        return res.status(400).json({
          success: false,
          message: 'Email is already registered'
        });
      }
    }
    
    // Create new organizer user
    const newOrganizer = await User.create({
      userName,
      passWord,
      fullName,
      phoneNumber,
      address: address || null,
      email,
      role: 'organizer'
    });
    
    res.status(201).json({
      success: true,
      message: 'Organizer user created successfully',
      user: {
        id: newOrganizer.id,
        userName: newOrganizer.userName,
        fullName: newOrganizer.fullName,
        email: newOrganizer.email,
        role: newOrganizer.role
      }
    });
  } catch (error) {
    console.error('Create organizer error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create organizer user',
      error: error.message
    });
  }
};

// Admin-only: Update user role
const updateUserRole = async (req, res) => {
  try {
    const { userId, newRole } = req.body;
    
    // Update user role
    const updated = await User.updateRole(userId, newRole);
    
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: `User role updated to ${newRole} successfully`
    });
  } catch (error) {
    console.error('Update role error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user role',
      error: error.message
    });
  }
};

// Admin-only: Get all users
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
      message: 'Failed to get users',
      error: error.message
    });
  }
};

// Change password for authenticated user
const changePassword = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    // Make sure the passwords are different
    if (currentPassword === newPassword) {
      return res.status(400).json({ 
        message: 'New password must be different from current password' 
      });
    }

    // Change the password
    const result = await User.changePassword(userId, currentPassword, newPassword);

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// simple reset logic password
const resetPassword = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, newPassword } = req.body;

    // Reset the password
    const result = await User.resetPasswordByEmail(email, newPassword);

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  createAdmin,
  createOrganizer,
  updateUserRole,
  getAllUsers,
  changePassword,
  resetPassword
};
