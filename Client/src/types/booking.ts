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
  numberOfTicket: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  eventTitle: string;
  eventImage: string;
  stadiumName: string;
}

export interface BookingTicket {
  ticketId: number;
  seatID: number;
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