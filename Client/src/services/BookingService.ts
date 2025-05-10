import { Booking } from '../types/booking';

const API_URL = 'http://localhost:8004/api'; // Booking service API URL

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

  // Update the getUserBookings method to correctly extract price data:

  static async getUserBookings(userId: number): Promise<any[]> {
    try {
      const response = await fetch(`${API_URL}/bookings/getBookedTickets/${userId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch bookings: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Raw API response:", data);
      
      if (data.success && Array.isArray(data.bookedTickets)) {
        // Process bookings at a higher level rather than individual tickets  
        return data.bookedTickets.map((ticket: any) => {
          console.log("Processing ticket:", ticket);
          
          // Force convert price to number and handle different possible field names
          let price = 0;
          
          // Try to extract price directly from various possible fields
          if (ticket.totalPrice !== undefined && ticket.totalPrice !== null) {
            price = Number(ticket.totalPrice);
          } else if (ticket.price !== undefined && ticket.price !== null) {
            price = Number(ticket.price);
          } else if (ticket.zonePrice !== undefined && ticket.zonePrice !== null) {
            price = Number(ticket.zonePrice) * (ticket.numberOfTicket || 1);
          }
          
          console.log(`Extracted price for ticket ${ticket.cartID || ticket.id}: ${price}`);
          
          // Return the booking object with the extracted price and zone name
          return {
            cartId: ticket.cartID || ticket.id || ticket.cartId,
            eventTitle: ticket.eventName,
            eventImage: ticket.eventImage || '',
            date: ticket.date,
            timeStart: ticket.timeStart,
            timeEnd: ticket.timeEnd || '',
            stadiumName: ticket.stadiumName,
            numberOfTicket: ticket.numberOfTicket || 1,
            totalPrice: price,
            status: ticket.status || 'paid',
            // Add zone name
            zoneName: ticket.zoneName || ticket.zone || 'Standard'
          };
        });
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      throw error;
    }
  }

  static async getBookedTickets(userId: number) {
    try {
      const response = await fetch(`${API_URL}/bookings/getBookedTickets/${userId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to retrieve tickets');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching booked tickets:', error);
      throw error;
    }
  }

  // Add the getBookingDetails method
  static async getBookingDetails(bookingId: string | number): Promise<any> {
    try {
      if (!bookingId || bookingId === 'undefined') {
        throw new Error('Invalid booking ID');
      }
      
      // First try with the booking endpoint
      try {
        const response = await fetch(`${API_URL}/bookings/booking/${bookingId}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Booking details response:", data);
          
          // If API returns success with booking structure, return it
          if (data && data.booking) {
            return data.booking;
          }
          
          // Otherwise, build our own structure from the data
          return {
            cart: {
              id: bookingId,
              status: data.status || 'paid',
              totalPrice: data.totalPrice || 0,
              numberOfTicket: data.numberOfTicket || 1
            },
            tickets: Array.isArray(data.tickets) ? data.tickets : []
          };
        }
      } catch (e) {
        console.log('First endpoint attempt failed, trying alternative');
      }
      
      // Fallback to simulated booking details with minimal info
      return {
        cart: {
          id: bookingId,
          status: 'paid',
          totalPrice: 0,
          numberOfTicket: 1
        },
        tickets: [{
          ticketId: bookingId,
          eventTitle: "Event information not available",
          date: "Not available",
          timeStart: "Not available",
          stadiumName: "Not available",
          zoneName: "Not available",
          seatID: "Not available",
          price: 0
        }]
      };
    } catch (error) {
      console.error(`Error fetching booking details for ID ${bookingId}:`, error);
      throw error;
    }
  }
}