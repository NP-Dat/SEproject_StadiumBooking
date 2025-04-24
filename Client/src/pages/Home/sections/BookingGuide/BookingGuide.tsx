import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./BookingGuide.module.css";
import Button from "../../../../components/ui/Button/Button";

const steps = [
    {
        title: "Select Event",
        description: "Browse through available events and select the one you want to attend",
        icon: "🎮"
    },
    {
        title: "Choose Section",
        description: "Pick your preferred section in the stadium (VIP, Regular, etc.)",
        icon: "🏟️"
    },
    {
        title: "Select Seats",
        description: "Use our interactive seat map to choose your specific seats",
        icon: "💺"
    },
    {
        title: "Review & Pay",
        description: "Review your selection and complete the payment process",
        icon: "💳"
    }
];

const BookingGuide = () => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <section className={styles.bookingGuide}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={styles.header}
                >
                    <h2 className={styles.title}>How to Book Your Seats</h2>
                    <p className={styles.subtitle}>Follow these simple steps to secure your spot</p>
                </motion.div>

                <div className={styles.stepsGrid}>
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className={`${styles.step} ${currentStep === index ? styles.active : ''}`}
                            onClick={() => setCurrentStep(index)}
                        >
                            <div className={styles.icon}>{step.icon}</div>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <p className={styles.description}>{step.description}</p>
                            {index < steps.length - 1 && (
                                <div className={styles.arrow}>
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className={styles.cta}
                >
                    <Button
                        variant="primary"
                        size="large"
                        className={styles.button}
                        to="/events"
                    >
                        Start Booking Now
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default BookingGuide; 