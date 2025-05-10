import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Confirmation.module.css';
import { BookingService } from '../../../services/BookingService';
import type { BookingDetails } from '../../../types/booking';

const Confirmation = () => {
    const { bookingId } = useParams<{ bookingId: string }>();
    const navigate = useNavigate();
    const [booking, setBooking] = useState<BookingDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                if (!bookingId) return;

                const bookingData = await BookingService.getBookingDetails(bookingId);
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
    if (!booking) return <div className={styles.error}>No booking found</div>;

    return (
        <div className={styles.confirmationContainer}>
            <div className={styles.confirmationCard}>
                <div className={styles.header}>
                    <h1>Booking Confirmed!</h1>
                    <p className={styles.bookingId}>Booking #{bookingId}</p>
                </div>

                <div className={styles.details}>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Event:</span>
                        <span className={styles.value}>{booking.tickets[0]?.eventTitle}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Date:</span>
                        <span className={styles.value}>{booking.tickets[0]?.date}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Tickets:</span>
                        <span className={styles.value}>{booking.cart.numberOfTicket} × {booking.tickets[0]?.zoneName}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Total Amount:</span>
                        <span className={styles.value}>${booking.cart.totalPrice}</span>
                    </div>
                </div>

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