import axios from '../config/axios';

export const getStadiumDetails = async (stadiumId: number) => {
    try {
        const response = await axios.get(`/stadiums/${stadiumId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch stadium details:', error);
        throw error;
    }
};
