import { motion } from "framer-motion";
import styles from "./Feature.module.css";

const features = [
    {
        icon: "🎯",
        title: "Easy Booking",
        description: "Book your seats in just a few clicks with our intuitive booking system."
    },
    {
        icon: "💺",
        title: "Interactive Seat Map",
        description: "Choose your perfect seat with our interactive stadium seating map."
    },
    {
        icon: "🔒",
        title: "Secure Payment",
        description: "Your transactions are protected with industry-standard security measures."
    },
    {
        icon: "📱",
        title: "Mobile Friendly",
        description: "Access and book from any device with our responsive platform."
    },
    {
        icon: "🎫",
        title: "Digital Tickets",
        description: "Receive instant digital tickets that you can easily access on your device."
    },
    {
        icon: "💬",
        title: "24/7 Support",
        description: "Get help anytime with our dedicated customer support team."
    }
];

const Feature = () => {
    return (
        <section className={styles.features}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={styles.header}
                >
                    <h2 className={styles.title}>Why Choose Us</h2>
                    <p className={styles.subtitle}>
                        Experience the best in stadium booking with our premium features
                    </p>
                </motion.div>

                <div className={styles.featuresGrid}>
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={styles.featureCard}
                        >
                            <div className={styles.icon}>{feature.icon}</div>
                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                            <p className={styles.description}>{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Feature;
