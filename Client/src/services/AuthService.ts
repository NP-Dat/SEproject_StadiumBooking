import axios, { AxiosError } from 'axios';
import { User, AuthState, LoginCredentials, RegisterCredentials } from '../types/auth';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContextDef';

const API_URL = 'http://localhost:8001/api/auth';
const PAYMENT_API_URL = 'http://localhost:8006/api/payment';

interface ErrorResponse {
    message: string;
}

export class AuthService {
    private static user: User | null = null;

    // Hook for using auth context
    static useAuth() {
        const context = useContext(AuthContext);
        if (context === undefined) {
            throw new Error('useAuth must be used within an AuthProvider');
        }
        return context;
    }

    // New method to create wallet
    static async createWallet(userId: string, initialBalance: number = 0): Promise<boolean> {
        try {
            const response = await axios.post(`${PAYMENT_API_URL}/createWallet`, {
                userID: parseInt(userId),
                initialBalance
            });
            
            console.log('Wallet created successfully:', response.data);
            return true;
        } catch (error) {
            console.error('Error creating wallet:', error);
            return false;
        }
    }

    static async login(credentials: LoginCredentials): Promise<AuthState> {
        try {
            console.log('Attempting login with:', credentials.username);
            const response = await axios.post(`${API_URL}/login`, credentials);
            
            console.log('Login response:', response.data);
            
            if (response.data.message === 'Login successful') {
                // Get the user ID from the response
                const userId = response.data.userId || 'unknown';
                
                // Store user data
                this.user = {
                    id: userId,
                    username: credentials.username
                };
                
                // Store in localStorage for persistence
                localStorage.setItem('userId', userId);
                localStorage.setItem('username', credentials.username);
                
                console.log('Authentication data saved:', {
                    userId,
                    username: credentials.username
                });
                
                return {
                    message: 'Login successful',
                    user: this.user,
                    token: null, 
                    isAuthenticated: true,
                    loading: false,
                    error: null
                };
            }
            
            throw new Error('Login failed: ' + (response.data.message || 'Unknown error'));
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            console.error('Login error:', axiosError.response?.data || axiosError.message);
            return {
                message: 'Login failed',
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: axiosError.response?.data?.message || 'Login failed'
            };
        }
    }

    static async register(credentials: RegisterCredentials): Promise<AuthState> {
        try {
            const response = await axios.post(`${API_URL}/register`, credentials);
            
            if (response.data.message === 'User registered successfully') {
                // After successful registration, log in automatically
                const loginResult = await this.login({
                    username: credentials.username,
                    password: credentials.password
                });
                
                // If login was successful, create a wallet for the user
                if (loginResult.isAuthenticated && loginResult.user) {
                    const walletCreated = await this.createWallet(loginResult.user.id);
                    
                    if (!walletCreated) {
                        console.warn('User registered and logged in, but wallet creation failed');
                        // We still return success since the user is registered and logged in
                        return {
                            ...loginResult,
                            message: 'Registration successful, but wallet creation failed'
                        };
                    }
                }
                
                return {
                    ...loginResult,
                    message: 'Registration and wallet setup successful'
                };
            }
            
            throw new Error('Registration failed: ' + (response.data.message || 'Unknown error'));
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return {
                message: 'Registration failed',
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: axiosError.response?.data?.message || 'Registration failed'
            };
        }
    }

    static isAuthenticated(): boolean {
        return !!localStorage.getItem('userId');
    }

    static async getCurrentUser(): Promise<User | null> {
        if (!this.user) {
            const userId = localStorage.getItem('userId');
            const username = localStorage.getItem('username');
            
            if (userId && username) {
                this.user = {
                    id: userId,
                    username: username
                };
            }
        }
        return this.user;
    }

    static logout(): void {
        this.user = null;
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
    }
}