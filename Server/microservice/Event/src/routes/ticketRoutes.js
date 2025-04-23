const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/ticketController');
const { authenticateToken } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authenticateToken);

router.post('/purchase', TicketController.purchaseTickets);
router.get('/my-tickets', TicketController.getUserTickets);
router.post('/:id/cancel', TicketController.cancelTicket);

module.exports = router;