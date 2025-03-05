const EventModel = require('../models/eventModels');

class EventController {
  static async createEvent(req, res) {
    try {
      const eventData = req.body;
      const userId = req.user.userId;
      
      const eventId = await EventModel.create(eventData, userId);
      res.status(201).json({
        message: 'Event created successfully',
        eventId
      });
    } catch (error) {
      console.error('Create event error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getEvents(req, res) {
    try {
      const filters = {
        category: req.query.category,
        date: req.query.date
      };
      
      const events = await EventModel.findAll(filters);
      res.json(events);
    } catch (error) {
      console.error('Get events error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getEvent(req, res) {
    try {
      const event = await EventModel.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.json(event);
    } catch (error) {
      console.error('Get event error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async updateEvent(req, res) {
    try {
      const success = await EventModel.update(req.params.id, req.body);
      if (!success) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.json({ message: 'Event updated successfully' });
    } catch (error) {
      console.error('Update event error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async deleteEvent(req, res) {
    try {
      const success = await EventModel.delete(req.params.id);
      if (!success) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error('Delete event error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = EventController;