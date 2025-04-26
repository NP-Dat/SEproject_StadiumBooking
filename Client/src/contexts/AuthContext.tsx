import React, { createContext, useContext, useState, useCallback } from 'react';
import { authAPI } from '../utils/api';
import { User } from '../types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loginAsAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const verifyToken = useCallback(async (token: string, userId: string) => {
    try {
      const response = await authAPI.verifyToken(token, userId);
      if (response.message === 'Valid token') {
        const userResponse = await authAPI.getCurrentUser();
        if (userResponse.user) {
          setUser(userResponse.user);
          setIsAuthenticated(true);
          setIsAdmin(userResponse.user.role === 'admin');
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

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      if (response.user && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.user.id);
        
        setUser(response.user);
        setIsAuthenticated(true);
        setIsAdmin(response.user.role === 'admin');
      } else {
        throw new Error('Invalid login response');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<void> => {
    try {
      const response = await authAPI.register({ username, email, password });
      if (response.user && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.user.id);
        
        setUser(response.user);
        setIsAuthenticated(true);
        setIsAdmin(response.user.role === 'admin');
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}