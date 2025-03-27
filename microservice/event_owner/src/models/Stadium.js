const pool = require('../config/db');

class StadiumModel {
  static async getStadiums() {
    const [stadiums] = await pool.query('SELECT * FROM Stadiums');
    return stadiums;
  }

  static async getScheduleOfStadium(stadiumId) {
    const [schedule] = await pool.query('SELECT id, eventID, date, timeStart, timeEnd FROM EventSchedules WHERE stadiumID = ? ORDER BY date DESC;', [stadiumId]);
    return schedule;
  }
}

module.exports = StadiumModel;