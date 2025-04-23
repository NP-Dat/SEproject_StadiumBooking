const pool = require('../config/db');

class TicketModel {
  static async create(eventId, userId, quantity) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      const [event] = await connection.query(
        'SELECT price, available_tickets FROM events WHERE id = ? FOR UPDATE',
        [eventId]
      );

      if (!event[0] || event[0].available_tickets < quantity) {
        throw new Error('Not enough tickets available');
      }

      const tickets = [];
      for (let i = 0; i < quantity; i++) {
        const ticketNumber = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const [result] = await connection.query(
          `INSERT INTO tickets (event_id, user_id, ticket_number, price)
           VALUES (?, ?, ?, ?)`,
          [eventId, userId, ticketNumber, event[0].price]
        );
        tickets.push(result.insertId);
      }

      await connection.query(
        `UPDATE events 
         SET available_tickets = available_tickets - ?
         WHERE id = ?`,
        [quantity, eventId]
      );

      await connection.commit();
      return tickets;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async findByUser(userId) {
    const [tickets] = await pool.query(
      `SELECT t.*, e.title, e.event_date, e.venue
       FROM tickets t
       JOIN events e ON t.event_id = e.id
       WHERE t.user_id = ?
       ORDER BY e.event_date ASC`,
      [userId]
    );
    return tickets;
  }

  static async cancel(ticketId, userId) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      const [ticket] = await connection.query(
        `SELECT event_id FROM tickets 
         WHERE id = ? AND user_id = ? AND status = 'reserved'`,
        [ticketId, userId]
      );

      if (!ticket[0]) {
        throw new Error('Ticket not found or cannot be cancelled');
      }

      await connection.query(
        `UPDATE tickets 
         SET status = 'cancelled'
         WHERE id = ?`,
        [ticketId]
      );

      await connection.query(
        `UPDATE events 
         SET available_tickets = available_tickets + 1
         WHERE id = ?`,
        [ticket[0].event_id]
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

module.exports = TicketModel;