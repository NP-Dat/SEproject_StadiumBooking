import { useState } from 'react';

type AuthState = {
    isAuthenticated: boolean;
    user: { name: string; email: string } | null;
};

const useAuth = () => {
    const [auth, setAuth] = useState<AuthState>({
        isAuthenticated: false,
        user: null,
    });

    const login = (userData: { name: string; email: string }) => {
        setAuth({ isAuthenticated: true, user: userData });
        localStorage.setItem('token', 'your-auth-token'); // Example for saving auth token
    };

    const logout = () => {
        setAuth({ isAuthenticated: false, user: null });
        localStorage.removeItem('token');
    };

    return {
        auth,
        login,
        logout,
    };
};

export default useAuth;
