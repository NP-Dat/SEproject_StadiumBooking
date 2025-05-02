const express = require('express');
const TicketTypeController = require('../controllers/ticketTypeController');

const router = express.Router();

// Public route - Get event zones (ticket types) for an event
router.get('/schedules/:id/ticket-types', TicketTypeController.getTicketTypes);

module.exports = router;