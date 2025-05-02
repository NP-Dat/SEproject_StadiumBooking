import { AuthService } from '../services/AuthService';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated } = AuthService.useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const location = useLocation();
    
    useEffect(() => {
        const checkAuth = async () => {
            // Check token in localStorage directly
            const userId = localStorage.getItem('userId');
            
            // Updated check
            if (userId) {
                setIsValid(true);
            } else {
                setIsValid(false);
            }
            
            setIsLoading(false);
        };
        
        checkAuth();
    }, []);
    
    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Checking authentication...</p>
            </div>
        );
    }
    
    // Navigate to login if not authenticated
    if (!isValid && !isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    // If authenticated, render the protected content
    return <>{children}</>;
};

export default ProtectedRoute;