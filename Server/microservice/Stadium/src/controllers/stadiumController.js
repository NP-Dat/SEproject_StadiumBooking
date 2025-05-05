const StadiumModel = require('../models/stadiumModel');

class StadiumController {
  static async getAllStadiums(req, res) {
    try {
      const stadiums = await StadiumModel.getAllStadiumsWithEvents();
      res.json(stadiums);
    } catch (error) {
      console.error('Get all stadiums error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getStadiumById(req, res) {
    try {
      const stadiumId = req.params.id;
      const stadium = await StadiumModel.getStadiumByIdWithEvents(stadiumId);
      if (!stadium) {
        return res.status(404).json({ message: 'Stadium not found' });
      }
      res.json(stadium);
    } catch (error) {
      console.error('Get stadium by ID error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Basic CRUD handlers (Optional)
  static async createStadium(req, res) {
     try {
      const newStadium = await StadiumModel.create(req.body);
      res.status(201).json(newStadium);
    } catch (error) {
      console.error('Create stadium error:', error);
      // Add more specific error handling if needed (e.g., validation)
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async updateStadium(req, res) {
    try {
      const stadiumId = req.params.id;
      const success = await StadiumModel.update(stadiumId, req.body);
      if (!success) {
        return res.status(404).json({ message: 'Stadium not found or no changes made' });
      }
      res.json({ message: 'Stadium updated successfully' });
    } catch (error) {
      console.error('Update stadium error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async deleteStadium(req, res) {
    try {
      const stadiumId = req.params.id;
      const success = await StadiumModel.delete(stadiumId);
       if (!success) {
        return res.status(404).json({ message: 'Stadium not found' });
      }
      res.json({ message: 'Stadium deleted successfully' });
    } catch (error) {
      console.error('Delete stadium error:', error);
      // Handle potential foreign key constraint errors if necessary
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = StadiumController;