export interface Event {
  id?: number;
  name: string;
  date: string;
  owner: string;
}

export interface Schedule {
  id?: number;
  eventID: number;
  stadiumID: number;
  date: string;
  timeStart: string;
  timeEnd: string;
} 