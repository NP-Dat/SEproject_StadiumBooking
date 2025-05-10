import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound: FC = () => {
    return (
        <div className={styles.notFound}>
            <h1 className={styles.title}>404</h1>
            <h2 className={styles.subtitle}>Page Not Found</h2>
            <p className={styles.message}>
                The page you are looking for might have been removed, had its name changed,
                or is temporarily unavailable.
            </p>
            <Link to="/" className={styles.homeLink}>
                Return to Home
            </Link>
        </div>
    );
};

export default NotFound; 