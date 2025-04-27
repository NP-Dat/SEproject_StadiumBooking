import React, { useState, useCallback } from 'react';
import { authAPI } from '../utils/api';
import { User, RegisterCredentials, AuthResponse } from '../types/auth';
import { AuthContext } from './AuthContextDef';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const verifyToken = useCallback(async (token: string, userId: string) => {
        try {
            const response = await authAPI.verifyToken(token, userId);
            if (response.message === 'Valid token') {
                const userDataResponse = await authAPI.getCurrentUser();
                // Convert the response to User type after validation
                const userData = {
                    id: userDataResponse.userId || '',
                    username: userDataResponse.userId || '', // Use userId as username if username is not available
                    role: (userDataResponse.role as 'user' | 'admin') || 'user'
                };
                
                if (userData.id) {
                    setUser(userData);
                    setIsAuthenticated(true);
                    setIsAdmin(userData.role === 'admin');
                } else {
                    logout();
                }
            } else {
                logout();
            }
        } catch (error) {
            console.error('Token verification failed:', error);
            logout();
        }
    }, []);

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token && userId) {
            verifyToken(token, userId);
        }
    }, [verifyToken]);

    const login = async (username: string, password: string) => {
        try {
            const response = await authAPI.login(username, password) as AuthResponse;
            if (response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('userId', response.userId!);
                
                const userData: User = {
                    id: response.userId!,
                    username: username,
                    role: response.role as 'user' | 'admin'
                };
                
                setUser(userData);
                setIsAuthenticated(true);
                setIsAdmin(response.role === 'admin');
            } else {
                throw new Error('Invalid login response');
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (
        username: string,
        email: string,
        password: string,
        fullname: string,
        birth: string,
        phonenumber: string,
        address: string
    ): Promise<void> => {
        try {
            const credentials: RegisterCredentials = {
                username,
                email,
                password,
                fullname,
                birth,
                phonenumber,
                address
            };
            
            const response = await authAPI.register(credentials);
            if (response.message === 'User registered successfully') {
                // After successful registration, log in automatically
                await login(username, password);
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    const loginAsAdmin = () => {
        setIsAdmin(true);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            isAdmin,
            login,
            register,
            logout,
            loginAsAdmin
        }}>
            {children}
        </AuthContext.Provider>
    );
};