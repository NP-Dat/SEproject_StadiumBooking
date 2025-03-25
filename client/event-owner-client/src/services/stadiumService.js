import axios from 'axios';

const API_URL = 'http://localhost:8008/api/owner';

const stadiumService = {
  getStadiums: async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      const response = await axios.get(`${API_URL}/stadiums`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching stadiums:', error);
      throw error;
    }
  }
};

export default stadiumService;