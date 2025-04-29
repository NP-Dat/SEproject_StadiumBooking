const db = require('../config/db');

class EventZone {
  // Public/Customer
  static async listBySchedule(scheduleId) {
    const [rows] = await db.execute('SELECT * FROM eventZone WHERE eventScheduleID = ?', [scheduleId]);
    return rows;
  }

  // Organizer/Admin
  static async create({ name, size, eventScheduleID, price, status }) {
    const [result] = await db.execute(
      'INSERT INTO eventZone (name, size, eventScheduleID, price, status) VALUES (?, ?, ?, ?, ?)',
      [name, size, eventScheduleID, price, status]
    );
    return this.findById(result.insertId);
  }
  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM eventZone WHERE id = ?', [id]);
    return rows[0];
  }
  static async update(id, { name, size, eventScheduleID, price, status }) {
    await db.execute(
      'UPDATE eventZone SET name = ?, size = ?, eventScheduleID = ?, price = ?, status = ? WHERE id = ?',
      [name, size, eventScheduleID, price, status, id]
    );
    return true;
  }
  static async delete(id) {
    await db.execute('DELETE FROM eventZone WHERE id = ?', [id]);
    return true;
  }
}

module.exports = EventZone;
