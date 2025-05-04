import styles from "./Event.module.css";
import Button from "../../../../components/ui/Button/Button";
import { EventService } from "../../../../services/EventService";
import type { Event } from "../../../../types/event";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Event = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsData = await EventService.getEvents();
                // Take only the first 5 events for preview
                setEvents(eventsData.slice(0, 6));
            } catch (err) {
                console.error('Error fetching events:', err);
                setError(err instanceof Error ? err.message : 'Failed to load events');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleEventClick = (eventId: number) => {
        // Navigate directly to schedules page instead of event detail
        navigate(`/schedules/event/${eventId}`);
    };

    if (loading) {
        return (
            <section className={styles.events}>
                <div className={styles.container}>
                    <div className={styles.loading}>Loading featured events...</div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className={styles.events}>
                <div className={styles.container}>
                    <div className={styles.error}>Error: {error}</div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.events}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Upcoming Events</h2>
                    <p className={styles.subtitle}>
                        Discover exciting sports events and secure your seats for the best matches
                    </p>
                </div>

                <div className={styles.eventsGrid}>
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className={styles.eventCard}
                            onClick={() => handleEventClick(event.id)}
                        >
                            <div className={styles.eventContent}>
                                <h3 className={styles.eventTitle}>{event.name}</h3>
                                <div className={styles.eventDate}>
                                    {EventService.formatDate(event.date)}
                                </div>
                                {event.description && (
                                    <p className={styles.eventDescription}>
                                        {event.description.length > 100 
                                            ? `${event.description.substring(0, 100)}...` 
                                            : event.description}
                                    </p>
                                )}
                                <div className={styles.eventDetails}>
                                    {event.venue && (
                                        <div className={styles.eventLocation}>
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            {event.venue}
                                        </div>
                                    )}
                                    <Button
                                        variant="primary"
                                        size="small"
                                        className={styles.bookButton}
                                        to={`/schedules/event/${event.id}`}
                                    >
                                        Book Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Event;
