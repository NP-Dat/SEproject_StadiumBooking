const express = require('express');

const AuthController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/profile', authenticateToken, AuthController.getProfile);

module.exports = router;