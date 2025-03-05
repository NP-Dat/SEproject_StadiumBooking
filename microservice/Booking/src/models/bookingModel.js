const pool = require('../config/db');
const moment = require('moment');

class BookingModel {
  static async create(userId, eventId, tickets, totalAmount) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      const bookingNumber = `BKG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const [booking] = await connection.query(
        `INSERT INTO bookings (user_id, event_id, booking_number, 
          total_tickets, total_amount)
         VALUES (?, ?, ?, ?, ?)`,
        [userId, eventId, bookingNumber, tickets.length, totalAmount]
      );

      for (const ticketId of tickets) {
        await connection.query(
          `INSERT INTO booking_details (booking_id, ticket_id, price)
           VALUES (?, ?, ?)`,
          [booking.insertId, ticketId, totalAmount / tickets.length]
        );
      }

      await connection.commit();
      return booking.insertId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async updatePaymentStatus(bookingId, paymentIntentId, status) {
    const [result] = await pool.query(
      `UPDATE bookings 
       SET payment_intent_id = ?, payment_status = ?, status = ?
       WHERE id = ?`,
      [paymentIntentId, status, status === 'paid' ? 'confirmed' : 'pending', bookingId]
    );
    return result.affectedRows > 0;
  }

  static async findById(id) {
    const [bookings] = await pool.query(
      `SELECT b.*, e.title as event_title, e.event_date, e.venue
       FROM bookings b
       JOIN events e ON b.event_id = e.id
       WHERE b.id = ?`,
      [id]
    );
    return bookings[0];
  }

  static async findByUser(userId) {
    const [bookings] = await pool.query(
      `SELECT b.*, e.title as event_title, e.event_date, e.venue
       FROM bookings b
       JOIN events e ON b.event_id = e.id
       WHERE b.user_id = ?
       ORDER BY b.created_at DESC`,
      [userId]
    );
    return bookings;
  }

  static async cancel(id, userId) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      const [booking] = await connection.query(
        `SELECT * FROM bookings 
         WHERE id = ? AND user_id = ? AND status = 'confirmed'`,
        [id, userId]
      );

      if (!booking[0]) {
        throw new Error('Booking not found or cannot be cancelled');
      }

      // Check cancellation deadline (e.g., 24 hours before event)
      const [event] = await connection.query(
        'SELECT event_date FROM events WHERE id = ?',
        [booking[0].event_id]
      );

      const eventDate = moment(event[0].event_date);
      const now = moment();
      if (eventDate.diff(now, 'hours') < 24) {
        throw new Error('Cannot cancel booking within 24 hours of event');
      }

      await connection.query(
        `UPDATE bookings 
         SET status = 'cancelled'
         WHERE id = ?`,
        [id]
      );

      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = BookingModel;