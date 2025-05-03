const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/bookingController');
const GetBookedTicketsController = require('../controllers/getBookedTicketsController');
const { authenticateToken } = require('../middleware/authMiddleware');

// All routes require authentication
// router.use(authenticateToken);

router.post('/createBooking', BookingController.createBooking);
router.get('/getBookedTickets/:userID', GetBookedTicketsController.getBookedTickets);

module.exports = router;