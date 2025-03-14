// src/components/Layout/PublicLayout.tsx
import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

type PublicLayoutProps = {
    children: ReactNode;
};

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
    return (
        <div className="public-layout">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default PublicLayout;
