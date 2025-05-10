export interface Cart {
  id: number;
  userID: number;
  numberOfTicket: number;
  totalPrice: number;
  status: 'unPaid' | 'paid' | 'cancelled';
  createdAt: string;
}

export interface UserBooking {
  cartId: number;
  eventTitle: string;
  eventImage: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  stadiumName: string;
  numberOfTicket: number;
  totalPrice: number;
  status: string;
  zoneName: string;
  seat_number: string; // Add this field
}

export interface BookingTicket {
  ticketId: number;
  seatID: number;
  seat_number: string; // Add this field
  zoneName: string;
  price: number;
  date: string;
  timeStart: string;
  timeEnd: string;
  eventId: number;
  eventTitle: string;
  eventDescription: string;
  eventImage: string;
  stadiumId: number;
  stadiumName: string;
}

export interface BookingDetails {
  cart: Cart;
  tickets: BookingTicket[];
}