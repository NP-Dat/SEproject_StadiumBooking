const TicketModel = require('../models/ticketModel');

class TicketController {
  static async getAllTickets(req, res) {
    try {
      const tickets = await TicketModel.findAll();
      res.json(tickets);
    } catch (error) {
      console.error('Get all tickets error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getOrderTickets(req, res) {
    try {
      const cartId = req.params.order_id;
      const tickets = await TicketModel.findByOrderId(cartId);
      
      if (!tickets || tickets.length === 0) {
        return res.status(404).json({ message: 'No tickets found for this order' });
      }
      
      res.json(tickets);
    } catch (error) {
      console.error('Get order tickets error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = TicketController;