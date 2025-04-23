import styles from './Profile.module.css';

const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>Profile</h1>
      <p className={styles.subtitle}>Manage your account and profile settings here.</p>
      
      <div className={styles.profileContent}>
        <div className={styles.profileSidebar}>
          <div className={styles.profileInfo}>
            <img
              src="/default-avatar.png"
              alt="Profile"
              className={styles.profileAvatar}
            />
            <h2 className={styles.profileName}>John Doe</h2>
            <p className={styles.profileEmail}>john.doe@example.com</p>
          </div>
          
          <ul className={styles.profileMenu}>
            <li className={`${styles.menuItem} ${styles.active}`}>Profile</li>
            <li className={styles.menuItem}>Bookings</li>
            <li className={styles.menuItem}>Settings</li>
            <li className={styles.menuItem}>Security</li>
          </ul>
        </div>
        
        <div className={styles.profileMain}>
          <h2 className={styles.sectionTitle}>Profile Information</h2>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Full Name</label>
            <input
              type="text"
              className={styles.formInput}
              defaultValue="John Doe"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email</label>
            <input
              type="email"
              className={styles.formInput}
              defaultValue="john.doe@example.com"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Phone Number</label>
            <input
              type="tel"
              className={styles.formInput}
              defaultValue="+1 (555) 123-4567"
            />
          </div>
          
          <button className={styles.saveButton}>Save Changes</button>
        </div>
      </div>
    </div>
  )
}

export default Profile 