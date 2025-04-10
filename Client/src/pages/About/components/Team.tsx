import React from "react";
import { motion } from "framer-motion";
import styles from "./Team.module.css";

const Team = () => {
    const team = [
        { name: "Jane Smith", role: "CEO", image: "/team-jane.jpg" },
        { name: "John Doe", role: "CTO", image: "/team-john.jpg" },
        { name: "Emily Carter", role: "Design Lead", image: "/team-emily.jpg" },
    ];

    return (
        <section className={styles.team}>
            <h2 className={styles.title}>Meet Our Team</h2>
            <div className={styles.teamGrid}>
                {team.map((member, index) => (
                    <motion.div
                        key={index}
                        className={styles.memberCard}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className={styles.memberImage}
                        />
                        <h3 className={styles.memberName}>{member.name}</h3>
                        <p className={styles.memberRole}>{member.role}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Team;
