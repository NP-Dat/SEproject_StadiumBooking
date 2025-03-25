import { motion } from "framer-motion";
import styles from "./JoinUs.module.css";

const benefits = [
    "Exclusive access to premium events",
    "Early bird ticket discounts",
    "Member-only promotions",
    "Priority customer support",
    "Special event notifications"
];

const JoinUs = () => {
    return (
        <section className={styles.joinUs}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className={styles.content}
                >
                    <h2 className={styles.title}>Join Our Community</h2>
                    <p className={styles.description}>
                        Become part of our exclusive community and unlock a world of premium sports and entertainment experiences.
                    </p>
                    <div className={styles.benefitsList}>
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={styles.benefitItem}
                            >
                                <span className={styles.benefitIcon}>✓</span>
                                <span>{benefit}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className={styles.formContainer}
                >
                    <h3 className={styles.formTitle}>Create Your Account</h3>
                    <form className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Full Name</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Email Address</label>
                            <input
                                type="email"
                                className={styles.input}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Password</label>
                            <input
                                type="password"
                                className={styles.input}
                                placeholder="Create a password"
                            />
                        </div>
                        <button type="submit" className={styles.submitButton}>
                            Sign Up Now
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default JoinUs;
