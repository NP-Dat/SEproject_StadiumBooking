const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/authController');
const ChooseStadiumController = require('../controllers/chooseStadiumController');
const CreateEventController = require('../controllers/createEventController');
const { authenticateToken } = require('../middleware/authMiddleware');


router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/profile', authenticateToken, AuthController.getProfile);
router.get('/stadiums', authenticateToken, ChooseStadiumController.getStadiums);
router.get('/stadiums/:stadiumId', authenticateToken, ChooseStadiumController.getScheduleOfStadium);
router.post('/create-event', authenticateToken, CreateEventController.createEvent);

module.exports = router;