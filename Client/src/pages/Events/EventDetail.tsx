import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './EventDetail.module.css';
import { useAuth } from '../../hooks/useAuth';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';

interface Event {
    id: number;
    name: string;
    date: string;
    owner: string;
    description?: string;
    venue?: string;
    capacity?: number;
    price?: number;
    ticketDetails?: {
        types: {
            name: string;
            price: number;
            benefits: string[];
            available: number;
        }[];
        notice: string[];
    };
    benefits?: {
        title: string;
        items: string[];
    }[];
}

const mockTicketDetails = {
    types: [
        {
            name: "Standard Ticket",
            price: 50,
            benefits: [
                "Access to main event area",
                "Standard seating",
                "Event program booklet"
            ],
            available: 200
        },
        {
            name: "VIP Ticket",
            price: 100,
            benefits: [
                "Premium seating",
                "VIP lounge access",
                "Complimentary refreshments",
                "Meet & greet with organizers",
                "Exclusive merchandise"
            ],
            available: 50
        },
        {
            name: "Early Bird Ticket",
            price: 35,
            benefits: [
                "Access to main event area",
                "Standard seating",
                "Early bird discount"
            ],
            available: 100
        }
    ],
    notice: [
        "Tickets are non-refundable",
        "Children under 12 must be accompanied by an adult",
        "Doors open 1 hour before the event",
        "Please arrive at least 30 minutes before the event starts",
        "Valid ID required for ticket collection"
    ]
};

const mockBenefits = [
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

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                console.log('Fetching event details for ID:', eventId);
                const response = await fetch(`http://localhost:8003/api/events/${eventId}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                });
                
                if (!response.ok) {
                    const errorData = await response.json().catch(() => null);
                    console.error('API Response:', {
                        status: response.status,
                        statusText: response.statusText,
                        errorData
                    });
                    throw new Error(`Failed to fetch event details: ${response.status} ${response.statusText}`);
                }
                
                const responseData = await response.json();
                console.log('Received event data:', responseData);
                
                if (responseData.success && responseData.data) {
                    // Add mock data to the event
                    const eventWithMockData = {
                        ...responseData.data,
                        ticketDetails: mockTicketDetails,
                        benefits: mockBenefits
                    };
                    setEvent(eventWithMockData);
                } else {
                    throw new Error('Invalid response format from server');
                }
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err instanceof Error ? err.message : 'An error occurred while fetching event details');
            } finally {
                setLoading(false);
            }
        };

        const fetchRelatedEvents = async () => {
            try {
                const response = await fetch('http://localhost:8003/api/events/', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch related events');
                }
                
                const responseData = await response.json();
                if (responseData.success && Array.isArray(responseData.data)) {
                    // Filter out the current event and take first 8 events
                    const filteredEvents = responseData.data
                        .filter((e: Event) => e.id !== Number(eventId))
                        .slice(0, 8);
                    setRelatedEvents(filteredEvents);
                }
            } catch (err) {
                console.error('Error fetching related events:', err);
            }
        };

        if (eventId) {
            fetchEvent();
            fetchRelatedEvents();
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
        if (!isAuthenticated) {
            setShowLoginModal(true);
        } else {
            // TODO: Implement booking logic
            console.log('Booking event:', eventId);
        }
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
                <div className={styles.eventInfo}>
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

                    {event.ticketDetails && (
                        <div className={styles.ticketSection}>
                            <h2>Ticket Details</h2>
                            <div className={styles.ticketTypes}>
                                {event.ticketDetails.types.map((type, index) => (
                                    <div key={index} className={styles.ticketType}>
                                        <h3>{type.name}</h3>
                                        <p className={styles.ticketPrice}>${type.price}</p>
                                        <p className={styles.ticketAvailable}>Available: {type.available}</p>
                                        <ul className={styles.ticketBenefits}>
                                            {type.benefits.map((benefit, i) => (
                                                <li key={i}>{benefit}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.noticeSection}>
                                <h3>Important Notice</h3>
                                <ul className={styles.noticeList}>
                                    {event.ticketDetails.notice.map((notice, index) => (
                                        <li key={index}>{notice}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

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
                </div>

                <div className={styles.bookingSection}>
                    <button 
                        className={styles.bookButton}
                        onClick={handleBookNow}
                    >
                        Book Now
                    </button>
                </div>
            </div>

            {relatedEvents.length > 0 && (
                <div className={styles.relatedEvents}>
                    <h2 className={styles.relatedEventsTitle}>You may also like</h2>
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
            )}

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
