import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import publicRoutes from './publicRoutes';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import styles from './Route.module.css';

const AppRouter = () => {
    return (
        <Router>
            <div className={styles.router}>
                <Navbar />
                <main className={styles.mainContent}>
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
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default AppRouter;
