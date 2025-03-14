// src/routes/PublicRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout';
import Home from '../pages/home/Home';

const PublicRoutes: React.FC = () => {
    return (
        <PublicLayout>
            <Routes>
                <Route path="/" element={<Home />} />

            </Routes>
        </PublicLayout>
    );
};

export default PublicRoutes;
