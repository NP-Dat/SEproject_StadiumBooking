import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { AuthState, LoginCredentials, RegisterCredentials, User } from '../types/auth';

interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AuthState>({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: true,
        error: null,
    });

    useEffect(() => {
        const { token, user } = authService.getStoredAuth();
        if (token && user) {
            setState({
                user,
                token,
                isAuthenticated: true,
                loading: false,
                error: null,
            });
        } else {
            setState(prev => ({ ...prev, loading: false }));
        }
    }, []);

    const login = async (credentials: LoginCredentials) => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));
            const { user, token } = await authService.login(credentials);
            authService.storeAuth(token, user);
            setState({
                user,
                token,
                isAuthenticated: true,
                loading: false,
                error: null,
            });
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error instanceof Error ? error.message : 'Login failed',
            }));
            throw error;
        }
    };

    const register = async (credentials: RegisterCredentials) => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));
            const { user, token } = await authService.register(credentials);
            authService.storeAuth(token, user);
            setState({
                user,
                token,
                isAuthenticated: true,
                loading: false,
                error: null,
            });
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error instanceof Error ? error.message : 'Registration failed',
            }));
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setState({
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: null,
            });
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : 'Logout failed',
            }));
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}; 