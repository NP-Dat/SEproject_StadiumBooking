const BookingModel = require('../models/bookingModel');


class BookingController {
  static async createBooking(req, res) {
    try {
      const { userId, scheduleId, zoneId, numberOfTickets } = req.body;

      // Create an instance of BookingModel
      const bookingModel = new BookingModel();
      
      const cartData = await bookingModel.createCart(userId, [
        { zoneID: zoneId, scheduleID: scheduleId, quantity: numberOfTickets }
      ]);

      const highestSeatID = await bookingModel.getBiggestSeatID(scheduleId, zoneId);
      await bookingModel.insertMultipleTickets(
        userId, 
        highestSeatID, 
        scheduleId, 
        zoneId, 
        cartData.id, 
        numberOfTickets
      );
      
      res.status(201).json({
        message: 'Booking created successfully',
        success: true,
        cartData: {
          id: cartData.id,
          userID: cartData.userID,
          numberOfTicket: cartData.numberOfTicket,
          totalPrice: cartData.totalPrice,
          status: cartData.status
        }
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({
        message: 'Error creating booking',
        success: false,
        error: error.message
      });
    }
  }


}

module.exports = BookingController;