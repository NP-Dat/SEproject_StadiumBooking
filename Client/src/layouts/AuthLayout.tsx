import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import { Footer } from '../components/Footer';
const AuthLayout: React.FC = () => {
    return (
        <div>
            <Navbar />
            <Banner />
            <Outlet />
            <Footer />
        </div>
    );
};

export default AuthLayout;
