import React from "react";
import { motion } from "framer-motion";
import styles from "./Journey.module.css";

interface TimelineItem {
    date: string;
    title: string;
    description: string;
}

interface JourneyProps {
    title: string;
    subtitle: string;
    timeline: TimelineItem[];
}

const Journey: React.FC<JourneyProps> = ({ title, subtitle, timeline }) => {
    return (
        <section className={styles.journey}>
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
                <div className={styles.timeline}>
                    {timeline.map((item, index) => (
                        <motion.div
                            key={item.date}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className={styles.timelineItem}
                        >
                            <div className={styles.timelineContent}>
                                <div className={styles.timelineDate}>{item.date}</div>
                                <h3 className={styles.timelineTitle}>{item.title}</h3>
                                <p className={styles.timelineDescription}>{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Journey;
