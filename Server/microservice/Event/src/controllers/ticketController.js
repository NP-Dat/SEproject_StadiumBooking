const TicketModel = require('../models/ticketModels');

class TicketController {
  static async purchaseTickets(req, res) {
    try {
      const { eventId, quantity } = req.body;
      const userId = req.user.userId;

      const tickets = await TicketModel.create(eventId, userId, quantity);
      res.status(201).json({
        message: 'Tickets purchased successfully',
        tickets
      });
    } catch (error) {
      console.error('Purchase tickets error:', error);
      if (error.message === 'Not enough tickets available') {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getUserTickets(req, res) {
    try {
      const tickets = await TicketModel.findByUser(req.user.userId);
      res.json(tickets);
    } catch (error) {
      console.error('Get user tickets error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async cancelTicket(req, res) {
    try {
      const success = await TicketModel.cancel(req.params.id, req.user.userId);
      if (!success) {
        return res.status(404).json({ message: 'Ticket not found or cannot be cancelled' });
      }
      res.json({ message: 'Ticket cancelled successfully' });
    } catch (error) {
      console.error('Cancel ticket error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = TicketController;