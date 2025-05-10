import axios, { AxiosError } from 'axios';
import { Stadium } from '../types/stadium';

// Base API URL (you can adjust this based on your environment or config file)
const API_URL = 'http://localhost:8011/api/stadiums';

export class StadiumService {
  // Fetch all stadiums with their scheduled events
  static async fetchStadiums(): Promise<Stadium[]> {
    try {
      const response = await axios.get<Stadium[]>(API_URL);
      return response.data;
    } catch (error: unknown) {
      // Check if error is an AxiosError
      if (axios.isAxiosError(error)) {
        // Axios-specific error handling
        const axiosError = error as AxiosError;
        console.error('Axios error:', axiosError.response ? axiosError.response.data : axiosError.message);
      } else {
        // General error handling
        console.error('General error:', error);
      }
      throw new Error('Failed to fetch stadiums');
    }
  }

  // Fetch a specific stadium by ID with events
  static async fetchStadiumById(id: string): Promise<Stadium> {
    try {
      const response = await axios.get<Stadium>(`${API_URL}/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error('Error fetching stadium:', axiosError.response ? axiosError.response.data : axiosError.message);
      } else {
        console.error('Error fetching stadium:', error);
      }
      throw new Error('Failed to fetch stadium');
    }
  }

  // Optional: Create a new stadium
  static async createStadium(stadiumData: Omit<Stadium, 'id'>): Promise<Stadium> {
    try {
      const response = await axios.post<Stadium>(API_URL, stadiumData);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error('Error creating stadium:', axiosError.response ? axiosError.response.data : axiosError.message);
      } else {
        console.error('Error creating stadium:', error);
      }
      throw new Error('Failed to create stadium');
    }
  }

  // Optional: Update an existing stadium
  static async updateStadium(id: string, stadiumData: Omit<Stadium, 'id'>): Promise<void> {
    try {
      await axios.put(`${API_URL}/${id}`, stadiumData);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error('Error updating stadium:', axiosError.response ? axiosError.response.data : axiosError.message);
      } else {
        console.error('Error updating stadium:', error);
      }
      throw new Error('Failed to update stadium');
    }
  }

  // Optional: Delete a stadium
  static async deleteStadium(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error('Error deleting stadium:', axiosError.response ? axiosError.response.data : axiosError.message);
      } else {
        console.error('Error deleting stadium:', error);
      }
      throw new Error('Failed to delete stadium');
    }
  }
}
