const express = require('express');
const router = express.Router();
const c = require('../controllers/eventScheduleController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Public
router.get('/:id', c.findById);
router.get('/event/:eventId', c.listByEvent);

// Organizer
router.post('/organizer', authenticate, authorize('organizer'), c.create);
router.put('/organizer/:id', authenticate, authorize('organizer'), c.update);
router.delete('/organizer/:id', authenticate, authorize('organizer'), c.delete);
router.get('/organizer/calendar', authenticate, authorize('organizer'), c.getOrganizerCalendarView);
router.post('/organizer/conflicts', authenticate, authorize('organizer'), c.checkSchedulingConflicts);
router.get('/organizer/available-stadiums', authenticate, authorize('organizer'), c.getAvailableStadiums);

// Admin
router.get('/admin/all', authenticate, authorize('admin'), c.listAll);
router.get('/admin/utilization', authenticate, authorize('admin'), c.getStadiumUtilization);
router.get('/admin/upcoming', authenticate, authorize('admin'), c.getUpcomingSchedules);

module.exports = router;
