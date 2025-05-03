const express = require('express');
const eventController = require('../controllers/eventController');
// const { authenticateToken, authorizeOwner } = require('../middleware/authMiddleware');
const router = express.Router();

// Public routes (no authentication required)
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);

// Protected routes (require authentication) for admin and owner future implementation
router.post('/create', eventController.createEvent);
router.put('/update', eventController.updateEvent);
router.delete('/delete', eventController.deleteEvent);

module.exports = router;
