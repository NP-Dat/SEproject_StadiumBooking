import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/AuthService';
import styles from './Ticket.module.css';

// You'll need to create a TicketService to handle ticket-related API calls
// import { TicketService } from '../../services/TicketService';

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
  const { user } = AuthService.useAuth();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        setLoading(true);
        
        // Replace this with your actual API call
        // const response = await TicketService.getTicketById(Number(id));
        // setTicket(response);
        
        // Mock data for now
        setTicket({
          id: Number(id),
          userId: user?.id || 0,
          eventId: 1,
          eventName: "Stadium Concert",
          scheduleId: 1,
          eventDate: "2023-12-15",
          eventTime: "19:00",
          zoneId: 2,
          zoneName: "VIP Zone",
          seatNumber: "A-123",
          price: 150,
          purchaseDate: "2023-11-01",
          status: "Active"
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching ticket:', err);
        setError('Failed to load ticket details');
        setLoading(false);
      }
    };

    if (id) {
      fetchTicket();
    }
  }, [id, user]);

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