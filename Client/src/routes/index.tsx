import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import publicRoutes from './publicRoutes';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* Public Routes */}
                {publicRoutes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}

                {/* Private Routes (currently commented out) */}
                {/*
                {privateRoutes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
                */}
            </Routes>
            <Footer />
        </Router>
    );
};

export default AppRouter;
