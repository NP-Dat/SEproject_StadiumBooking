const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');


router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/verify-token', authenticate, AuthController.verifyToken);

module.exports = router;