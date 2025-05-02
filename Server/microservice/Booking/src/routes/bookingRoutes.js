const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/bookingController');
const { authenticateToken } = require('../middleware/authMiddleware');

// All routes require authentication
// router.use(authenticateToken);

router.post('/createBooking', BookingController.createBooking);

module.exports = router;