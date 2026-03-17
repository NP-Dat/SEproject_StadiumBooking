export interface TicketType {
    id: number;
    name: string;
    startSeatID: number;
    endSeatID: number;
    size: number;
    eventScheduleID: number;
    price: string;
    status: string;
    availableSeats: number;
  }

export interface BookingData {
  eventId: number;
  zoneName: string;
  quantity: number;
  price: number
}