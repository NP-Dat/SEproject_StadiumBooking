const express = require('express');
const router = express.Router();
const TicketTypeController = require('../controllers/ticketTypeController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

// Public route - Get event zones (ticket types) for an event
router.get('/:id/ticket-types', TicketTypeController.getTicketTypes);

// Protected admin routes
router.post('/:id/ticket-types', authenticateToken, isAdmin, TicketTypeController.createTicketType);

// These routes use a different base path, so they'll be managed in index.js
router.put('/ticket-types/:id', authenticateToken, isAdmin, TicketTypeController.updateTicketType);
router.delete('/ticket-types/:id', authenticateToken, isAdmin, TicketTypeController.deleteTicketType);

module.exports = router;