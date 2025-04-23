import React from "react";
import { motion } from "framer-motion";
import styles from "./Value.module.css";

interface ValueItem {
    icon: string;
    title: string;
    description: string;
}

interface ValueProps {
    title: string;
    subtitle: string;
    values: ValueItem[];
}

const Value: React.FC<ValueProps> = ({ title, subtitle, values }) => {
    return (
        <section className={styles.values}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className={styles.sectionTitle}
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={styles.sectionSubtitle}
                    >
                        {subtitle}
                    </motion.p>
                </div>
                <div className={styles.valuesGrid}>
                    {values.map((value, index) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className={styles.valueCard}
                        >
                            <span className={styles.valueIcon}>{value.icon}</span>
                            <h3 className={styles.valueTitle}>{value.title}</h3>
                            <p className={styles.valueDescription}>{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Value;
