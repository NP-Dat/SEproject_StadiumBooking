const TicketTypeModel = require('../models/ticketTypeModel');

class TicketTypeController {
  static async getTicketTypes(req, res) {
    try {
      const eventScheduleID = req.params.id; // Reverted back to using req.params.id for schedule ID
      if (!eventScheduleID) {
         return res.status(400).json({ message: 'Missing schedule ID parameter' });
      }
      const eventZones = await TicketTypeModel.findByEventId(eventScheduleID);
      res.json(eventZones);
    } catch (error) {
      console.error('Get event zones error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async createTicketType(req, res) {
    try {
      const { name, startSeatID, endSeatID, price, status, eventScheduleID } = req.body;

      // Basic validation
      if (!name || startSeatID === undefined || endSeatID === undefined || !price || !status || !eventScheduleID) {
        return res.status(400).json({ message: 'Missing required fields: name, startSeatID, endSeatID, price, status, eventScheduleID' });
      }

      const ticketTypeId = await TicketTypeModel.create({ name, startSeatID, endSeatID, eventScheduleID, price, status });
      res.status(201).json({
        message: 'Ticket type created successfully',
        ticketTypeId
      });
    } catch (error) {
      console.error('Create ticket type error:', error.message);

      // Check for specific validation errors from the model and return 400
      if (error.message.includes('exceed stadium capacity') || 
          error.message.includes('overlaps with existing zone') || 
          error.message.includes('endSeatID must be greater than or equal') ||
          error.message.includes('Event schedule with ID') || 
          error.message.includes('Stadium with ID')
         ) {
           return res.status(400).json({ message: error.message });
       }

      // For any other unexpected errors, return 500
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async updateTicketType(req, res) {
    try {
      const { name, startSeatID, endSeatID, price, status } = req.body;
      const ticketTypeId = req.params.id;

       if (!ticketTypeId) {
         return res.status(400).json({ message: 'Missing ticket type ID parameter' });
      }

      const success = await TicketTypeModel.update(ticketTypeId, { name, startSeatID, endSeatID, price, status });
      res.json({ message: 'Ticket type updated successfully' });

    } catch (error) {
      console.error('Update ticket type error:', error.message);

      // Check for specific validation errors from the model and return 400/404
      if (error.message.includes('Event zone with ID') && error.message.includes('not found')) {
          return res.status(404).json({ message: error.message });
      }
      if (error.message.includes('exceed stadium capacity') || 
          error.message.includes('overlaps with existing zone') || 
          error.message.includes('endSeatID must be greater than or equal') ||
          error.message.includes('Event schedule with ID') || 
          error.message.includes('Stadium with ID')
         ) {
           return res.status(400).json({ message: error.message });
       }

      // For any other unexpected errors, return 500
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async deleteTicketType(req, res) {
    try {
      const ticketTypeId = req.params.id; // Reverted back to using req.params.id for ticket type ID
       if (!ticketTypeId) {
         return res.status(400).json({ message: 'Missing ticket type ID parameter' });
      }
      const success = await TicketTypeModel.delete(ticketTypeId);

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