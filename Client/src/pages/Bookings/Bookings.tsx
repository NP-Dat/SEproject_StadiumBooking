import styles from './Bookings.module.css';

const Bookings = () => {
  return (
    <div className={styles.bookingsContainer}>
      <h1 className={styles.title}>My Bookings</h1>
      <p className={styles.subtitle}>View and manage your stadium seat bookings here.</p>
      
      <div className={styles.bookingsGrid}>
        <div className={styles.bookingCard}>
          <h3 className={styles.bookingTitle}>Championship Final</h3>
          <div className={styles.bookingDetails}>
            <p>Date: June 15, 2024</p>
            <p>Time: 7:00 PM</p>
            <p>Section: A12</p>
            <p>Seats: 4</p>
          </div>
          <div className={styles.bookingActions}>
            <button className={styles.actionButton}>View Details</button>
            <button className={`${styles.actionButton} ${styles.cancelButton}`}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bookings 