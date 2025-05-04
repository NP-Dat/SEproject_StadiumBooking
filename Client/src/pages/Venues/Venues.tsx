import React, { useState, useEffect } from 'react';
import styles from './Venues.module.css';
import { Link } from 'react-router-dom';

interface Stadium {
  id: number;
  name: string;
  size: number;
  status: string;
  address: string;
}

const Venues: React.FC = () => {
  const [stadiums, setStadiums] = useState<Stadium[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/stadiums');
        if (!response.ok) {
          throw new Error('Failed to fetch stadiums');
        }
        const data = await response.json();
        setStadiums(data);
      } catch (err) {
        setError('Failed to load stadiums. Please try again later.');
        console.error('Error fetching stadiums:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStadiums();
  }, []);

  return (
    <div className={styles.venuesPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Our Venues</h1>
          <p className={styles.subtitle}>Discover the perfect venue for your next event</p>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading venues...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <div className={styles.venuesGrid}>
            {stadiums.map((stadium) => (
              <div key={stadium.id} className={styles.venueCard}>
                <div className={styles.venueImageContainer}>
                  {/* Use a placeholder image or fetch actual images */}
                  <img 
                    src={`https://source.unsplash.com/random/800x600/?stadium&sig=${stadium.id}`} 
                    alt={stadium.name}
                    className={styles.venueImage}
                  />
                  <span className={styles.venueTag}>STADIUM</span>
                </div>
                <div className={styles.venueInfo}>
                  <h2 className={styles.venueName}>{stadium.name}</h2>
                  <p className={styles.venueDescription}>
                    State-of-the-art stadium with premium seating and amenities.
                  </p>
                  <div className={styles.venueDetails}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>CAPACITY:</span>
                      <span className={styles.detailValue}>{stadium.size} seats</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>LOCATION:</span>
                      <span className={styles.detailValue}>{stadium.address}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>STATUS:</span>
                      <span className={styles.detailValue}>{stadium.status}</span>
                    </div>
                  </div>
                  <Link to={`/stadiums/${stadium.id}`} className={styles.viewButton}>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Venues;