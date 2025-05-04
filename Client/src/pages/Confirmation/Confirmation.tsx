import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Confirmation.module.css';
import { BookingService } from '../../services/BookingService';

const Confirmation = () => {
    const { bookingId } = useParams<{ bookingId: string }>();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                if (!bookingId) return;
                
                const bookingData = await BookingService.getBookingById(bookingId);
                setBooking(bookingData);
            } catch (err) {
                console.error('Error fetching booking:', err);
                setError('Could not load booking details');
            } finally {
                setLoading(false);
            }
        };

        fetchBooking();
    }, [bookingId]);

    if (loading) return <div className={styles.loading}>Loading your booking details...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.confirmationContainer}>
            <div className={styles.confirmationCard}>
                <div className={styles.header}>
                    <h1>Booking Confirmed!</h1>
                    <p className={styles.bookingId}>Booking #{bookingId}</p>
                </div>
                
                {booking && (
                    <div className={styles.details}>
                        <div className={styles.detailItem}>
                            <span className={styles.label}>Event:</span>
                            <span className={styles.value}>{booking.eventName}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.label}>Date:</span>
                            <span className={styles.value}>{booking.date}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.label}>Tickets:</span>
                            <span className={styles.value}>{booking.quantity} × {booking.zoneName}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.label}>Total Amount:</span>
                            <span className={styles.value}>${booking.totalAmount}</span>
                        </div>
                    </div>
                )}
                
                <div className={styles.actions}>
                    <button 
                        className={styles.viewTicketsButton}
                        onClick={() => navigate('/profile')}
                    >
                        View My Tickets
                    </button>
                    <button 
                        className={styles.exploreButton}
                        onClick={() => navigate('/events')}
                    >
                        Explore More Events
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;