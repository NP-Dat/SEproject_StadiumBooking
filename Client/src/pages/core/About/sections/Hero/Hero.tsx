import React from "react";
import styles from "./Hero.module.css";

interface HeroProps {
    title: string;
    subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
    return (
        <section className={styles.hero}>
            <div className={styles.heroContent}>
                <h1 className={styles.title}>
                    {title}
                </h1>
                <p className={styles.subtitle}>
                    {subtitle}
                </p>
            </div>
        </section>
    );
};

export default Hero;
