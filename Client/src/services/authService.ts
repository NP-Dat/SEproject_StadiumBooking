import axios from '../config/axios';

export const login = async (credentials: { email: string; password: string }) => {
    try {
        const response = await axios.post('/auth/login', credentials);
        localStorage.setItem('token', response.data.token); // Save token
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

export const register = async (userData: { name: string; email: string; password: string }) => {
    try {
        const response = await axios.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token'); // Remove token
};
