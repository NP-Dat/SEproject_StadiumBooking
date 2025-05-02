const express = require('express');
const TicketTypeController = require('../controllers/ticketTypeController');
// const { authenticateToken, isAdmin } = require('../middleware/authMiddleware'); // Temporarily removed for testing

const router = express.Router();

// --- Public Routes ---

// GET event zones (ticket types) for a specific event schedule
router.get('/schedules/:id/ticket-types', TicketTypeController.getTicketTypes);


// --- Admin Routes (Temporarily Public for Testing) ---

// POST - Create a new ticket type
router.post(
    '/ticket-types', // Removed /schedules/:id
    // authenticateToken, // Removed for testing
    // isAdmin, // Removed for testing
    TicketTypeController.createTicketType
);

// PUT - Update an existing ticket type by its ID
router.put(
    '/ticket-types/:id', // Use :id for updating/deleting specific zone
    // authenticateToken, // Removed for testing
    // isAdmin, // Removed for testing
    TicketTypeController.updateTicketType
);

// DELETE - Delete a ticket type by its ID
router.delete(
    '/ticket-types/:id', // Use :id for updating/deleting specific zone
    // authenticateToken, // Removed for testing
    // isAdmin, // Removed for testing
    TicketTypeController.deleteTicketType
);


module.exports = router;