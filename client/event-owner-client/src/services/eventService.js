import axios from 'axios';

const API_URL = 'http://localhost:8008/api/owner';

const eventService = {
  getStadiumSchedule: async (stadiumId) => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      const response = await axios.get(`${API_URL}/stadiums/${stadiumId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching stadium schedule:', error);
      throw error;
    }
  },
  
  createEvent: async (eventData) => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      const response = await axios.post(`${API_URL}/create-event`, eventData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }
};

export default eventService;