import React, { useState, useEffect } from 'react';
import { AuthService } from '../services/AuthService';
import { User, RegisterCredentials } from '../types/auth';
import { AuthContext } from './AuthContextDef';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    // Check for stored user on component mount
    useEffect(() => {
        const checkStoredUser = () => {
            try {
                const userId = localStorage.getItem('userId');
                const username = localStorage.getItem('username');
                
                if (userId && username) {
                    // Create user object directly from localStorage
                    const userData = {
                        id: userId,
                        username: username
                    };
                    
                    setUser(userData);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('User verification failed:', error);
                logout();
            }
        };

        checkStoredUser();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const response = await AuthService.login({ username, password });
            
            if (response.isAuthenticated && response.user) {
                // Set state
                setUser(response.user);
                setIsAuthenticated(true);
                return { success: true, message: 'Login successful' };
            } else {
                throw new Error(response.error || 'Login failed');
            }
        } catch (error) {
            console.error('Login failed:', error);
            return { 
                success: false, 
                message: error instanceof Error ? error.message : 'Login failed'
            };
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
    ) => {
        try {
            const credentials: RegisterCredentials = {
                username,
                password,
                fullname,
                birth,
                phonenumber,
                email,
                address
            };
            
            const response = await AuthService.register(credentials);
            
            if (response.isAuthenticated && response.user) {
                setUser(response.user);
                setIsAuthenticated(true);
                return { success: true, message: 'Registration successful' };
            } else {
                throw new Error(response.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            return { 
                success: false, 
                message: error instanceof Error ? error.message : 'Registration failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        setUser(null);
        setIsAuthenticated(false);
        AuthService.logout();
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};