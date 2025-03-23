import axios from '../config/axios';

export const getAvailableSeats = async (stadiumId: number) => {
    try {
        const response = await axios.get(`/stadiums/${stadiumId}/seats`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch available seats:', error);
        throw error;
    }
};

export const reserveSeat = async (seatId: number, userId: number) => {
    try {
        const response = await axios.post(`/seats/${seatId}/reserve`, { userId });
        return response.data;
    } catch (error) {
        console.error('Failed to reserve seat:', error);
        throw error;
    }
};
