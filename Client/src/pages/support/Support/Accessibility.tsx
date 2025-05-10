import React from 'react';
import styles from './Support.module.css';

const Accessibility = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Accessibility Statement</h1>
            
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Our Commitment</h2>
                <p className={styles.content}>
                    Weblify Co. is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards. Our goal is to provide a seamless experience for all users, regardless of their abilities.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Accessibility Features</h2>
                <p className={styles.content}>
                    Our website includes the following accessibility features:<br />
                    <strong>Keyboard Navigation:</strong> Full keyboard support for all interactive elements<br />
                    <strong>Screen Reader Compatibility:</strong> Optimized for popular screen readers<br />
                    <strong>High Contrast Mode:</strong> Enhanced visibility options<br />
                    <strong>Resizable Text:</strong> Text can be resized up to 200% without loss of functionality<br />
                    <strong>Alternative Text:</strong> Descriptive alt text for all images<br />
                    <strong>Focus Indicators:</strong> Clear visual indicators for keyboard focus<br />
                    <strong>Skip Links:</strong> Quick access to main content
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Standards Compliance</h2>
                <p className={styles.content}>
                    We strive to meet WCAG 2.1 Level AA standards. Our website is regularly tested for accessibility compliance using both automated tools and manual testing. We are committed to maintaining and improving our accessibility standards.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Feedback</h2>
                <p className={styles.content}>
                    We welcome your feedback on the accessibility of our website. Please let us know if you encounter any accessibility barriers:<br />
                    Email: accessibility@weblifyco.com<br />
                    Phone: +1 (555) 123-4567<br />
                    Hours: Monday to Friday, 9 AM - 5 PM EST
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Assistive Technologies</h2>
                <p className={styles.content}>
                    Our website is compatible with popular screen readers and assistive technologies, including:<br />
                    - JAWS<br />
                    - NVDA<br />
                    - VoiceOver<br />
                    - TalkBack<br />
                    We recommend using the latest versions of these tools for the best experience.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Ongoing Efforts</h2>
                <p className={styles.content}>
                    We are continuously working to improve the accessibility of our website. Our team regularly reviews and updates our accessibility features and content. We conduct regular accessibility audits and user testing to ensure we meet the needs of all our users.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Third-Party Content</h2>
                <p className={styles.content}>
                    While we strive to ensure accessibility across our entire website, some third-party content or features may not be fully accessible. We encourage users to report any accessibility issues they encounter with third-party content.
                </p>
            </section>
        </div>
    );
};

export default Accessibility; 