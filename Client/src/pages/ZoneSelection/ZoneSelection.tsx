import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ScheduleService } from '../../services/ScheduleService';
import { TicketTypeService } from '../../services/TicketTypeService';
import { BookingService } from '../../services/BookingService';
import { AuthService } from '../../services/AuthService';
import { TicketType } from '../../types/ticketType';
import styles from './ZoneSelection.module.css';

const ZoneSelection: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scheduleId, setScheduleId] = useState<number | null>(null);
  const { isAuthenticated } = AuthService.useAuth();
  
  // State for selected zone and quantity
  const [selectedZone, setSelectedZone] = useState<TicketType | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [isBooking, setIsBooking] = useState(false);
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [price, setPrice] = useState(150.00); // You might fetch this dynamically

  useEffect(() => {
    const fetchZones = async () => {
      try {
        setLoading(true);
        
        // First fetch the schedules for this event to get a scheduleId
        if (eventId) {
          const schedules = await ScheduleService.getSchedulesByEventId(eventId);
          
          if (schedules && schedules.length > 0) {
            // Use the first available schedule
            const firstSchedule = schedules[0];
            setScheduleId(firstSchedule.id);
            
            // Now fetch ticket types for this schedule
            const zoneData = await TicketTypeService.getTicketTypesByScheduleId(firstSchedule.id);
            setTicketTypes(zoneData);
          }
        }
      } catch (err) {
        console.error('Error fetching zones:', err);
        setError('Failed to load zones');
      } finally {
        setLoading(false);
      }
    };

    fetchZones();
  }, [eventId]);

  const handleZoneSelect = (zone: TicketType) => {
    setSelectedZone(zone);
    // Reset ticket quantity when changing zones
    setTicketQuantity(1);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTicketQuantity(parseInt(e.target.value));
  };

  // Update the handleConfirmBooking function
  const handleConfirmBooking = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    if (!selectedZone || !scheduleId) return;
    
    try {
      setIsBooking(true);
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        navigate('/login');
        return;
      }
      
      // Create a booking first
      const bookingResult = await BookingService.createBooking(
        parseInt(userId),
        scheduleId,
        selectedZone.id,
        ticketQuantity
      );
      
      // Check for both possible response formats (bookingId or id)
      const bookingId = bookingResult?.bookingId || bookingResult?.id;
      
      if (bookingId) {
        // Store booking data in localStorage for the payment page to use
        const bookingData = {
          eventId: eventId || '',
          zoneName: selectedZone.name,
          quantity: ticketQuantity,
          price: Number(selectedZone.price),
          total: (Number(selectedZone.price) * ticketQuantity).toFixed(2),
          cartId: bookingId
        };
        
        localStorage.setItem('currentBooking', JSON.stringify(bookingData));
        
        // Navigate to payment page
        navigate(`/payment/${bookingId}`);
      } else {
        setError('Failed to create booking');
      }
    } catch (err) {
      console.error('Error creating booking:', err);
      setError('Failed to book tickets. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const closeSelection = () => {
    setSelectedZone(null);
  };

  const handleTicketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const quantity = parseInt(e.target.value);
    setNumberOfTickets(quantity);
  };
  
  // Calculate total price
  const totalPrice = price * numberOfTickets;
  
  if (loading) return <div className={styles.loading}>Loading zones...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <section className={styles.zonePage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Select a Seating Zone</h2>
          <p className={styles.subtitle}>Choose your preferred zone to continue with booking</p>
        </header>

        {ticketTypes.length === 0 ? (
          <p className={styles.noZones}>No zones available for this event schedule.</p>
        ) : (
          <>
            {selectedZone ? (
              <div className={styles.ticketSelection}>
                <div className={styles.selectedZoneCard}>
                  <div className={styles.selectedZoneHeader}>
                    <h4 className={styles.selectedZoneName}>{selectedZone.name}</h4>
                    <button onClick={closeSelection} className={styles.closeButton}>×</button>
                  </div>
                  
                  <div className={styles.selectedZoneBody}>
                    <div className={styles.selectedZonePrice}>
                      ${Number(selectedZone.price).toFixed(2)}
                    </div>
                    
                    <div className={styles.quantitySection}>
                      <label htmlFor="ticketQuantity">Number of Tickets:</label>
                      <select
                        id="ticketQuantity"
                        value={ticketQuantity}
                        onChange={handleQuantityChange}
                        className={styles.quantitySelect}
                      >
                        {[...Array(Math.min(5, selectedZone.availableSeats))].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className={styles.totalSection}>
                      <p className={styles.totalLabel}>Total:</p>
                      <p className={styles.totalAmount}>
                        ${(Number(selectedZone.price) * ticketQuantity).toFixed(2)}
                      </p>
                    </div>
                    
                    <button 
                      className={styles.confirmButton}
                      onClick={handleConfirmBooking}
                      disabled={isBooking}
                    >
                      {isBooking ? 'Processing...' : 'Process Payment'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.zoneGrid}>
                {ticketTypes.map(zone => (
                  <div 
                    key={zone.id} 
                    className={`${styles.zoneCard} ${zone.availableSeats <= 0 ? styles.soldOutCard : ''}`}
                    onClick={() => zone.availableSeats > 0 ? handleZoneSelect(zone) : null}
                  >
                    <div className={styles.zoneHeader}>
                      <h4 className={styles.zoneName}>{zone.name}</h4>
                    </div>
                    
                    <div className={styles.zoneBody}>
                      <div className={styles.zonePrice}>
                        ${Number(zone.price).toFixed(2)}
                      </div>
                      
                      {zone.availableSeats > 0 ? (
                        <div className={styles.zoneAvailability}>
                          <span className={styles.availabilityLabel}>Available Seats</span>
                          <span className={
                            zone.availableSeats > 20 
                              ? styles.goodAvailability 
                              : styles.limitedAvailability
                          }>
                            {zone.availableSeats}
                          </span>
                        </div>
                      ) : (
                        <span className={styles.soldOutBadge}>Sold Out</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ZoneSelection;