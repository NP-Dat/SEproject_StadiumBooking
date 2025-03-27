import React from "react";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

interface HeroProps {
    title: string;
    subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
    return (
        <section className={styles.hero}>
            <div className={styles.heroContent}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={styles.title}
                >
                    {title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={styles.subtitle}
                >
                    {subtitle}
                </motion.p>
            </div>
        </section>
    );
};

export default Hero;
