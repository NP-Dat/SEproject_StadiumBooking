import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Logo and Contact */}
                <div className={styles.logoSection}>
                    <h1 className={styles.logo}>
                        Webify <span className={styles.logoAccent}>Co.</span>
                    </h1>
                    <p className={styles.address}>
                        Thu Duc District, Ho Chi Minh City
                    </p>
                    <p className={styles.contact}>
                        <span className={styles.contactLabel}>Contact:</span>{' '}
                        <a href="mailto:contact@webify.vn" className={styles.contactLink}>
                            contact@webify.vn
                        </a>
                    </p>
                    <p className={styles.copyright}>
                        &copy; {new Date().getFullYear()} Webify Co.
                    </p>
                </div>

                {/* Important Links */}
                <div className={styles.linksSection}>
                    <h3 className={styles.sectionTitle}>Important</h3>
                    <a href="#" className={styles.link}>
                        About us
                    </a>
                    <a href="#" className={styles.link}>
                        Terms
                    </a>
                    <a href="#" className={styles.link}>
                        Policy
                    </a>
                    <a href="#" className={styles.link}>
                        Contact
                    </a>
                </div>

                {/* Payment and Socials */}
                <div className={styles.paymentSection}>
                    <div>
                        <h3 className={styles.paymentTitle}>Payment</h3>
                        <div className={styles.paymentMethods}>
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0193d01d27ec4f57ac28c071eac09a3f23edb1dca9e08a488e09e8340fd5ab9d?placeholderIfAbsent=true&apiKey=ebb3257718164cd3b8c551bf8167e955"
                                alt="Payment method 1"
                                className={styles.paymentMethod}
                            />
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/30ce08cf3a71ba02a4f3bf27d801f24a23f92a94a0b0862f9e7a226f270b7f04?placeholderIfAbsent=true&apiKey=ebb3257718164cd3b8c551bf8167e955"
                                alt="Payment method 2"
                                className={styles.paymentMethod}
                            />
                        </div>
                    </div>
                    <div>
                        <h3 className={styles.socialTitle}>Follow us</h3>
                        <div className={styles.socialLinks}>
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/611116ccd7b438644a2ef71fc6a83985d14aa0bc2947c93a273f8eea6ba040a8?placeholderIfAbsent=true&apiKey=ebb3257718164cd3b8c551bf8167e955"
                                alt="Social media 1"
                                className={styles.socialIcon}
                            />
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e7eed5fb7672c5b167c981d0582a694cde5677216c3ee139d1c5acd148af9adc?placeholderIfAbsent=true&apiKey=ebb3257718164cd3b8c551bf8167e955"
                                alt="Social media 2"
                                className={styles.socialIcon}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
