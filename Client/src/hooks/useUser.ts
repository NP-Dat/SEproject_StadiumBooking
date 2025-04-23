import { useState, useEffect, useCallback } from 'react';
import { User, LoginCredentials, RegisterCredentials, AuthError } from '../types/auth';
import { authService } from '../services/authService';

interface UseUserReturn {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

export const useUser = (): UseUserReturn => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Check for existing session on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await authService.getCurrentUser();
                if (response) {
                    setUser(response.user);
                }
            } catch (err) {
                setError('Failed to check authentication status');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = useCallback(async (credentials: LoginCredentials) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.login(credentials);
            setUser(response.user);
        } catch (err) {
            const authError = err as AuthError;
            setError(authError.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const register = useCallback(async (credentials: RegisterCredentials) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.register(credentials);
            setUser(response.user);
        } catch (err) {
            const authError = err as AuthError;
            setError(authError.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            await authService.logout();
            setUser(null);
        } catch (err) {
            setError('Failed to logout');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user
    };
}; 