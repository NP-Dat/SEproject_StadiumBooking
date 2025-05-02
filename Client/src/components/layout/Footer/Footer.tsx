import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Logo and Contact */}
                <div className={styles.logoSection}>
                    <h1 className={styles.logo}>
                        Weblify<span className={styles.logoAccent}> Co.</span>
                    </h1>
                    <p className={styles.description}>
                        Your premier destination for booking seats at multi-use stadiums. Whether it's sports events, concerts, or conferences, we provide the best seats in the house for all kinds of live experiences.                    </p>
                    <p className={styles.address}>
                        Thu Duc District, Ho Chi Minh City
                    </p>
                    <p className={styles.contact}>
                        <span className={styles.contactLabel}>Contact:</span>{' '}
                        <a href="mailto:contact@stadiumbook.com" className={styles.contactLink}>
                            contact@weblifyco.com
                        </a>
                    </p>
                    <p className={styles.copyright}>
                        &copy; {new Date().getFullYear()} Weblify Co. All rights reserved.
                    </p>
                </div>

                {/* Quick Links */}
                <div className={styles.linksSection}>
                    <h3 className={styles.sectionTitle}>Quick Links</h3>
                    <Link to="/events" className={styles.link}>Upcoming Events</Link>
                    <Link to="/venues" className={styles.link}>Stadiums & Venues</Link>
                    <Link to="/about" className={styles.link}>About Us</Link>
                </div>

                {/* Support & Legal */}
                <div className={styles.supportSection}>
                    <h3 className={styles.sectionTitle}>Support & Legal</h3>
                    <Link to="/faq" className={styles.link}>FAQ</Link>
                    <Link to="/terms" className={styles.link}>Terms of Service</Link>
                    <Link to="/privacy" className={styles.link}>Privacy Policy</Link>
                    <Link to="/refund" className={styles.link}>Refund Policy</Link>
                    <Link to="/accessibility" className={styles.link}>Accessibility</Link>
                </div>

                {/* Newsletter & Social */}
                <div className={styles.newsletterSection}>
                    <h3 className={styles.sectionTitle}>Stay Updated</h3>
                    <p className={styles.newsletterText}>
                        Subscribe to our newsletter for exclusive offers and event updates.
                    </p>
                    <div className={styles.newsletterForm}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className={styles.newsletterInput}
                        />
                        <button className={styles.newsletterButton}>Subscribe</button>
                    </div>
                    <div className={styles.socialLinks}>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            <img src="https://i.imgur.com/BhYjdSJ.png" alt="Facebook" className={styles.socialIcon} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            <img src="https://i.imgur.com/jaWNNeC.png" alt="Instagram" className={styles.socialIcon} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
