import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { EventService } from '../../../services/EventService';
import { ScheduleService } from '../../../services/ScheduleService';
import { TicketTypeService } from '../../../services/TicketTypeService';
import { Event, Benefit } from '../../../types/event';
import { TicketType } from '../../../types/ticketType';
import Login from '../../core/Auth/Login/Login';
import Register from '../../core/Auth/Register/Register';
import styles from './EventDetail.module.css';

const mockBenefits: Benefit[] = [
    {
        title: "What's Included",
        items: [
            "Access to all main event activities",
            "Complimentary parking",
            "Free Wi-Fi access",
            "Event souvenir",
            "Access to event mobile app"
        ]
    },
    {
        title: "Additional Perks",
        items: [
            "Discounts at partner restaurants",
            "Exclusive access to event photos",
            "Priority booking for future events",
            "Membership in event community",
            "Special offers from sponsors"
        ]
    }
];

const EventDetail = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const navigate = useNavigate();
    const [event, setEvent] = useState<Event | null>(null);
    const [relatedEvents, setRelatedEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const { isAuthenticated, login, register } = useAuth();
    const [zones, setZones] = useState<TicketType[]>([]);
    const [loadingZones, setLoadingZones] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                if (!eventId) return;
                const eventData = await EventService.getEventById(eventId);
                // Add mock benefits but use real zones
                const eventWithMockData = {
                    ...eventData,
                    benefits: mockBenefits
                };
                setEvent(eventWithMockData);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err instanceof Error ? err.message : 'An error occurred while fetching event details');
            } finally {
                setLoading(false);
            }
        };

        const fetchRelatedEvents = async () => {
            try {
                const eventsData = await EventService.getEvents();
                // Filter out the current event and take first 8 events
                const filteredEvents = eventsData
                    .filter((e: Event) => e.id !== Number(eventId))
                    .slice(0, 8);
                setRelatedEvents(filteredEvents);
            } catch (err) {
                console.error('Error fetching related events:', err);
            }
        };

        const fetchZones = async () => {
            try {
                if (!eventId) return;
                
                setLoadingZones(true);
                // First fetch the schedules for this event to get a scheduleId
                const schedules = await ScheduleService.getSchedulesByEventId(eventId);
                
                if (schedules && schedules.length > 0) {
                    // Use the first available schedule
                    const firstSchedule = schedules[0];
                    
                    // Now fetch ticket types for this schedule
                    const zoneData = await TicketTypeService.getTicketTypesByScheduleId(firstSchedule.id);
                    setZones(zoneData);
                }
            } catch (err) {
                console.error('Error fetching zones:', err);
                // Don't set main error to avoid blocking the whole component
            } finally {
                setLoadingZones(false);
            }
        };

        if (eventId) {
            fetchEvent();
            fetchRelatedEvents();
            fetchZones(); // Add this call to fetch zones
        }
    }, [eventId]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleBookNow = () => {
        navigate(`/schedules/event/${event?.id}/zones`);
    };

    const handleEventClick = (eventId: number) => {
        navigate(`/events/${eventId}`);
    };

    const handleLoginSuccess = async (username: string, password: string) => {
        try {
            await login(username, password);
            setShowLoginModal(false);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleRegisterSuccess = async (
        username: string,
        email: string,
        password: string,
        fullname: string,
        birth: string,
        phonenumber: string,
        address: string
    ) => {
        try {
            await register(username, email, password, fullname, birth, phonenumber, address);
            setShowRegisterModal(false);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    const renderZones = () => {
        if (loadingZones) {
            return <div className={styles.loadingZones}>Loading available zones...</div>;
        }

        if (zones.length === 0) {
            return <div className={styles.noZones}>No seating zones available for this event</div>;
        }

        return (
            <div className={styles.ticketTypes}>
                {zones.map((zone) => (
                    <div key={zone.id} className={styles.ticketType}>
                        <h3>{zone.name}</h3>
                        <p className={styles.ticketPrice}>${Number(zone.price).toFixed(2)}</p>
                        
                        {zone.availableSeats > 0 ? (
                            <p className={styles.ticketAvailable}>Available: {zone.availableSeats}</p>
                        ) : (
                            <div className={styles.soldOutTag}>Sold Out</div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    if (loading) {
        return <div className={styles.loading}>Loading event details...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error: {error}</div>;
    }

    if (!event) {
        return <div className={styles.error}>Event not found</div>;
    }

    return (
        <div className={styles.eventDetailContainer}>
            <div className={styles.eventHeader}>
                <h1 className={styles.eventTitle}>{event.name}</h1>
                <div className={styles.eventMeta}>
                    <span className={styles.eventDate}>{formatDate(event.date)}</span>
                    <span className={styles.eventOwner}>Organized by: {event.owner}</span>
                </div>
            </div>

            <div className={styles.eventContent}>
                <div className={styles.mainContent}>
                    {event.description && (
                        <div className={styles.eventDescription}>
                            <h2>About the Event</h2>
                            <p>{event.description}</p>
                        </div>
                    )}

                    <div className={styles.eventDetails}>
                        {event.venue && (
                            <div className={styles.detailItem}>
                                <h3>Venue</h3>
                                <p>{event.venue}</p>
                            </div>
                        )}
                        {event.capacity && (
                            <div className={styles.detailItem}>
                                <h3>Capacity</h3>
                                <p>{event.capacity} seats</p>
                            </div>
                        )}
                        {event.price && (
                            <div className={styles.detailItem}>
                                <h3>Price</h3>
                                <p>${event.price}</p>
                            </div>
                        )}
                    </div>

                    {/* Replace hardcoded ticket section with dynamic zones */}
                    <div className={styles.ticketSection}>
                        <h2>Ticket Details</h2>
                        {renderZones()}
                        
                        {/* Keep the notice section if needed */}
                        <div className={styles.noticeSection}>
                            <h3>Important Notice</h3>
                            <ul className={styles.noticeList}>
                                <li>Tickets are non-refundable</li>
                                <li>Children under 12 must be accompanied by an adult</li>
                                <li>Doors open 1 hour before the event</li>
                                <li>Please arrive at least 30 minutes before the event starts</li>
                                <li>Valid ID required for ticket collection</li>
                            </ul>
                        </div>
                    </div>

                    {event.benefits && (
                        <div className={styles.benefitsSection}>
                            {event.benefits.map((benefitGroup, index) => (
                                <div key={index} className={styles.benefitGroup}>
                                    <h2>{benefitGroup.title}</h2>
                                    <ul className={styles.benefitsList}>
                                        {benefitGroup.items.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}

                    <button 
                        className={styles.bookNowButton} 
                        onClick={handleBookNow}
                    >
                        Book Now
                    </button>

                    <div className={styles.relatedEventsSection}>
                        <h2>You may also like</h2>
                        <div className={styles.relatedEventsList}>
                            {relatedEvents.map((relatedEvent) => (
                                <div 
                                    key={relatedEvent.id} 
                                    className={styles.relatedEventCard}
                                    onClick={() => handleEventClick(relatedEvent.id)}
                                >
                                    <h3 className={styles.relatedEventTitle}>{relatedEvent.name}</h3>
                                    <p className={styles.relatedEventDate}>{formatDate(relatedEvent.date)}</p>
                                    <p className={styles.relatedEventOwner}>Organized by: {relatedEvent.owner}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {showLoginModal && (
                <Login
                    onClose={() => setShowLoginModal(false)}
                    onSwitchToRegister={() => {
                        setShowLoginModal(false);
                        setShowRegisterModal(true);
                    }}
                    onLogin={handleLoginSuccess}
                />
            )}

            {showRegisterModal && (
                <Register
                    onClose={() => setShowRegisterModal(false)}
                    onSwitchToLogin={() => {
                        setShowRegisterModal(false);
                        setShowLoginModal(true);
                    }}
                    onRegister={handleRegisterSuccess}
                />
            )}
        </div>
    );
};

export default EventDetail;
