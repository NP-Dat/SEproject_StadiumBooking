import React from 'react';
import styles from './AdminPanel.module.css';

const AdminPanel = () => {
    return (
        <div className={styles.adminContainer}>
            <h1>Admin Panel</h1>
            <div className={styles.adminContent}>
                {/* Admin features will be added here */}
                <p>Welcome to the admin panel</p>
            </div>
        </div>
    );
};

export default AdminPanel; 