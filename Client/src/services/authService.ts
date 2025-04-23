import axios from 'axios'
import axiosInstance from '../config/axios'
import { useMockImplementation } from '../utils/apiConfig'

// Types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface User {
  id: string
  name: string
  email: string
  token?: string
}

/**
 * Authentication service
 * Provides methods for user authentication and authorization
 */
const authService = {
  /**
   * Login a user
   * @param credentials User credentials
   * @returns Promise with user data
   */
  login: async (credentials: LoginCredentials): Promise<User> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simple validation
          if (!credentials.email || !credentials.password) {
            reject(new Error('Email and password are required'))
            return
          }
          
          // Mock successful login
          const user = {
            id: '1',
            name: 'Test User',
            email: credentials.email,
            token: 'mock-jwt-token'
          }
          
          // Store user in localStorage
          localStorage.setItem('user', JSON.stringify(user))
          
          resolve(user)
        }, 800)
      })
    } else {
      // Real API implementation
      const response = await axiosInstance.post('/auth/login', credentials)
      
      // Store user in localStorage if token exists
      if (response.data && response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      
      return response.data
    }
  },

  /**
   * Register a new user
   * @param userData User registration data
   * @returns Promise with user data
   */
  register: async (userData: RegisterData): Promise<User> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simple validation
          if (!userData.email || !userData.password || !userData.name) {
            reject(new Error('All fields are required'))
            return
          }
          
          // Mock successful registration
          const user = {
            id: Date.now().toString(),
            name: userData.name,
            email: userData.email,
            token: 'mock-jwt-token'
          }
          
          resolve(user)
        }, 1000)
      })
    } else {
      // Real API implementation
      const response = await axiosInstance.post('/auth/register', userData)
      return response.data
    }
  },

  /**
   * Logout the current user
   */
  logout: async (): Promise<void> => {
    // Remove user from local storage
    localStorage.removeItem('user')
    
    if (!useMockImplementation()) {
      // Only call API if using real implementation
      try {
        await axiosInstance.post('/auth/logout')
      } catch (error) {
        console.error('Error during logout:', error)
      }
    }
  },

  /**
   * Get the current user from localStorage
   * @returns User object or null if not logged in
   */
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user')
    if (!userStr) return null
    
    try {
      return JSON.parse(userStr)
    } catch (error) {
      console.error('Error parsing user data:', error)
      return null
    }
  },

  /**
   * Check if the user is logged in
   * @returns True if logged in, false otherwise
   */
  isAuthenticated: (): boolean => {
    return !!authService.getCurrentUser()
  },

  /**
   * Refresh the user's authentication token
   * @returns Promise with updated user data
   */
  refreshToken: async (): Promise<User> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          const currentUser = authService.getCurrentUser()
          
          if (!currentUser) {
            throw new Error('No user to refresh token')
          }
          
          // Mock refreshed token
          const refreshedUser = {
            ...currentUser,
            token: `refreshed-mock-token-${Date.now()}`
          }
          
          // Update in localStorage
          localStorage.setItem('user', JSON.stringify(refreshedUser))
          
          resolve(refreshedUser)
        }, 500)
      })
    } else {
      // Real API implementation
      const response = await axiosInstance.post('/auth/refresh-token')
      
      if (response.data && response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      
      return response.data
    }
  }
}

export default authService
