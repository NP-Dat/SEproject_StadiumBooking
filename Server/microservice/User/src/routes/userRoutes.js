const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { 
  validateProfileUpdate,
  handleValidationErrors 
} = require('../middleware/validateMiddleware');

// Auth proxies (for convenience)
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes
router.get(
  '/profile',
  authenticate,
  userController.getProfile
);

router.put(
  '/profile',
  authenticate,
  validateProfileUpdate,
  handleValidationErrors,
  userController.updateProfile
);

router.get(
  '/users',
  authenticate,
  authorize('admin'),
  userController.getAllUsers
);

router.get(
  '/search',
  authenticate,
  authorize('admin'),
  userController.searchUsers
);

router.get(
  '/statistics',
  authenticate,
  authorize('admin'),
  userController.getStatistics
);

module.exports = router;
