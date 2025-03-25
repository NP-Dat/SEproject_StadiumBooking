import React from 'react';
import styles from './Legal.module.css';

const Terms: React.FC = () => {
    return (
        <div className={styles.legal}>
            <div className={styles.container}>
                <h1 className={styles.title}>Terms of Service</h1>
                <p className={styles.lastUpdated}>Last Updated: April 1, 2025</p>

                <div className={styles.content}>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>1. Acceptance of Terms</h2>
                        <p className={styles.text}>
                            By accessing or using the Stadium Booking service, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you may not access or use our services.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>2. User Accounts</h2>
                        <p className={styles.text}>
                            When you create an account with us, you must provide accurate and complete information. You are responsible for safeguarding your password and for all activities that occur under your account. We reserve the right to disable any user account if we believe you have violated any provisions of these Terms.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>3. Booking and Payment</h2>
                        <p className={styles.text}>
                            All bookings are subject to availability. A booking is not confirmed until you receive a confirmation email. Payment must be made in full at the time of booking. We accept various payment methods as indicated on our payment page.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>4. Cancellation Policy</h2>
                        <p className={styles.text}>
                            Cancellations made at least 72 hours before the event start time will receive a full refund. Cancellations made between 72 and 24 hours before the event will receive a 50% refund. No refunds will be provided for cancellations made less than 24 hours before the event, except in extraordinary circumstances at our discretion.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>5. Privacy Policy</h2>
                        <p className={styles.text}>
                            Our Privacy Policy, which can be found at [website URL]/privacy, explains how we collect, use, and protect your information. By using our services, you agree to our collection and use of information in accordance with our Privacy Policy.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>6. Limitation of Liability</h2>
                        <p className={styles.text}>
                            To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>7. Changes to Terms</h2>
                        <p className={styles.text}>
                            We reserve the right to modify these terms at any time. If we make material changes to these Terms, we will notify you by email or by posting a notice on our website prior to the changes becoming effective.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms; 