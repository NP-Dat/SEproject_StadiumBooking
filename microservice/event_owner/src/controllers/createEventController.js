const EventModel = require('../models/Event');

class CreateEventController {
    static async createEvent(req, res) {
        const { name, date, owner, stadiumID, timeStart, timeEnd} = req.body;

        if (!name || !date || !owner || !stadiumID || !timeStart || !timeEnd) {
            return res.status(400).json({ message: 'All fields are required' });
          }

        try {
            const event = await EventModel.createEvent(name, date, owner, stadiumID, timeStart, timeEnd);
            res.json(event);
        } catch (error) {
            console.error('Create event error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = CreateEventController;