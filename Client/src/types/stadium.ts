export interface Event {
  scheduleId: number;
  date: string;
  timeStart: string;
  timeEnd: string;
  eventId: number;
  eventName: string;
}

export interface Stadium {
  id: number;
  name: string;
  size: number;
  status: 'Closed' | 'Under Construction' | 'Available';
  address: string;
  events: Event[];
}
