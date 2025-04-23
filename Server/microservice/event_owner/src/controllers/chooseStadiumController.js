const StadiumModel = require('../models/Stadium');

class ChooseStadiumController {
    static async getStadiums(req, res) {
        try {
            const stadiums = await StadiumModel.getStadiums();
            res.json(stadiums);
        } catch (error) {
            console.error('Get stadiums error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = ChooseStadiumController;