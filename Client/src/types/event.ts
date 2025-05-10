export interface Event {
    id: number;
    name: string;
    description: string;
    date: string;
    owner: string;
    stadium: {
        id: number;
        name: string;
        address: string;
    };
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
    createdAt: string;
    updatedAt: string;
}

export interface EventSchedule {
    id: number;
    eventId: number;
    date: string;
    timeStart: string;
    timeEnd: string;
    status: 'available' | 'sold_out' | 'cancelled';
    createdAt: string;
    updatedAt: string;
}

export interface EventZone {
    id: number;
    scheduleId: number;
    name: string;
    price: number;
    size: number;
    status: 'available' | 'sold_out';
    createdAt: string;
    updatedAt: string;
}

export interface EventResponse {
    success: boolean;
    data?: Event | Event[];
    error?: string;
}

export interface EventScheduleResponse {
    success: boolean;
    data?: EventSchedule | EventSchedule[];
    error?: string;
}

export interface EventZoneResponse {
    success: boolean;
    data?: EventZone | EventZone[];
    error?: string;
} 