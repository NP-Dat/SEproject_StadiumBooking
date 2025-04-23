import axiosInstance from '../config/axios'
import { useMockImplementation } from '../utils/apiConfig'
import { Booking, Event, Seat } from './stadiumService'

// Types
export interface PaymentInfo {
  cardNumber: string
  expiryDate: string
  cvv: string
  nameOnCard: string
}

export interface BookingRequest {
  userId: string
  eventId: string
  seatIds: string[]
  paymentInfo: PaymentInfo
}

export interface BookingResponse {
  booking: Booking
  paymentConfirmation: string
  success: boolean
}

// Mock data storage
const MOCK_BOOKINGS: Booking[] = []

// Helper functions
const generateConfirmationCode = (): string => {
  return Math.random().toString(36).substring(2, 10).toUpperCase()
}

/**
 * Booking service
 * Provides methods for managing bookings and payments
 */
const bookingService = {
  /**
   * Create a new booking
   * @param bookingRequest Booking request data
   * @returns Promise with booking response
   */
  createBooking: async (bookingRequest: BookingRequest): Promise<BookingResponse> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            // Validate payment info (mock validation)
            if (
              !bookingRequest.paymentInfo.cardNumber ||
              !bookingRequest.paymentInfo.expiryDate ||
              !bookingRequest.paymentInfo.cvv
            ) {
              reject(new Error('Invalid payment information'))
              return
            }
            
            // Validate seats (mock validation)
            if (!bookingRequest.seatIds || bookingRequest.seatIds.length === 0) {
              reject(new Error('No seats selected'))
              return
            }
            
            // In a real implementation, this would fetch from the backend
            // For now we'll create a mock booking
            const mockEvent: Event = {
              id: bookingRequest.eventId,
              name: 'Event Name',
              description: 'Event Description',
              stadiumId: '1',
              date: '2023-12-20',
              time: '19:00',
              type: 'Sports'
            }
            
            // Create mock seats
            const mockSeats: Seat[] = bookingRequest.seatIds.map((id, index) => ({
              id,
              section: String.fromCharCode(65 + Math.floor(index / 10)), // A, B, C...
              row: String(Math.floor(index / 5) + 1),
              number: String((index % 5) + 1),
              price: 50 + (Math.floor(index / 10) * 25),
              isAvailable: false, // Now booked
              stadiumId: '1'
            }))
            
            // Calculate total price
            const totalPrice = mockSeats.reduce((sum, seat) => sum + seat.price, 0)
            
            // Create the booking
            const newBooking: Booking = {
              id: `booking-${Date.now()}`,
              userId: bookingRequest.userId,
              seats: mockSeats,
              event: mockEvent,
              totalPrice,
              bookingDate: new Date().toISOString(),
              status: 'confirmed'
            }
            
            // Add to mock storage
            MOCK_BOOKINGS.push(newBooking)
            
            // Create response
            const response: BookingResponse = {
              booking: newBooking,
              paymentConfirmation: generateConfirmationCode(),
              success: true
            }
            
            resolve(response)
          } catch (error) {
            reject(error)
          }
        }, 1500) // Simulate network delay
      })
    } else {
      // Real API implementation
      const response = await axiosInstance.post('/bookings', bookingRequest)
      return response.data
    }
  },
  
  /**
   * Get booking by ID
   * @param bookingId Booking ID
   * @returns Promise with booking details or null if not found
   */
  getBookingById: async (bookingId: string): Promise<Booking | null> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          const booking = MOCK_BOOKINGS.find(b => b.id === bookingId) || null
          resolve(booking)
        }, 500)
      })
    } else {
      // Real API implementation
      const response = await axiosInstance.get(`/bookings/${bookingId}`)
      return response.data
    }
  },
  
  /**
   * Get all bookings for a user
   * @param userId User ID
   * @returns Promise with list of user bookings
   */
  getUserBookings: async (userId: string): Promise<Booking[]> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          const bookings = MOCK_BOOKINGS.filter(b => b.userId === userId)
          resolve(bookings)
        }, 700)
      })
    } else {
      // Real API implementation
      const response = await axiosInstance.get(`/users/${userId}/bookings`)
      return response.data
    }
  },
  
  /**
   * Cancel a booking
   * @param bookingId Booking ID
   * @returns Promise with success status
   */
  cancelBooking: async (bookingId: string): Promise<boolean> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const bookingIndex = MOCK_BOOKINGS.findIndex(b => b.id === bookingId)
          
          if (bookingIndex === -1) {
            reject(new Error('Booking not found'))
            return
          }
          
          // Update booking status
          MOCK_BOOKINGS[bookingIndex].status = 'cancelled'
          
          // In a real implementation, this would also free up the seats
          
          resolve(true)
        }, 800)
      })
    } else {
      // Real API implementation
      const response = await axiosInstance.put(`/bookings/${bookingId}/cancel`)
      return response.data.success
    }
  },
  
  /**
   * Update booking (e.g., change seats)
   * @param bookingId Booking ID
   * @param updatedSeats Array of seat IDs
   * @returns Promise with updated booking
   */
  updateBooking: async (bookingId: string, updatedSeats: string[]): Promise<Booking> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const bookingIndex = MOCK_BOOKINGS.findIndex(b => b.id === bookingId)
          
          if (bookingIndex === -1) {
            reject(new Error('Booking not found'))
            return
          }
          
          // Create mock updated seats
          const updatedMockSeats: Seat[] = updatedSeats.map((id, index) => ({
            id,
            section: String.fromCharCode(65 + Math.floor(index / 10)), // A, B, C...
            row: String(Math.floor(index / 5) + 1),
            number: String((index % 5) + 1),
            price: 50 + (Math.floor(index / 10) * 25),
            isAvailable: false, // Now booked
            stadiumId: '1'
          }))
          
          // Calculate new total price
          const newTotalPrice = updatedMockSeats.reduce((sum, seat) => sum + seat.price, 0)
          
          // Update the booking
          MOCK_BOOKINGS[bookingIndex] = {
            ...MOCK_BOOKINGS[bookingIndex],
            seats: updatedMockSeats,
            totalPrice: newTotalPrice
          }
          
          resolve(MOCK_BOOKINGS[bookingIndex])
        }, 1000)
      })
    } else {
      // Real API implementation
      const response = await axiosInstance.put(`/bookings/${bookingId}`, { seatIds: updatedSeats })
      return response.data
    }
  },

  /**
   * Get booking receipt
   * @param bookingId Booking ID
   * @returns Promise with receipt URL
   */
  getBookingReceipt: async (bookingId: string): Promise<{ receiptUrl: string }> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const booking = MOCK_BOOKINGS.find(b => b.id === bookingId)
          
          if (!booking) {
            reject(new Error('Booking not found'))
            return
          }
          
          // Generate a mock receipt URL
          const receiptUrl = `https://example.com/receipts/${bookingId}.pdf`
          
          resolve({ receiptUrl })
        }, 600)
      })
    } else {
      // Real API implementation
      const response = await axiosInstance.get(`/bookings/${bookingId}/receipt`)
      return response.data
    }
  },
  
  /**
   * Verify payment status
   * @param bookingId Booking ID
   * @returns Promise with payment status
   */
  verifyPayment: async (bookingId: string): Promise<{ 
    verified: boolean, 
    paymentStatus: 'pending' | 'completed' | 'failed' 
  }> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const booking = MOCK_BOOKINGS.find(b => b.id === bookingId)
          
          if (!booking) {
            reject(new Error('Booking not found'))
            return
          }
          
          // Mock payment verification
          resolve({
            verified: true,
            paymentStatus: 'completed'
          })
        }, 700)
      })
    } else {
      // Real API implementation
      const response = await axiosInstance.get(`/bookings/${bookingId}/payment-status`)
      return response.data
    }
  }
}

export default bookingService 