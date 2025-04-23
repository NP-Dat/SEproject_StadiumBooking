import React from "react";
import { motion } from "framer-motion";
import styles from "./Contact.module.css";

interface ContactProps {
    title: string;
    description: string;
    email: string;
    phone: string;
    address: string;
}

const Contact: React.FC<ContactProps> = ({ title, description, email, phone, address }) => {
    return (
        <section className={styles.contact}>
            <div className={styles.container}>
                <div className={styles.contactContent}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className={styles.contactInfo}
                    >
                        <h2 className={styles.contactTitle}>{title}</h2>
                        <p className={styles.contactDescription}>{description}</p>
                        <div className={styles.contactDetails}>
                            <div className={styles.contactItem}>
                                <span className={styles.contactIcon}>📧</span>
                                <span>{email}</span>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.contactIcon}>📞</span>
                                <span>{phone}</span>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.contactIcon}>📍</span>
                                <span>{address}</span>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className={styles.contactForm}
                    >
                        <form>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Name</label>
                                <input type="text" className={styles.formInput} placeholder="Your name" />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Email</label>
                                <input type="email" className={styles.formInput} placeholder="Your email" />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Message</label>
                                <textarea className={styles.formTextarea} placeholder="Your message"></textarea>
                            </div>
                            <button type="submit" className={styles.submitButton}>
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
