const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
// const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/verify-token', AuthController.verifyToken);

module.exports = router;