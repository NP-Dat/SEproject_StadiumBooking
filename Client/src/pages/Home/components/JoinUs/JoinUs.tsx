import { motion } from "framer-motion";
import styles from "./JoinUs.module.css";
import Button from "../../../../components/ui/Button/Button";
import Input from "../../../../components/ui/Input/Input";

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
                        <Input
                            id="fullName"
                            label="Full Name"
                            type="text"
                            placeholder="Enter your full name"
                            value=""
                            onChange={() => {}}
                            required
                        />
                        <Input
                            id="email"
                            label="Email Address"
                            type="email"
                            placeholder="Enter your email"
                            value=""
                            onChange={() => {}}
                            required
                        />
                        <Input
                            id="password"
                            label="Password"
                            type="password"
                            placeholder="Create a password"
                            value=""
                            onChange={() => {}}
                            required
                        />
                        <Button
                            type="submit"
                            variant="primary"
                            size="large"
                            className={styles.submitButton}
                        >
                            Sign Up Now
                        </Button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default JoinUs;
