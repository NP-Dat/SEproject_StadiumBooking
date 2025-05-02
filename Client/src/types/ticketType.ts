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