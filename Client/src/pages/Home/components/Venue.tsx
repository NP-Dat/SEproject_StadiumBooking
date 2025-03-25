import React from "react";
import { motion } from "framer-motion";
import styles from "./Venue.module.css";

const venues = [
    {
        name: "Metropolitan Stadium",
        location: "New York, USA",
        capacity: "82,500",
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1920&h=1080&fit=crop",
        features: ["Retractable Roof", "VIP Suites", "360° LED Display"],
        upcomingEvents: ["Championship Final", "All-Star Game", "International Match"]
    },
    {
        name: "Olympic Arena",
        location: "London, UK",
        capacity: "75,000",
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1920&h=1080&fit=crop",
        features: ["Smart Seating", "Premium Lounges", "Interactive Zones"],
        upcomingEvents: ["World Cup Qualifier", "League Final", "Friendly Match"]
    },
    {
        name: "Sports Complex",
        location: "Tokyo, Japan",
        capacity: "68,000",
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1920&h=1080&fit=crop",
        features: ["Futuristic Design", "Fan Experience Center", "Digital Concessions"],
        upcomingEvents: ["Asian Championship", "Team Exhibition", "Youth Tournament"]
    }
];

const Venue = () => {
    return (
        <section className={styles.venues}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className={styles.sectionTitle}
                    >
                        Featured Venues
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={styles.sectionSubtitle}
                    >
                        Experience world-class events at these iconic stadiums
                    </motion.p>
                </div>
                <div className={styles.venuesGrid}>
                    {venues.map((venue, index) => (
                        <motion.div
                            key={venue.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className={styles.venueCard}
                        >
                            <div className={styles.venueImage}>
                                <img src={venue.image} alt={venue.name} />
                                <div className={styles.venueOverlay}>
                                    <span className={styles.capacity}>{venue.capacity} seats</span>
                                </div>
                            </div>
                            <div className={styles.venueContent}>
                                <h3 className={styles.venueName}>{venue.name}</h3>
                                <p className={styles.venueLocation}>{venue.location}</p>
                                <div className={styles.venueFeatures}>
                                    {venue.features.map((feature, i) => (
                                        <span key={i} className={styles.featureTag}>
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                                <div className={styles.upcomingEvents}>
                                    <h4 className={styles.eventsTitle}>Upcoming Events</h4>
                                    <ul className={styles.eventsList}>
                                        {venue.upcomingEvents.map((event, i) => (
                                            <li key={i} className={styles.eventItem}>
                                                {event}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button className={styles.exploreButton}>
                                    Explore Venue
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Venue; 