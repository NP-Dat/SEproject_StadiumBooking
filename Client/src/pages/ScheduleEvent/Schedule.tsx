import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ScheduleService } from '../../services/ScheduleService';
import { TicketTypeService } from '../../services/TicketTypeService';
import { BookingService } from '../../services/BookingService'; 
import { AuthService } from '../../services/AuthService';
import { Schedule } from '../../types/schedule';
import { TicketType } from '../../types/ticketType';
import styles from './Schedule.module.css';

const SchedulePage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = AuthService.useAuth();
  
  // Track which schedule has the zones showing
  const [showZonesForScheduleId, setShowZonesForScheduleId] = useState<number | null>(null);
  // Track loading state for the ticket types
  const [ticketLoading, setTicketLoading] = useState(false);
  // Track selected zone and quantity
  const [selectedZoneId, setSelectedZoneId] = useState<number | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        if (eventId) {
          const response = await ScheduleService.getSchedulesByEventId(eventId);
          setSchedules(response);
        }
      } catch (err) {
        console.error('Error fetching schedules:', err);
        setError('Failed to load schedules');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [eventId]);

  const handleBookNow = async (scheduleId: number) => {
    // Toggle the zones view when clicking the same schedule
    if (showZonesForScheduleId === scheduleId) {
      setShowZonesForScheduleId(null);
      setSelectedZoneId(null);
      return;
    }

    setShowZonesForScheduleId(scheduleId);
    setTicketLoading(true);
    setSelectedZoneId(null);
    
    try {
      const response = await TicketTypeService.getTicketTypesByScheduleId(scheduleId);
      setTicketTypes(response);
    } catch (err) {
      console.error('Error fetching ticket types:', err);
      setError('Failed to load ticket types');
    } finally {
      setTicketLoading(false);
    }
  };

  const handleZoneSelect = (zoneId: number) => {
    setSelectedZoneId(zoneId);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTicketQuantity(parseInt(e.target.value));
  };

  const handleProceedToCheckout = async () => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate('/login');
      return;
    }
    
    if (!selectedZoneId || !showZonesForScheduleId) return;
    
    try {
      // Get user ID from localStorage or auth context
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        navigate('/login');
        return;
      }
      
      // Call booking API
      const response = await BookingService.createBooking(
        parseInt(userId),
        showZonesForScheduleId,
        selectedZoneId,
        ticketQuantity
      );
      
      // Redirect to payment page
      navigate(`/cart`);
    } catch (err) {
      console.error('Error creating booking:', err);
      setError('Failed to create booking. Please try again.');
    }
  };

  // Find the selected zone object
  const selectedZone = ticketTypes.find(zone => zone.id === selectedZoneId);

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <div className={styles.loading}>Loading schedules...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <section className={styles.schedulePage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Available Event Schedules</h2>
          <p className={styles.subtitle}>Choose a schedule that fits your availability and book now!</p>
        </header>

        {schedules.length === 0 ? (
          <p className={styles.noSchedules}>No schedules available for this event.</p>
        ) : (
          <div className={styles.scheduleList}>
            {schedules.map((schedule) => (
              <div key={schedule.id} className={styles.scheduleCard}>
                <div className={styles.scheduleInfo}>
                  <h3 className={styles.scheduleDate}>{formatDate(schedule.date)}</h3>
                  <div className={styles.scheduleDetails}>
                    <p className={styles.scheduleTime}>
                      <span className={styles.infoIcon}>⏱</span>
                      {schedule.timeStart} - {schedule.timeEnd}
                    </p>
                    <p className={styles.scheduleLocation}>
                      <span className={styles.infoIcon}>🏟️</span>
                      {schedule.stadiumName}
                    </p>
                    <p className={styles.scheduleEvent}>
                      <span className={styles.infoIcon}>🎭</span>
                      {schedule.eventName}
                    </p>
                  </div>
                </div>
                <button
                  className={`${styles.bookButton} ${showZonesForScheduleId === schedule.id ? styles.activeButton : ''}`}
                  onClick={() => handleBookNow(schedule.id)}
                >
                  {showZonesForScheduleId === schedule.id ? 'Hide Zones' : 'View Zones'}
                </button>
                
                {/* Zones Section - Clean and Modern Design */}
                {showZonesForScheduleId === schedule.id && (
                  <div className={styles.zonesContainer}>
                    {ticketLoading ? (
                      <div className={styles.loadingZones}>
                        <div className={styles.loadingSpinner}></div>
                        <p>Loading available zones...</p>
                      </div>
                    ) : (
                      <>
                        <h3 className={styles.zoneSelectionTitle}>Select a Zone</h3>
                        
                        {/* Zones Availability Cards */}
                        <div className={styles.zoneGrid}>
                          {ticketTypes.map(zone => (
                            <div 
                              key={zone.id} 
                              className={`${styles.zoneCard} ${selectedZoneId === zone.id ? styles.selectedZoneCard : ''} ${zone.availableSeats <= 0 ? styles.soldOutCard : ''}`}
                              onClick={() => zone.availableSeats > 0 ? handleZoneSelect(zone.id) : null}
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
                                    <span className={styles.availabilityCount}>
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

                        {/* Booking Form - Below the Zones */}
                        {selectedZone && (
                          <div className={styles.bookingForm}>
                            <h3 className={styles.bookingFormTitle}>Complete Your Booking</h3>
                            <div className={styles.bookingDetails}>
                              <div className={styles.bookingDetail}>
                                <span className={styles.detailLabel}>Selected Zone:</span>
                                <strong className={styles.detailValue}>{selectedZone.name}</strong>
                              </div>
                              <div className={styles.bookingDetail}>
                                <span className={styles.detailLabel}>Price per Ticket:</span>
                                <strong className={styles.detailValue}>${selectedZone.price}</strong>
                              </div>
                              <div className={styles.bookingDetail}>
                                <span className={styles.detailLabel}>Available Seats:</span>
                                <strong className={styles.detailValue}>{selectedZone.availableSeats}</strong>
                              </div>
                              <div className={styles.bookingDetail}>
                                <label htmlFor="quantity" className={styles.detailLabel}>Number of Tickets:</label>
                                <select 
                                  id="quantity" 
                                  value={ticketQuantity}
                                  onChange={handleQuantityChange}
                                  className={styles.quantitySelect}
                                >
                                  {Array.from({ length: Math.min(10, selectedZone.availableSeats) }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            
                            <div className={styles.totalSection}>
                              <span className={styles.totalLabel}>Total Price:</span>
                              <span className={styles.totalAmount}>${(Number(selectedZone.price) * ticketQuantity).toFixed(2)}</span>
                            </div>
                            
                            <button 
                              className={styles.checkoutButton}
                              onClick={handleProceedToCheckout}
                            >
                              Proceed to Checkout
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SchedulePage;
