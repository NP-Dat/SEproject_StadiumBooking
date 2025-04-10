import axios from 'axios'
import { API_URL } from '../config/env'

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  name: string
  email: string
  password: string
}

const authService = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials)
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      return response.data
    } catch (error) {
      throw error
    }
  },

  register: async (data: RegisterData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem('user')
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user')
    if (userStr) return JSON.parse(userStr)
    return null
  }
}

export default authService
