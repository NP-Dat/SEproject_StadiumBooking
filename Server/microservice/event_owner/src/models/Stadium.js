const pool = require('../config/db');

class StadiumModel {
  static async getStadiums() {
    const [stadiums] = await pool.query('SELECT * FROM Stadiums');
    return stadiums;
  }
}

module.exports = StadiumModel;