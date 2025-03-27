import React from 'react';
import { Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import Profile from '../pages/Profile/Profile'; // Example: Add your private components here

const isAuthenticated = () => {
    // Replace this with your authentication logic
    return localStorage.getItem('token') !== null;
};

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
    return isAuthenticated() ? <>{ children } < /> : <Navigate to="/login" replace />;
};

/*
const privateRoutes = [
{ path: '/dashboard', element: <PrivateRoutes><Dashboard /></PrivateRoutes > },
    { path: '/profile', element: <PrivateRoutes><Profile /></PrivateRoutes > }, // Example protected route

];
*/
export default privateRoutes;
