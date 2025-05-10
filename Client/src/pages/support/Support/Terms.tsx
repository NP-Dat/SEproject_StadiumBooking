import React from 'react';
import styles from './Support.module.css';

const Terms = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Terms of Service</h1>
            
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>1. Acceptance of Terms</h2>
                <p className={styles.content}>
                    By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>2. Booking and Payment</h2>
                <p className={styles.content}>
                    All bookings are subject to availability. Payment must be made in full at the time of booking. We accept various payment methods as listed on our website. Prices are subject to change without notice, but changes will not affect bookings that have already been confirmed.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>3. Cancellation and Refunds</h2>
                <p className={styles.content}>
                    Cancellations made 24 hours or more before the event will receive a full refund. Cancellations made within 24 hours of the event are non-refundable. For detailed information, please refer to our <a href="/refund">Refund Policy</a>.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>4. User Responsibilities</h2>
                <p className={styles.content}>
                    Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>5. Intellectual Property</h2>
                <p className={styles.content}>
                    All content on this website, including but not limited to text, graphics, logos, and images, is the property of Weblify Co. and is protected by copyright laws. Unauthorized use of any content may violate copyright, trademark, and other laws.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>6. Limitation of Liability</h2>
                <p className={styles.content}>
                    Weblify Co. shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. Our total liability for any claims related to the service will not exceed the amount you paid to us in the last 12 months.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>7. Changes to Terms</h2>
                <p className={styles.content}>
                    We reserve the right to modify these terms at any time. We will notify users of any changes by posting the new terms on this page. Your continued use of the service after any changes constitutes your acceptance of the new terms.
                </p>
            </section>
        </div>
    );
};

export default Terms; 