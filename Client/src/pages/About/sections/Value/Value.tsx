import React from "react";
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
                    <h2 className={styles.sectionTitle}>
                        {title}
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        {subtitle}
                    </p>
                </div>
                <div className={styles.valuesGrid}>
                    {values.map((value) => (
                        <div
                            key={value.title}
                            className={styles.valueCard}
                        >
                            <span className={styles.valueIcon}>{value.icon}</span>
                            <h3 className={styles.valueTitle}>{value.title}</h3>
                            <p className={styles.valueDescription}>{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Value;
