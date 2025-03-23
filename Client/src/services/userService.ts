import axios from '../config/axios';

export const getUserDetails = async () => {
    try {
        const response = await axios.get('/users/me'); // Assumes "/users/me" fetches the current user
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user details:', error);
        throw error;
    }
};
