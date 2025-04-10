import React from 'react'
import styles from './Dashboard.module.css'

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.heading}>Dashboard</h1>
      <div className={styles.dashboardContent}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Upcoming Events</h2>
          <p className={styles.cardContent}>You have no upcoming events booked.</p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Recent Bookings</h2>
          <p className={styles.cardContent}>You haven't made any bookings yet.</p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Recommended Events</h2>
          <p className={styles.cardContent}>Check out these popular events in your area.</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 