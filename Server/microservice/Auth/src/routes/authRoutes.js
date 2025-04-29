const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { 
  validateRegistration, 
  validateLogin,
  validateRoleUpdate,
  handleValidationErrors 
} = require('../middleware/validateMiddleware');

// Public routes
// Register route
router.post(
  '/register',
  validateRegistration,
  handleValidationErrors,
  authController.register
);

// Login route
router.post(
  '/login',
  validateLogin,
  handleValidationErrors,
  authController.login
);

// Protected routes
// Get current user profile
router.get(
  '/profile',
  authenticate,
  authController.getProfile
);

// Admin-only routes
// Create a new admin user
router.post(
  '/admins',
  authenticate,
  authorize('admin'),
  validateRegistration,
  handleValidationErrors,
  authController.createAdmin
);

// Create a new organizer user
router.post(
  '/organizers',
  authenticate,
  authorize('admin'),
  validateRegistration,
  handleValidationErrors,
  authController.createOrganizer
);

// Update user role
router.put(
  '/users/role',
  authenticate,
  authorize('admin'),
  validateRoleUpdate,
  handleValidationErrors,
  authController.updateUserRole
);

// Get all users
router.get(
  '/users',
  authenticate,
  authorize('admin'),
  authController.getAllUsers
);

// Change password
router.post(
  '/change-password',
  authenticate,
  authController.changePassword
);

// Reset password
router.post(
  '/reset-password',
  authenticate,
  authController.resetPassword
);

module.exports = router;

