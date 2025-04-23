const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/bookingController');
const { authenticateToken } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authenticateToken);

router.post('/', BookingController.createBooking);
router.post('/confirm-payment', BookingController.confirmPayment);
router.get('/my-bookings', BookingController.getUserBookings);
router.get('/:id', BookingController.getBooking);
router.post('/:id/cancel', BookingController.cancelBooking);

module.exports = router;