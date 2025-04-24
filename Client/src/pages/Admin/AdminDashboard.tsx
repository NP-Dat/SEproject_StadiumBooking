import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { isAdmin } = useAuth();

    useEffect(() => {
        if (!isAdmin) {
            navigate('/');
        }
    }, [isAdmin, navigate]);

    if (!isAdmin) {
        return null;
    }

    return (
        <div className={styles.adminContainer}>
            <div className={styles.adminCard}>
                <h1 className={styles.title}>Admin Dashboard</h1>
                <div className={styles.statsContainer}>
                    <div className={styles.statCard}>
                        <h3>Total Users</h3>
                        <p className={styles.statValue}>1,234</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Active Events</h3>
                        <p className={styles.statValue}>56</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Total Bookings</h3>
                        <p className={styles.statValue}>789</p>
                    </div>
                </div>
                <div className={styles.actionsContainer}>
                    <button className={styles.actionButton}>
                        Manage Users
                    </button>
                    <button className={styles.actionButton}>
                        Manage Events
                    </button>
                    <button className={styles.actionButton}>
                        View Reports
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard; 