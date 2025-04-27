import axios from 'axios';
import { AuthResponse } from '../types/auth';
import { API_URL } from '../config/env';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    login: async (username: string, password: string) => {
        const response = await api.post<AuthResponse>('/auth/login', { username, password });
        return response.data;
    },
    register: async (credentials: { email: string, password: string, username: string, fullname: string, birth: string, phonenumber: string, address: string }) => {
        const response = await api.post<AuthResponse>('/auth/register', credentials);
        return response.data;
    },
    verifyToken: async (token: string, userId: string) => {
        const response = await api.post('/auth/verify-token', { token, userId });
        return response.data;
    },
    getCurrentUser: async () => {
        const response = await api.get<AuthResponse>('/auth/profile');
        return response.data;
    }
};

export default api;