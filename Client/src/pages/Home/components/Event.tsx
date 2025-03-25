import { motion } from "framer-motion";
import styles from "./Event.module.css";

const events = [
    {
        id: 1,
        title: "Championship Final",
        date: "June 15, 2024",
        description: "Witness the epic showdown between the top teams in this year's championship final.",
        image: "/event1.jpg",
        location: "Main Stadium"
    },
    {
        id: 2,
        title: "International Match",
        date: "July 1, 2024",
        description: "Experience the thrill of international competition with teams from around the world.",
        image: "/event2.jpg",
        location: "Arena Center"
    },
    {
        id: 3,
        title: "League Cup",
        date: "July 15, 2024",
        description: "The prestigious League Cup brings together the best teams for an unforgettable tournament.",
        image: "/event3.jpg",
        location: "Sports Complex"
    }
];

const Event = () => {
    return (
        <section className={styles.events}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={styles.header}
                >
                    <h2 className={styles.title}>Upcoming Events</h2>
                    <p className={styles.subtitle}>
                        Discover exciting sports events and secure your seats for the best matches
                    </p>
                </motion.div>

                <div className={styles.eventsGrid}>
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className={styles.eventCard}
                        >
                            <img
                                src={event.image}
                                alt={event.title}
                                className={styles.eventImage}
                            />
                            <div className={styles.eventContent}>
                                <h3 className={styles.eventTitle}>{event.title}</h3>
                                <div className={styles.eventDate}>{event.date}</div>
                                <p className={styles.eventDescription}>
                                    {event.description}
                                </p>
                                <div className={styles.eventDetails}>
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
                                        {event.location}
                                    </div>
                                    <button className={styles.bookButton}>
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Event;
