import React from "react";
import { motion } from "framer-motion";
import styles from "./Mission.module.css";

interface MissionProps {
    title: string;
    description: string;
    imageUrl: string;
}

const Mission: React.FC<MissionProps> = ({ title, description, imageUrl }) => {
    return (
        <section className={styles.mission}>
            <div className={styles.container}>
                <div className={styles.missionContent}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className={styles.missionText}
                    >
                        <h2 className={styles.missionTitle}>{title}</h2>
                        <p className={styles.missionDescription}>{description}</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className={styles.missionImage}
                    >
                        <img src={imageUrl} alt={title} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Mission;
