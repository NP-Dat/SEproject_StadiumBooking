import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => {
    return (
        <div className={styles.notFound}>
            <div className={styles.container}>
                <h1 className={styles.title}>404</h1>
                <p className={styles.subtitle}>Page Not Found</p>
                <p className={styles.text}>
                    The page you are looking for might have been removed, had its name changed,
                    or is temporarily unavailable.
                </p>
                <Link to="/" className={styles.homeButton}>
                    Go to Homepage
                </Link>
            </div>
        </div>
    );
};

export default NotFound; 