// src/components/Layout/DashboardLayout.tsx
import React, { ReactNode } from 'react';

type DashboardLayoutProps = {
    children: ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="dashboard-layout">
            {/* You might want a different header or sidebar here */}
            <header className="dashboard-header">
                <h2>Dashboard</h2>
            </header>
            <main>{children}</main>
        </div>
    );
};

export default DashboardLayout;
