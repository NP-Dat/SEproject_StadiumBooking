import React, { useState, useEffect } from 'react';
import styles from './Venues.module.css';
import { Link } from 'react-router-dom';
import { StadiumService } from '../../../services/StadiumService'; 
import type { Stadium } from '../../../types/stadium';

const Venues: React.FC = () => {
  const [stadiums, setStadiums] = useState<Stadium[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        const data = await StadiumService.getStadiums();
        setStadiums(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load stadiums');
        console.error('Error fetching stadiums:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStadiums();
  }, []);

  if (isLoading) return <div className={styles.loading}>Loading venues...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!stadiums.length) return <div className={styles.empty}>No venues available</div>;

  return (
    <div className={styles.venuesPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Our Venues</h1>
          <p className={styles.subtitle}>Discover the perfect venue for your next event</p>
        </div>

        <div className={styles.venuesGrid}>
          {stadiums.map((stadium) => (
            <div key={stadium.id} className={styles.venueCard}>
              <div className={styles.venueImageContainer}>
                <img 
                  src={stadium.imageUrl || `https://source.unsplash.com/random/800x600/?stadium&sig=${stadium.id}`}
                  alt={stadium.name}
                  className={styles.venueImage}
                  loading="lazy"
                />
                <span className={`${styles.venueTag} ${styles[stadium.status]}`}>
                  {stadium.status.toUpperCase()}
                </span>
              </div>
              <div className={styles.venueInfo}>
                <h2 className={styles.venueName}>{stadium.name}</h2>
                <p className={styles.venueDescription}>
                  {stadium.description || 'State-of-the-art stadium with premium seating and amenities.'}
                </p>
                <div className={styles.venueDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>CAPACITY:</span>
                    <span className={styles.detailValue}>{stadium.size.toLocaleString()} seats</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>LOCATION:</span>
                    <span className={styles.detailValue}>{stadium.address}</span>
                  </div>
                  {stadium.facilities && stadium.facilities.length > 0 && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>FACILITIES:</span>
                      <span className={styles.detailValue}>
                        {stadium.facilities.slice(0, 3).join(', ')}
                        {stadium.facilities.length > 3 ? '...' : ''}
                      </span>
                    </div>
                  )}
                </div>
                <Link 
                  to={`/stadiums/${stadium.id}`} 
                  className={styles.viewButton}
                  aria-label={`View details for ${stadium.name}`}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Venues;