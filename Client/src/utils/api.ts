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
    login: async (email: string, password: string) => {
        const response = await api.post<AuthResponse>('/auth/login', { email, password });
        return response.data;
    },
    register: async (credentials: { username: string, email: string, password: string }) => {
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