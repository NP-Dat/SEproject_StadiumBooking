import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './Ticket.module.css';


interface Ticket {
  id: number;
  userId: number;
  eventId: number;
  eventName: string;
  scheduleId: number;
  eventDate: string;
  eventTime: string;
  zoneId: number;
  zoneName: string;
  seatNumber: string;
  price: number;
  purchaseDate: string;
  status: string;
}

const Ticket = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if this is a newly purchased ticket
  const locationState = location.state as { justPurchased?: boolean };
  const isNewPurchase = locationState?.justPurchased;

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        setLoading(true);
        
        // Check if we have ticket details from navigation state
        const locationState = location.state as { justPurchased?: boolean; ticketDetails?: any };
        
        if (locationState?.justPurchased && locationState?.ticketDetails) {
          // Use the ticket details passed from booking
          const ticketData = locationState.ticketDetails;
          setTicket({
            id: ticketData.ticketId,
            userId: Number(user?.id) || 0,
            eventId: ticketData.eventId,
            eventName: ticketData.eventName,
            scheduleId: ticketData.scheduleId,
            eventDate: ticketData.date,
            eventTime: ticketData.timeStart,
            zoneId: ticketData.zoneId,
            zoneName: ticketData.zoneName,
            seatNumber: ticketData.seatID,
            price: ticketData.price,
            purchaseDate: new Date().toISOString().split('T')[0],
            status: "Active"
          });
          setLoading(false);
          return;
        }
        
        // Otherwise fetch the ticket by ID
        if (!id) {
          setError('Ticket ID not found');
          setLoading(false);
          return;
        }

        // Original ticket fetching code...
        const response = await fetch(`/api/tickets/${id}`);
        // ...rest of the existing code
        
      } catch (err) {
        console.error('Error fetching ticket:', err);
        setError('Failed to load ticket details');
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, user, location.state]);

  if (loading) {
    return <div className={styles.loading}>Loading ticket...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!ticket) {
    return <div className={styles.error}>Ticket not found</div>;
  }

  return (
    <div className={styles.ticketContainer}>
      {isNewPurchase && (
        <div className={styles.successMessage}>
          <h2>Payment Successful!</h2>
          <p>Your ticket has been purchased successfully.</p>
        </div>
      )}
      <div className={styles.ticketCard}>
        <div className={styles.ticketHeader}>
          <h1 className={styles.ticketTitle}>Event Ticket</h1>
          <span className={styles.ticketId}>#{ticket.id}</span>
        </div>
        
        <div className={styles.eventDetails}>
          <h2 className={styles.eventName}>{ticket.eventName}</h2>
          <div className={styles.eventDateTime}>
            <div className={styles.eventDate}>{ticket.eventDate}</div>
            <div className={styles.eventTime}>{ticket.eventTime}</div>
          </div>
        </div>
        
        <div className={styles.ticketDetails}>
          <div className={styles.ticketRow}>
            <span className={styles.ticketLabel}>Zone:</span>
            <span className={styles.ticketValue}>{ticket.zoneName}</span>
          </div>
          <div className={styles.ticketRow}>
            <span className={styles.ticketLabel}>Seat:</span>
            <span className={styles.ticketValue}>{ticket.seatNumber}</span>
          </div>
          <div className={styles.ticketRow}>
            <span className={styles.ticketLabel}>Price:</span>
            <span className={styles.ticketValue}>${ticket.price.toFixed(2)}</span>
          </div>
          <div className={styles.ticketRow}>
            <span className={styles.ticketLabel}>Purchase Date:</span>
            <span className={styles.ticketValue}>{ticket.purchaseDate}</span>
          </div>
          <div className={styles.ticketRow}>
            <span className={styles.ticketLabel}>Status:</span>
            <span className={`${styles.ticketStatus} ${styles[ticket.status.toLowerCase()]}`}>{ticket.status}</span>
          </div>
        </div>
        
        <div className={styles.ticketActions}>
          <button 
            className={styles.downloadButton}
            onClick={() => window.print()}
          >
            Download Ticket
          </button>
          <button 
            className={styles.backButton}
            onClick={() => navigate('/tickets')}
          >
            Back to My Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;