const TicketTypeModel = require('../models/ticketTypeModel');

class TicketTypeController {
  static async getTicketTypes(req, res) {
    try {
      const eventId = req.params.id;
      const eventZones = await TicketTypeModel.findByEventId(eventId);
      res.json(eventZones);
    } catch (error) {
      console.error('Get event zones error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async createTicketType(req, res) {
    try {
      const eventId = req.params.id;
      
      // First, we need to get the eventScheduleID from the eventID
      const [schedules] = await require('../config/db').query(
        'SELECT id FROM EventSchedules WHERE eventID = ? LIMIT 1',
        [eventId]
      );
      
      if (!schedules || schedules.length === 0) {
        return res.status(404).json({ message: 'No schedule found for this event' });
      }

      const eventZoneData = {
        name: req.body.name,
        size: req.body.size,
        eventScheduleID: schedules[0].id,
        price: req.body.price,
        status: req.body.status || 'active'
      };

      const zoneId = await TicketTypeModel.create(eventZoneData);
      res.status(201).json({
        message: 'Event zone created successfully',
        zoneId
      });
    } catch (error) {
      console.error('Create event zone error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async updateTicketType(req, res) {
    try {
      const zoneId = req.params.id;
      const eventZoneData = {
        name: req.body.name,
        size: req.body.size,
        price: req.body.price,
        status: req.body.status
      };

      const success = await TicketTypeModel.update(zoneId, eventZoneData);
      if (!success) {
        return res.status(404).json({ message: 'Event zone not found' });
      }
      
      res.json({ message: 'Event zone updated successfully' });
    } catch (error) {
      console.error('Update event zone error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async deleteTicketType(req, res) {
    try {
      const zoneId = req.params.id;
      const success = await TicketTypeModel.delete(zoneId);
      
      if (!success) {
        return res.status(404).json({ message: 'Event zone not found' });
      }
      
      res.json({ message: 'Event zone deleted successfully' });
    } catch (error) {
      console.error('Delete event zone error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = TicketTypeController;