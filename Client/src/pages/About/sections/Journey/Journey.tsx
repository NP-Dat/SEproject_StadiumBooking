import React from "react";
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
                    <h2 className={styles.sectionTitle}>
                        {title}
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        {subtitle}
                    </p>
                </div>
                <div className={styles.timeline}>
                    {timeline.map((item) => (
                        <div
                            key={item.date}
                            className={styles.timelineItem}
                        >
                            <div className={styles.timelineContent}>
                                <div className={styles.timelineDate}>{item.date}</div>
                                <h3 className={styles.timelineTitle}>{item.title}</h3>
                                <p className={styles.timelineDescription}>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Journey;
