const BookingModel = require('../models/bookingModel');
const EventService = require('../services/eventService');
const PaymentService = require('../services/paymentService');

class BookingController {
  static async createBooking(req, res) {
    try {
      const { eventId, quantity } = req.body;
      const userId = req.user.userId;

      // Check event availability
      const event = await EventService.checkEventAvailability(eventId, quantity);
      
      // Create payment intent
      const totalAmount = event.price * quantity;
      const paymentIntent = await PaymentService.createPaymentIntent(totalAmount);

      // Reserve tickets
      const tickets = await EventService.reserveTickets(eventId, userId, quantity);
      
      // Create booking
      const bookingId = await BookingModel.create(userId, eventId, tickets, totalAmount);
      
      // Update booking with payment intent
      await BookingModel.updatePaymentStatus(bookingId, paymentIntent.id, 'pending');

      res.status(201).json({
        message: 'Booking created successfully',
        bookingId,
        clientSecret: paymentIntent.client_secret
      });
    } catch (error) {
      console.error('Create booking error:', error);
      res.status(500).json({ message: error.message || 'Internal server error' });
    }
  }

  static async confirmPayment(req, res) {
    try {
      const { bookingId, paymentIntentId } = req.body;
      
      const success = await PaymentService.confirmPayment(paymentIntentId);
      if (!success) {
        throw new Error('Payment confirmation failed');
      }

      await BookingModel.updatePaymentStatus(bookingId, paymentIntentId, 'paid');

      res.json({ message: 'Payment confirmed successfully' });
    } catch (error) {
      console.error('Confirm payment error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getUserBookings(req, res) {
    try {
      const bookings = await BookingModel.findByUser(req.user.userId);
      res.json(bookings);
    } catch (error) {
      console.error('Get user bookings error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getBooking(req, res) {
    try {
      const booking = await BookingModel.findById(req.params.id);
      if (!booking || booking.user_id !== req.user.userId) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      res.json(booking);
    } catch (error) {
      console.error('Get booking error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async cancelBooking(req, res) {
    try {
      const success = await BookingModel.cancel(req.params.id, req.user.userId);
      if (!success) {
        return res.status(404).json({ message: 'Booking not found or cannot be cancelled' });
      }
      res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
      console.error('Cancel booking error:', error);
      if (error.message.includes('24 hours')) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = BookingController;