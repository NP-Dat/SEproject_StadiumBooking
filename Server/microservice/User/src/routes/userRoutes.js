const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

// All routes require authentication
// router.use(authenticateToken);

router.get('/me',authenticateToken, UserController.getProfile);
router.put('/me', UserController.updateProfile);
router.delete('/profile-deleting', UserController.deleteProfile); //admin only
router.get('/all', UserController.getAllUsers);
// router.get('/me/tickets', UserController.getMyTickets);

module.exports = router;