import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { scheduleAPI, bookingAPI } from '../../../apis/services';
import { useAuth } from '../../../contexts/AuthContext';
import type { EventSchedule } from '../../../types/event';
import type { TicketType } from '../../../types/ticketType';
import type { Booking } from '../../../types/booking';
import styles from './ZoneSelection.module.css';

function ZoneSelection() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scheduleId, setScheduleId] = useState<number | null>(null);
  const { isAuthenticated, user } = useAuth();
  
  // State for selected zone and quantity
  const [selectedZone, setSelectedZone] = useState<TicketType | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [isBooking, setIsBooking] = useState(false);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        setLoading(true);
        
        // First fetch the schedules for this event to get a scheduleId
        if (eventId) {
          const response = await scheduleAPI.getByEventId(parseInt(eventId));
          
          if (response.success && response.data && response.data.length > 0) {
            // Use the first available schedule
            const firstSchedule = response.data[0];
            setScheduleId(firstSchedule.id);
            
            // Now fetch ticket types for this schedule
            // TODO: Implement ticket type fetching with the new API
            // For now, using mock data
            setTicketTypes([
              {
                id: 1,
                name: 'VIP Zone',
                price: '150.00',
                availableSeats: 20,
                startSeatID: 1,
                endSeatID: 20,
                size: 20,
                eventScheduleID: firstSchedule.id,
                status: 'available'
              },
              {
                id: 2,
                name: 'Standard Zone',
                price: '100.00',
                availableSeats: 50,
                startSeatID: 21,
                endSeatID: 70,
                size: 50,
                eventScheduleID: firstSchedule.id,
                status: 'available'
              }
            ]);
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

  const handleConfirmBooking = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    if (!selectedZone || !scheduleId || !eventId || !user?.id) return;
    
    try {
      setIsBooking(true);
      
      // Create a booking
      const booking: Omit<Booking, 'id'> = {
        userId: user.id,
        eventId: parseInt(eventId),
        scheduleId,
        zoneId: selectedZone.id,
        quantity: ticketQuantity,
        totalPrice: parseFloat(selectedZone.price) * ticketQuantity,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const bookingResult = await bookingAPI.create(booking);
      
      if (bookingResult.success && bookingResult.data) {
        // Store booking details for payment
        const price = parseFloat(selectedZone.price);
        localStorage.setItem('currentBooking', JSON.stringify({
          eventId,
          zoneName: selectedZone.name,
          quantity: ticketQuantity,
          price,
          total: (price * ticketQuantity).toFixed(2),
          cartId: bookingResult.data.id
        }));
        
        // Navigate to payment page
        navigate('/payment');
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
                      ${selectedZone.price}
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
                        ${(parseFloat(selectedZone.price) * ticketQuantity).toFixed(2)}
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
                        ${zone.price}
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
}

export default ZoneSelection;