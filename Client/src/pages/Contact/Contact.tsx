import React from 'react';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
    return (
        <div className={styles.contact}>
            <div className={styles.container}>
                <h1 className={styles.title}>Contact Us</h1>
                <p className={styles.subtitle}>Get in touch with our team</p>

                <div className={styles.content}>
                    <div className={styles.contactInfo}>
                        <h2>Contact Information</h2>
                        <p><strong>Address:</strong> 123 Stadium Avenue, Thu Duc District, Ho Chi Minh City</p>
                        <p><strong>Email:</strong> <a href="mailto:info@stadiumbooking.com">info@stadiumbooking.com</a></p>
                        <p><strong>Phone:</strong> +84 123 456 789</p>
                        <p><strong>Hours:</strong> Monday-Friday: 9am-5pm</p>
                    </div>

                    <div className={styles.form}>
                        <h2>Send us a message</h2>
                        <form>
                            <div className={styles.formGroup}>
                                <label htmlFor="name" className={styles.label}>Your Name</label>
                                <input type="text" id="name" className={styles.input} placeholder="John Doe" />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email" className={styles.label}>Email Address</label>
                                <input type="email" id="email" className={styles.input} placeholder="john@example.com" />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="message" className={styles.label}>Message</label>
                                <textarea
                                    id="message"
                                    className={styles.textarea}
                                    placeholder="How can we help you?"
                                    rows={5}
                                ></textarea>
                            </div>

                            <button type="submit" className={styles.submitButton}>
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact; 