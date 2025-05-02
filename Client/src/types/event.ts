export interface Event {
    id: number;
    name: string;
    date: string;
    owner: string;
    description?: string;
    venue?: string;
    capacity?: number;
    price?: number;
    ticketDetails?: TicketDetails;
    benefits?: Benefit[];
}

export interface TicketDetails {
    types: TicketType[];
    notice: string[];
}

export interface TicketType {
    name: string;
    price: number;
    benefits: string[];
    available: number;
}

export interface Benefit {
    title: string;
    items: string[];
}

export interface EventResponse {
    success: boolean;
    data: Event | Event[];
    message?: string;
} 