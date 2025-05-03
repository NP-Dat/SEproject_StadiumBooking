const express = require('express');
const eventScheduleController = require('../controllers/eventScheduleController');
// const { authenticateToken, authorizeOwner } = require('../middleware/authMiddleware');
const router = express.Router();

// Public routes
router.get('/', eventScheduleController.getAllSchedules);
router.get('/:id', eventScheduleController.getScheduleById);
router.get('/event/:eventId', eventScheduleController.getScheduleByEventId);

// Protected routes (admin or owner only)
router.post('/create', eventScheduleController.createSchedule);
router.put('/update', eventScheduleController.updateSchedule);
router.delete('/delete', eventScheduleController.deleteSchedule);

module.exports = router;
