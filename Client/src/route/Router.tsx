import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import AuthLayout from '../layouts/AuthLayout';
import Home from '../pages/public/home/Home';
import About from '../pages/public/About';
import Contact from '../pages/public/Contact';
import Login from '../pages/public/Login';
import Dashboard from '../pages/auth/Dashboard';
import Profile from '../pages/auth/Profile';
import Bookings from '../pages/auth/Bookings';



const Router: React.FC = () => {
    return (
        <Routes>
            {/* Public Layout Routes */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
            </Route>

            {/* Auth Layout Routes */}
            <Route element={<AuthLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/bookings" element={<Bookings />} />
            </Route>
        </Routes>
    );
};

export default Router;
