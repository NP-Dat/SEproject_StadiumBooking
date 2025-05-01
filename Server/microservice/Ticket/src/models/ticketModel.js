const pool = require('../config/db');

class TicketModel {
  static async findAll() {
    const [tickets] = await pool.query(
      `SELECT t.*, ez.name as zone_name, ez.price, c.fullName as customer_name,
              s.seat_number, el.name as event_name, es.date, es.timeStart, es.timeEnd
       FROM Tickets t
       JOIN eventZone ez ON t.zoneID = ez.id
       JOIN Customers c ON t.userID = c.id
       JOIN Seats s ON t.seatID = s.id
       JOIN EventSchedules es ON t.scheduleID = es.id
       JOIN EventList el ON es.eventID = el.id
       ORDER BY es.date DESC, es.timeStart DESC`
    );
    return tickets;
  }

  static async findByOrderId(cartId) {
    const [tickets] = await pool.query(
      `SELECT t.*, ez.name as zone_name, ez.price, s.seat_number,
              el.name as event_name, es.date, es.timeStart, es.timeEnd, std.name as stadium_name
       FROM Tickets t
       JOIN eventZone ez ON t.zoneID = ez.id
       JOIN Seats s ON t.seatID = s.id
       JOIN EventSchedules es ON t.scheduleID = es.id
       JOIN EventList el ON es.eventID = el.id
       JOIN Stadiums std ON es.stadiumID = std.id
       WHERE t.cartID = ?
       ORDER BY es.date ASC, es.timeStart ASC`,
      [cartId]
    );
    return tickets;
  }
}

module.exports = TicketModel;