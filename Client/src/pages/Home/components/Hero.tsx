import { motion } from "framer-motion";
import styles from "./Hero.module.css";

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.heroBackground} />
            <div className={styles.heroContent}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className={styles.title}>
                        Experience the Thrill of Live Sports
                    </h1>
                    <p className={styles.subtitle}>
                        Book your seats for the most exciting sports events.
                        Get the best view of the action with our premium seating options.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={styles.ctaContainer}
                >
                    <button className={styles.primaryButton}>
                        Book Now
                    </button>
                    <button className={styles.secondaryButton}>
                        View Events
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className={styles.statsContainer}
                >
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
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
