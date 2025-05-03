const TicketModel = require('../models/ticketModel');


class GetBookedTicketsController {
  static async getBookedTickets(req, res) {
    try {
      const { userID } = req.params;
      const ticketModelInstance = new TicketModel();
      const bookedTickets = await ticketModelInstance.getBookedTickets(userID);
      res.status(200).json({
        message: 'Booked tickets retrieved successfully',
        success: true,
        bookedTickets
      });
    } catch (error) {
      console.error('Error retrieving booked tickets:', error);
      res.status(500).json({
        message: 'Error retrieving booked tickets',
        success: false,
        error: error.message
      });
    }
  }


}

module.exports = GetBookedTicketsController;