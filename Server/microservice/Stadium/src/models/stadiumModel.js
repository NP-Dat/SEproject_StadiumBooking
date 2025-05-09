const pool = require('../config/db');

class StadiumModel {
  // Get all stadiums with their scheduled events
  static async getAllStadiumsWithEvents() {
    const [stadiums] = await pool.query('SELECT * FROM Stadiums');

    const stadiumsWithEvents = await Promise.all(stadiums.map(async (stadium) => {
      const [events] = await pool.query(`
        SELECT es.id as scheduleId, es.date, es.timeStart, es.timeEnd, e.id as eventId, e.name as eventName
        FROM EventSchedules es
        JOIN EventList e ON es.eventID = e.id
        WHERE es.stadiumID = ?
        ORDER BY es.date, es.timeStart
      `, [stadium.id]);
      return { ...stadium, events };
    }));

    return stadiumsWithEvents;
  }

  // Get a specific stadium by ID with its scheduled events
  static async getStadiumByIdWithEvents(stadiumId) {
    const [stadiums] = await pool.query('SELECT * FROM Stadiums WHERE id = ?', [stadiumId]);
    if (stadiums.length === 0) {
      return null; // Not found
    }
    const stadium = stadiums[0];

    const [events] = await pool.query(`
      SELECT es.id as scheduleId, es.date, es.timeStart, es.timeEnd, e.id as eventId, e.name as eventName
      FROM EventSchedules es
      JOIN EventList e ON es.eventID = e.id
      WHERE es.stadiumID = ?
      ORDER BY es.date, es.timeStart
    `, [stadium.id]);

    return { ...stadium, events };
  }

   // Basic CRUD operations (Optional based on future needs)
   static async create(stadiumData) {
    const { name, size, status, address } = stadiumData;
    const [result] = await pool.query(
      'INSERT INTO Stadiums (name, size, status, address) VALUES (?, ?, ?, ?)',
      [name, size, status, address]
    );
    return { id: result.insertId, ...stadiumData };
  }

  static async update(id, stadiumData) {
    const { name, size, status, address } = stadiumData;
    const [result] = await pool.query(
      'UPDATE Stadiums SET name = ?, size = ?, status = ?, address = ? WHERE id = ?',
      [name, size, status, address, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM Stadiums WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = StadiumModel;