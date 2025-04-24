import { API_URL } from '../config/env';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth';

const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }

        return response.json();
    },

    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Registration failed');
        }

        return response.json();
    },

    async logout(): Promise<void> {
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getStoredAuth(): { token: string | null; user: any | null } {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        return {
            token,
            user: user ? JSON.parse(user) : null,
        };
    },

    storeAuth(token: string, user: any): void {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    },
};

export default authService; 