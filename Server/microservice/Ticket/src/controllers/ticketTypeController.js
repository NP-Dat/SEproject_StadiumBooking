const TicketTypeModel = require('../models/ticketTypeModel');

class TicketTypeController {
  static async getTicketTypes(req, res) {
    try {
      const eventScheduleID = req.params.id; // Assuming ID in path is eventScheduleID
      if (!eventScheduleID) {
         return res.status(400).json({ message: 'Missing eventScheduleID parameter' });
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
      // Expect startSeatID and endSeatID, NOT size
      const { name, startSeatID, endSeatID, price, status } = req.body;
      const eventScheduleID = req.params.id; // Assuming ID in path is eventScheduleID

      // Basic validation
      if (!name || startSeatID === undefined || endSeatID === undefined || !price || !status || !eventScheduleID) {
        return res.status(400).json({ message: 'Missing required fields: name, startSeatID, endSeatID, price, status, eventScheduleID' });
      }
      if (parseInt(startSeatID, 10) > parseInt(endSeatID, 10)) {
        return res.status(400).json({ message: 'startSeatID cannot be greater than endSeatID' });
      }

      const ticketTypeId = await TicketTypeModel.create({ name, startSeatID, endSeatID, eventScheduleID, price, status });
      res.status(201).json({
        message: 'Ticket type created successfully',
        ticketTypeId
      });
    } catch (error) {
      console.error('Create ticket type error:', error);
       // Handle specific error from model if needed
       if (error.message.includes('endSeatID must be greater than or equal')) {
           return res.status(400).json({ message: error.message });
       }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async updateTicketType(req, res) {
    try {
      // Expect startSeatID and endSeatID, NOT size
      const { name, startSeatID, endSeatID, price, status } = req.body;
      const ticketTypeId = req.params.id; // Assuming ID in path is ticketTypeId

       if (!ticketTypeId) {
         return res.status(400).json({ message: 'Missing ticketTypeId parameter' });
      }

      // Basic validation
      if (!name || startSeatID === undefined || endSeatID === undefined || !price || !status) {
        return res.status(400).json({ message: 'Missing required fields: name, startSeatID, endSeatID, price, status' });
      }
      if (parseInt(startSeatID, 10) > parseInt(endSeatID, 10)) {
        return res.status(400).json({ message: 'startSeatID cannot be greater than endSeatID' });
      }

      const success = await TicketTypeModel.update(ticketTypeId, { name, startSeatID, endSeatID, price, status });
      if (!success) {
        return res.status(404).json({ message: 'Ticket type not found or no changes made' });
      }
      res.json({ message: 'Ticket type updated successfully' });
    } catch (error) {
      console.error('Update ticket type error:', error);
       // Handle specific error from model if needed
       if (error.message.includes('endSeatID must be greater than or equal')) {
           return res.status(400).json({ message: error.message });
       }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async deleteTicketType(req, res) {
    try {
      const zoneId = req.params.id;
       if (!zoneId) {
         return res.status(400).json({ message: 'Missing ticketTypeId parameter' });
      }
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