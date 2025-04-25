const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/ticketController');
const TicketTypeController = require('../controllers/ticketTypeController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

// Admin routes
router.get('/tickets', authenticateToken, isAdmin, TicketController.getAllTickets);

// User routes - Requires authentication
router.get('/orders/:order_id/tickets', authenticateToken, TicketController.getOrderTickets);

// Routes for ticket types management (that use different base path)
router.put('/ticket-types/:id', authenticateToken, isAdmin, TicketTypeController.updateTicketType);
router.delete('/ticket-types/:id', authenticateToken, isAdmin, TicketTypeController.deleteTicketType);

module.exports = router;