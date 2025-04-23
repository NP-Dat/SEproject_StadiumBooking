import authService from './authService'
import stadiumService from './stadiumService'
import bookingService from './bookingService'
import eventService from './eventService'

/**
 * API Service - provides unified access to all APIs
 * Each service already handles switching between mock and real implementations
 */
const apiService = {
  /**
   * Authentication API
   */
  auth: authService,
  
  /**
   * Stadium API
   */
  stadium: stadiumService,
  
  /**
   * Event API
   */
  event: eventService,
  
  /**
   * Booking API
   */
  booking: bookingService
}

export default apiService 