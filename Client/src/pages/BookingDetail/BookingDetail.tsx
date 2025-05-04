import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookingService } from '../../services/BookingService';
import { BookingDetails } from '../../types/booking';
import styles from './BookingDetail.module.css';

const BookingDetail: React.FC = () => {
  const { cartId } = useParams<{cartId: string}>();
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        if (cartId) {
          const data = await BookingService.getBookingDetails(parseInt(cartId));
          setBooking(data);
        }
      } catch (err) {
        console.error('Error fetching booking details:', err);
        setError('Failed to load booking details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [cartId]);

  const handleBackClick = () => {
    navigate('/bookings');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <div className={styles.loading}>Loading booking details...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!booking || !booking.cart) return <div className={styles.notFound}>Booking not found</div>;

  const { cart, tickets } = booking;
  // All tickets should be for the same event, so we can use the first one
  const firstTicket = tickets[0];

  return (
    <div className={styles.bookingDetailContainer}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBackClick}>
          &larr; Back to My Bookings
        </button>
        <h1>Booking #{cart.id}</h1>
        <span 
          className={`${styles.status} ${
            cart.status === 'paid' ? styles.statusPaid : 
            cart.status === 'unPaid' ? styles.statusUnpaid : 
            styles.statusCancelled
          }`}
        >
          {cart.status === 'unPaid' ? 'Unpaid' : cart.status}
        </span>
      </div>

      <div className={styles.bookingSummary}>
        <div className={styles.eventInfo}>
          <h2>{firstTicket.eventTitle}</h2>
          <div className={styles.eventImageContainer}>
            {firstTicket.eventImage && (
              <img 
                src={firstTicket.eventImage} 
                alt={firstTicket.eventTitle} 
                className={styles.eventImage} 
              />
            )}
          </div>
          <p className={styles.eventDescription}>{firstTicket.eventDescription}</p>
        </div>
        
        <div className={styles.detailsCard}>
          <h3>Booking Details</h3>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Booking Date</span>
              <span className={styles.detailValue}>{formatDate(cart.createdAt)}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Event Date</span>
              <span className={styles.detailValue}>{formatDate(firstTicket.date)}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Event Time</span>
              <span className={styles.detailValue}>
                {firstTicket.timeStart} - {firstTicket.timeEnd}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Venue</span>
              <span className={styles.detailValue}>{firstTicket.stadiumName}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Number of Tickets</span>
              <span className={styles.detailValue}>{cart.numberOfTicket}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Total Price</span>
              <span className={styles.detailValue}>${cart.totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {cart.status === 'unPaid' && (
            <button className={styles.paymentButton}>
              Complete Payment
            </button>
          )}
        </div>
      </div>

      <div className={styles.ticketsSection}>
        <h3>Your Tickets</h3>
        <div className={styles.ticketsList}>
          {tickets.map((ticket) => (
            <div key={ticket.ticketId} className={styles.ticketItem}>
              <div className={styles.ticketHeader}>
                <span className={styles.ticketIcon}>🎟️</span>
                <span className={styles.ticketNumber}>Ticket #{ticket.ticketId}</span>
              </div>
              <div className={styles.ticketBody}>
                <div className={styles.ticketInfo}>
                  <span className={styles.infoLabel}>Seat</span>
                  <span className={styles.infoValue}>{ticket.seatID}</span>
                </div>
                <div className={styles.ticketInfo}>
                  <span className={styles.infoLabel}>Zone</span>
                  <span className={styles.infoValue}>{ticket.zoneName}</span>
                </div>
                <div className={styles.ticketInfo}>
                  <span className={styles.infoLabel}>Price</span>
                  <span className={styles.infoValue}>${ticket.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;