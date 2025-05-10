import React from 'react';
import styles from './Support.module.css';

const Refund = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Refund Policy</h1>
            
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>1. General Refund Policy</h2>
                <p className={styles.content}>
                    We understand that plans can change. Our refund policy is designed to be fair to both our customers and our business. This policy applies to all ticket purchases made through our platform.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>2. Cancellation Timeframes</h2>
                <p className={styles.content}>
                    <strong>Full Refund:</strong> Cancellations made 24 hours or more before the event<br />
                    <strong>No Refund:</strong> Cancellations made within 24 hours of the event<br />
                    <strong>Full Refund:</strong> Event cancellations by the organizer<br />
                    <strong>Partial Refund:</strong> Event postponements (option to keep tickets or request refund)
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>3. Refund Process</h2>
                <p className={styles.content}>
                    Refunds will be processed to the original payment method within 5-10 business days. You will receive an email confirmation once the refund is processed. For credit card payments, the refund will appear on your statement within 1-2 billing cycles, depending on your bank.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>4. Special Circumstances</h2>
                <p className={styles.content}>
                    In cases of medical emergencies, military deployment, or other exceptional circumstances, please contact our customer support team at support@weblifyco.com. We will review each case individually and may offer a refund or credit at our discretion.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>5. Non-Refundable Items</h2>
                <p className={styles.content}>
                    The following items are non-refundable:<br />
                    - Processing fees<br />
                    - Service charges<br />
                    - Insurance purchases<br />
                    - Donations to event organizers<br />
                    - Any additional services purchased with the tickets
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>6. Event-Specific Policies</h2>
                <p className={styles.content}>
                    Some events may have specific refund policies set by the event organizer. These policies will be clearly stated during the ticket purchase process. In case of conflict between our general policy and an event-specific policy, the event-specific policy will take precedence.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>7. Contact Us</h2>
                <p className={styles.content}>
                    For any refund-related inquiries, please contact our customer support team:<br />
                    Email: support@weblifyco.com<br />
                    Phone: +1 (555) 123-4567<br />
                    Hours: 24/7 support available
                </p>
            </section>
        </div>
    );
};

export default Refund; 