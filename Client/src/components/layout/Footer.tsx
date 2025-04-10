import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

// Enhanced Footer component with more sections and links
const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          {/* Company Info Section */}
          <div className={styles.companyInfo}>
            <div className={styles.logoSection}>
              <div className={styles.logo}>Stadium Booking</div>
              <p className={styles.description}>
                Book your favorite sports events and concerts with ease. Get the best seats and enjoy unforgettable live experiences.
              </p>
            </div>
            
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialIcon} aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links Column */}
          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>Quick Links</h3>
            <div className={styles.linksList}>
              <Link to="/" className={styles.footerLink}>Home</Link>
              <Link to="/about" className={styles.footerLink}>About Us</Link>
              <Link to="/events" className={styles.footerLink}>Events</Link>
              <Link to="/venues" className={styles.footerLink}>Venues</Link>
              <Link to="/faqs" className={styles.footerLink}>FAQs</Link>
            </div>
          </div>
          
          {/* Support Column */}
          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>Support</h3>
            <div className={styles.linksList}>
              <Link to="/contact" className={styles.footerLink}>Contact Us</Link>
              <Link to="/help" className={styles.footerLink}>Help Center</Link>
              <Link to="/terms" className={styles.footerLink}>Terms of Service</Link>
              <Link to="/privacy" className={styles.footerLink}>Privacy Policy</Link>
              <Link to="/refunds" className={styles.footerLink}>Refund Policy</Link>
            </div>
          </div>
          
          {/* Account Column */}
          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>Account</h3>
            <div className={styles.linksList}>
              <Link to="/login" className={styles.footerLink}>Login</Link>
              <Link to="/register" className={styles.footerLink}>Register</Link>
              <Link to="/dashboard" className={styles.footerLink}>My Dashboard</Link>
              <Link to="/bookings" className={styles.footerLink}>My Bookings</Link>
              <Link to="/profile" className={styles.footerLink}>My Profile</Link>
            </div>
          </div>
        </div>
        
        <div className={styles.divider}></div>
        
        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            &copy; {currentYear} Stadium Booking. All rights reserved.
          </p>
          <p className={styles.credits}>
            Designed with ❤️ for sports and music fans
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
