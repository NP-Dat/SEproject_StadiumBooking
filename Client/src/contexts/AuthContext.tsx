import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '../services/AuthService';
import { User, LoginResult } from '../types/auth';

interface AuthContextType {
    isAuthenticated: boolean;
    isAdmin: boolean;
    isLoading: boolean;
    user: User | null;
    login: (username: string, password: string) => Promise<LoginResult>;
    logout: () => void;
    register: (
        username: string,
        email: string,
        password: string,
        fullname: string,
        birth: string,
        phonenumber: string,
        address: string
    ) => Promise<LoginResult>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    console.log('AuthProvider rendering');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        console.log('AuthProvider useEffect running');
        // Check authentication status on mount
        const checkAuth = async () => {
            try {
                console.log('Checking auth status...');
                const authStatus = await AuthService.checkAuth();
                console.log('Auth status:', authStatus);
                setIsAuthenticated(authStatus.isAuthenticated);
                setIsAdmin(authStatus.isAdmin);
                setUser(authStatus.user);
                setIsLoading(false);
            } catch (error) {
                console.error('Error checking auth status:', error);
                // Set default state on error
                setIsAuthenticated(false);
                setIsAdmin(false);
                setUser(null);
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (username: string, password: string): Promise<LoginResult> => {
        try {
            console.log('Attempting login...');
            const result = await AuthService.login(username, password);
            console.log('Login result:', result);
            if (result.isAuthenticated) {
                setIsAuthenticated(true);
                setIsAdmin(result.isAdmin);
                setUser(result.user);
                return { success: true, message: 'Login successful' };
            }
            return { success: false, message: result.error || 'Login failed' };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: error instanceof Error ? error.message : 'Login failed' };
        }
    };

    const logout = () => {
        console.log('Logging out...');
        try {
            AuthService.logout();
            setIsAuthenticated(false);
            setIsAdmin(false);
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
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
    ): Promise<LoginResult> => {
        try {
            console.log('Attempting registration...');
            const result = await AuthService.register(
                username,
                email,
                password,
                fullname,
                birth,
                phonenumber,
                address
            );
            console.log('Registration result:', result);
            if (result.isAuthenticated) {
                return { success: true, message: 'Registration successful' };
            }
            return { success: false, message: result.error || 'Registration failed' };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: error instanceof Error ? error.message : 'Registration failed' };
        }
    };

    const value = {
        isAuthenticated,
        isAdmin,
        isLoading,
        user,
        login,
        logout,
        register
    };

    console.log('AuthProvider value:', value);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}