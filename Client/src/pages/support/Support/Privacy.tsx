import React from 'react';
import styles from './Support.module.css';

const Privacy = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Privacy Policy</h1>
            
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
                <p className={styles.content}>
                    We collect information that you provide directly to us, including your name, email address, phone number, and payment information when you make a booking. We also automatically collect certain information about your device and how you interact with our website.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
                <p className={styles.content}>
                    We use your information to process your bookings, communicate with you about your bookings, and improve our services. We may also use your information for marketing purposes with your consent. Your data helps us personalize your experience and provide better customer service.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>3. Information Sharing</h2>
                <p className={styles.content}>
                    We do not sell your personal information. We may share your information with our service providers who assist us in operating our website and conducting our business. These partners are bound by confidentiality agreements and are only permitted to use your information for the specific services they provide.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>4. Data Security</h2>
                <p className={styles.content}>
                    We implement appropriate security measures to protect your personal information. This includes encryption, secure servers, and regular security audits. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>5. Your Rights</h2>
                <p className={styles.content}>
                    You have the right to access, correct, or delete your personal information. You can also opt-out of marketing communications at any time. To exercise these rights, please contact us at privacy@weblifyco.com.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>6. Cookies and Tracking</h2>
                <p className={styles.content}>
                    We use cookies and similar tracking technologies to improve your experience on our website. You can control cookies through your browser settings. For more information about our use of cookies, please refer to our <a href="/cookies">Cookie Policy</a>.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>7. Children's Privacy</h2>
                <p className={styles.content}>
                    Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>8. Changes to Privacy Policy</h2>
                <p className={styles.content}>
                    We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of our service after any changes constitutes your acceptance of the new policy.
                </p>
            </section>
        </div>
    );
};

export default Privacy; 