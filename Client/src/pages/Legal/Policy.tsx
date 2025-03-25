import React from 'react';
import styles from './Legal.module.css';

const Policy: React.FC = () => {
    return (
        <div className={styles.legal}>
            <div className={styles.container}>
                <h1 className={styles.title}>Privacy Policy</h1>
                <p className={styles.lastUpdated}>Last Updated: April 1, 2025</p>

                <div className={styles.content}>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
                        <p className={styles.text}>
                            We collect information you provide directly to us when you register for an account, create or modify your profile, make a booking, or communicate with us. This information may include your name, email address, phone number, postal address, payment method data, and other information you choose to provide.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
                        <p className={styles.text}>
                            We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, communicate with you about products, services, events, and respond to your comments and questions.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>3. Information Sharing</h2>
                        <p className={styles.text}>
                            We do not share your personal information with third parties except as described in this privacy policy. We may share your information with third party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>4. Data Security</h2>
                        <p className={styles.text}>
                            We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. However, no data transmission over the Internet or storage system can be guaranteed to be 100% secure.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>5. Your Rights</h2>
                        <p className={styles.text}>
                            You may update, correct or delete your account information at any time by logging into your account or contacting us. You may also request access to the personal data we hold about you and request that we correct, amend, or delete it where it is inaccurate or has been processed in violation of this Privacy Policy.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>6. Cookies</h2>
                        <p className={styles.text}>
                            We use cookies and similar technologies to collect information about your activity, browser, and device. You can manage your cookie preferences through your browser settings, but please note that certain features of our website may not function properly if you disable cookies.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>7. Changes to Policy</h2>
                        <p className={styles.text}>
                            We may change this privacy policy from time to time. If we make material changes, we will notify you through email or by posting a notice on our website prior to the changes becoming effective.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Policy; 