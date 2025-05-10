import React from 'react'
import styles from './AdminPanel.module.css'

export default function AdminPanel() {
  return (
    <div className={styles.adminContainer}>
      <h1>Admin Panel</h1>
      <div className={styles.adminContent}>
        <div className={styles.adminSection}>
          <h2>Quick Actions</h2>
          <div className={styles.actionGrid}>
            <button className={styles.actionButton}>Manage Events</button>
            <button className={styles.actionButton}>Manage Venues</button>
            <button className={styles.actionButton}>View Bookings</button>
            <button className={styles.actionButton}>User Management</button>
          </div>
        </div>
        
        <div className={styles.adminSection}>
          <h2>Statistics</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h3>Total Bookings</h3>
              <p className={styles.statNumber}>0</p>
            </div>
            <div className={styles.statCard}>
              <h3>Active Events</h3>
              <p className={styles.statNumber}>0</p>
            </div>
            <div className={styles.statCard}>
              <h3>Total Users</h3>
              <p className={styles.statNumber}>0</p>
            </div>
            <div className={styles.statCard}>
              <h3>Revenue</h3>
              <p className={styles.statNumber}>$0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 