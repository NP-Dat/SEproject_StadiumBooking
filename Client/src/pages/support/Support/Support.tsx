import React from 'react'
import styles from './Support.module.css'

export default function Support() {
  return (
    <div className={styles.supportContainer}>
      <h1>Support Center</h1>
      
      <div className={styles.supportContent}>
        <section className={styles.faqSection}>
          <h2>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h3>How do I book tickets?</h3>
              <p>Select an event, choose your seats, and complete the payment process through our secure booking system.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>What is your refund policy?</h3>
              <p>Refunds are available up to 48 hours before the event. Please visit our refund policy page for more details.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>How can I contact customer support?</h3>
              <p>You can reach our support team through email, phone, or live chat during business hours.</p>
            </div>
          </div>
        </section>

        <section className={styles.contactSection}>
          <h2>Contact Us</h2>
          <div className={styles.contactGrid}>
            <div className={styles.contactCard}>
              <h3>Email Support</h3>
              <p>support@stadiumbooking.com</p>
            </div>
            <div className={styles.contactCard}>
              <h3>Phone Support</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className={styles.contactCard}>
              <h3>Live Chat</h3>
              <p>Available 24/7</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 