import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import publicRoutes from './publicRoutes';
import privateRoutes from './privateRoutes';
import MainLayout from '../components/layout/MainLayout';
import NotFound from '../pages/NotFound/NotFound';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                {publicRoutes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <MainLayout>
                                {route.element}
                            </MainLayout>
                        }
                    />
                ))}

                {/* Private Routes */}
                {privateRoutes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <MainLayout>
                                {route.element}
                            </MainLayout>
                        }
                    />
                ))}

                {/* 404 Page */}
                <Route
                    path="/404"
                    element={
                        <MainLayout>
                            <NotFound />
                        </MainLayout>
                    }
                />

                {/* Redirect any unknown routes to 404 */}
                <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
