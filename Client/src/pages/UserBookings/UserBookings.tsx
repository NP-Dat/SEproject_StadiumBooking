import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingService } from '../../services/BookingService';
import { UserBooking } from '../../types/booking';
import styles from './UserBookings.module.css';

const UserBookings: React.FC = () => {
  const [bookings, setBookings] = useState<UserBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // In a real app, get this from authentication context
  const userId = 2; // Example user ID

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await BookingService.getUserBookings(userId);
        setBookings(data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load your bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleViewDetails = (cartId: number) => {
    navigate(`/bookings/${cartId}`);
  };

  if (loading) return <div className={styles.loading}>Loading your bookings...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (bookings.length === 0) return <div className={styles.emptyState}>You don't have any bookings yet.</div>;

  return (
    <div className={styles.bookingsContainer}>
      <h1 className={styles.pageTitle}>My Bookings</h1>
      
      <div className={styles.bookingsList}>
        {bookings.map((booking) => (
          <div key={booking.cartId} className={styles.bookingCard}>
            <div className={styles.bookingImageContainer}>
              {booking.eventImage && (
                <img 
                  src={booking.eventImage} 
                  alt={booking.eventTitle} 
                  className={styles.eventImage} 
                />
              )}
            </div>
            
            <div className={styles.bookingInfo}>
              <h3 className={styles.eventTitle}>{booking.eventTitle}</h3>
              <p className={styles.eventDate}>
                <span className={styles.infoIcon}>📅</span> {formatDate(booking.date)}
              </p>
              <p className={styles.eventTime}>
                <span className={styles.infoIcon}>⏰</span> {booking.timeStart} - {booking.timeEnd}
              </p>
              <p className={styles.venueInfo}>
                <span className={styles.infoIcon}>🏟️</span> {booking.stadiumName}
              </p>
              
              <div className={styles.bookingDetails}>
                <div className={styles.ticketInfo}>
                  <span className={styles.ticketCount}>{booking.numberOfTicket} tickets</span>
                  <span className={styles.ticketPrice}>${booking.totalPrice.toFixed(2)}</span>
                </div>
                
                <div className={styles.bookingActions}>
                  <span 
                    className={`${styles.bookingStatus} ${
                      booking.status === 'paid' ? styles.statusPaid : 
                      booking.status === 'unPaid' ? styles.statusUnpaid : 
                      styles.statusCancelled
                    }`}
                  >
                    {booking.status === 'unPaid' ? 'Unpaid' : booking.status}
                  </span>
                  
                  <button 
                    className={styles.detailsButton}
                    onClick={() => handleViewDetails(booking.cartId)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBookings;