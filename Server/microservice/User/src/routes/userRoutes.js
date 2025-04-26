const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

// All routes require authentication
// router.use(authenticateToken);


router.get('/profile', UserController.getProfile);
router.put('/profile', UserController.updateProfile);
router.delete('/profile', UserController.deleteProfile);
router.get('/all', UserController.getAllUsers);


module.exports = router;