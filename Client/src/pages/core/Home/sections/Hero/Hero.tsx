import { type FC } from 'react';
import styles from "./Hero.module.css";
import Button from '../../../../../components/ui/Button/Button';

const Hero: FC = () => {
    return (
        <section className={styles.hero}>
            <div
                className={styles.heroBackground}
                style={{ 
                    backgroundImage: `url("/images/hero-bg.jpg")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />
            <div className={styles.heroContent}>
                <div>
                    <h1 className={styles.title}>
                        Experience the Thrill of Live Events
                    </h1>
                    <p className={styles.subtitle}>
                        From thrilling sports action to unforgettable concerts and performances,
                        our multi-purpose stadium offers premium seating for every occasion.
                        Experience the best in entertainment, all under one roof.
                    </p>
                </div>

                <div className={styles.ctaContainer}>
                    <Button
                        variant="primary"
                        size="large"
                        className={styles.button}
                        to="/events"
                    >
                        View Events
                    </Button>
                </div>

                <div className={styles.statsContainer}>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>50+</div>
                        <div className={styles.statLabel}>Events Monthly</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>100K+</div>
                        <div className={styles.statLabel}>Happy Customers</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>24/7</div>
                        <div className={styles.statLabel}>Support</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
