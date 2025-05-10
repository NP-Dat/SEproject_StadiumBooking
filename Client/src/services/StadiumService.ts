import type { Stadium } from '../types/stadium'

class StadiumService {
  private static API_URL = '/api/stadiums'

  static async getStadiums(): Promise<Stadium[]> {
    try {
      const response = await fetch(this.API_URL)
      if (!response.ok) throw new Error('Failed to fetch stadiums')
      return response.json()
    } catch (error) {
      console.error('Error in getStadiums:', error)
      throw error
    }
  }

  static async getStadiumById(id: number): Promise<Stadium> {
    try {
      const response = await fetch(`${this.API_URL}/${id}`)
      if (!response.ok) throw new Error('Failed to fetch stadium')
      return response.json()
    } catch (error) {
      console.error('Error in getStadiumById:', error)
      throw error
    }
  }
}

export { StadiumService } 