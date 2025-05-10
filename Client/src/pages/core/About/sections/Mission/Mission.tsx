import React from "react";
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
                    <div className={styles.missionText}>
                        <h2 className={styles.missionTitle}>{title}</h2>
                        <p className={styles.missionDescription}>{description}</p>
                    </div>
                    <div className={styles.missionImage}>
                        <img src={imageUrl} alt={title} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Mission;
