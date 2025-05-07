const BookingModel = require('../models/bookingModel');
const axios = require('axios'); // Import axios


const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL || 'http://localhost:8006'; // Replace with your actual Payment Service URL or use environment variables


class BookingController {
  static async createBooking(req, res) {
    try {
      const { userId, scheduleId, zoneId, numberOfTickets } = req.body;

      // Create an instance of BookingModel
      const bookingModel = new BookingModel();
      
      const cartData = await bookingModel.createCart(userId, [
        { zoneID: zoneId, scheduleID: scheduleId, quantity: numberOfTickets }
      ]);

      // Call Payment Service to process payment
      try {
        const paymentResponse = await axios.post(`${PAYMENT_SERVICE_URL}/api/payment/processPayment`, {
          userID: userId,
          cartID: cartData.id,
          totalPrice: cartData.totalPrice
        });

        if (paymentResponse.status !== 200 || !paymentResponse.data.message.includes('Payment processed successfully')) {
          // Payment failed or was not successful
          const deletedCart = await bookingModel.deleteCart(cartData.id); // Delete the cart if payment fails
          return res.status(400).json({
            message: 'Payment processing failed',
            success: false,
            paymentError: paymentResponse.data.error || 'Unknown payment error'
          });
        }
        // Payment successful, proceed with booking
      } catch (paymentError) {
        console.error('Error processing payment:', paymentError.response ? paymentError.response.data : paymentError.message);
        const deletedCart = await bookingModel.deleteCart(cartData.id); // Delete the cart if payment fails
        return res.status(500).json({
          message: 'Error during payment processing',
          success: false,
          error: paymentError.response ? paymentError.response.data.error : paymentError.message
        });
      }

      // const highestSeatID = await bookingModel.getBiggestSeatID(scheduleId, zoneId);
      
      await bookingModel.insertMultipleTickets(
        userId, 
        // highestSeatID, 
        scheduleId, 
        zoneId, 
        cartData.id, 
        numberOfTickets
      );
      
      // Update the cart status to 'paid'
      await bookingModel.updateCartStatus(cartData.id, 'paid');

      // Send success response
      res.status(201).json({
        message: 'Booking created successfully',
        success: true,
        cartData: {
          id: cartData.id,
          userID: cartData.userID,
          numberOfTicket: cartData.numberOfTicket,
          totalPrice: cartData.totalPrice,
          status: "paid" // Updated status to 'paid' above
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