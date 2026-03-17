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
  seat_number: string;
}

export interface BookingTicket {
  id: number;
  totalPrice: number;
  price: number;
  zonePrice: string;
  cartID: number;
  numberOfTicket: number;
  zoneName: string;
  eventName: string;
  eventImage: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  stadiumName: string;
  status: string;
  seat_number: string;
}

export interface BookingDetails {
  cart: Cart;
  tickets: BookingTicket[];
}