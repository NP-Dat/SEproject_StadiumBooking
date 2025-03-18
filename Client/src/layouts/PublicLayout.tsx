import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import { Footer } from '../components/Footer';
import { SubNavbar } from '../components/SubNarbar';

const PublicLayout: React.FC = () => {
    return (
        <div>
            <Banner />
            <Navbar />
            <SubNavbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default PublicLayout;
