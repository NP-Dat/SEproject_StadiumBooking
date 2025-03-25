import React from 'react';
import { Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';

// Check for Profile page or handle it if missing
const Profile = () => (
    <div>
        <h1>User Profile</h1>
        <p>Edit your profile information here.</p>
    </div>
);

const isAuthenticated = () => {
    // Replace this with your authentication logic
    return localStorage.getItem('token') !== null;
};

const PrivateRoutes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
};

const privateRoutes = [
    { path: '/dashboard', element: <PrivateRoutes><Dashboard /></PrivateRoutes> },
    { path: '/profile', element: <PrivateRoutes><Profile /></PrivateRoutes> }
];

export default privateRoutes; 