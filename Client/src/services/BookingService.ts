import { Booking } from '../types/booking';

const API_URL = 'http://localhost:8004/api'; // Update to match your API gateway URL

export class BookingService {
  static async getBookingById(bookingId: string): Promise<Booking> {
    try {
      const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch booking: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw error;
    }
  }

  static async createBooking(userId: number, scheduleId: number, zoneId: number, quantity: number) {
    try {
      // Update the endpoint to match your API documentation
      const response = await fetch(`${API_URL}/bookings/createBooking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          scheduleId,
          zoneId,
          numberOfTickets: quantity // Update field name to match API expectation
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create booking');
      }
      
      const data = await response.json();
      return {
        success: data.success,
        bookingId: data.cartData?.id,
        cartData: data.cartData
      };
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }

  static async processPayment(bookingId: number, userId: number) {
    try {
      const response = await fetch(`${API_URL}/payments/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartID: bookingId,
          userID: userId
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Payment processing failed');
      }
      
      const data = await response.json();
      return {
        success: true,
        message: data.message || 'Payment successful',
        paymentId: data.paymentId
      };
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  }

  static async getUserBookings(userId: string): Promise<Booking[]> {
    try {
      const response = await fetch(`${API_URL}/bookings/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch user bookings: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      throw error;
    }
  }
}