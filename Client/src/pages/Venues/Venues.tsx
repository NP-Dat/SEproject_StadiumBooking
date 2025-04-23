import { useState } from 'react';
import styles from './Venues.module.css';

const Venues = () => {
    const [selectedType, setSelectedType] = useState('all');
    const [selectedLocation, setSelectedLocation] = useState('all');

    const types = [
        { id: 'all', name: 'All Venues' },
        { id: 'stadium', name: 'Stadiums' },
        { id: 'arena', name: 'Arenas' },
        { id: 'hall', name: 'Concert Halls' },
        { id: 'field', name: 'Sports Fields' }
    ];

    const locations = [
        { id: 'all', name: 'All Locations' },
        { id: 'north', name: 'North' },
        { id: 'south', name: 'South' },
        { id: 'east', name: 'East' },
        { id: 'west', name: 'West' }
    ];

    const venues = [
        {
            id: 1,
            name: 'Main Stadium',
            type: 'stadium',
            location: 'north',
            capacity: '50,000',
            image: '/venue1.jpg',
            description: 'State-of-the-art stadium with premium seating and amenities.',
            upcomingEvents: 5
        },
        {
            id: 2,
            name: 'Arena Hall',
            type: 'arena',
            location: 'south',
            capacity: '20,000',
            image: '/venue2.jpg',
            description: 'Modern arena perfect for concerts and indoor sports.',
            upcomingEvents: 3
        },
        // Add more venues as needed
    ];

    return (
        <div className={styles.venuesContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Our Venues</h1>
                <p className={styles.subtitle}>Discover the perfect venue for your next event</p>
            </div>

            <div className={styles.filters}>
                <div className={styles.filterGroup}>
                    <h3 className={styles.filterTitle}>Venue Type</h3>
                    <div className={styles.typeFilter}>
                        {types.map(type => (
                            <button
                                key={type.id}
                                className={`${styles.filterButton} ${selectedType === type.id ? styles.active : ''}`}
                                onClick={() => setSelectedType(type.id)}
                            >
                                {type.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.filterGroup}>
                    <h3 className={styles.filterTitle}>Location</h3>
                    <div className={styles.locationFilter}>
                        {locations.map(location => (
                            <button
                                key={location.id}
                                className={`${styles.filterButton} ${selectedLocation === location.id ? styles.active : ''}`}
                                onClick={() => setSelectedLocation(location.id)}
                            >
                                {location.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.venuesGrid}>
                {venues.map(venue => (
                    <div key={venue.id} className={styles.venueCard}>
                        <div className={styles.venueImage}>
                            <img src={venue.image} alt={venue.name} />
                            <span className={styles.venueType}>{venue.type}</span>
                        </div>
                        <div className={styles.venueContent}>
                            <h3 className={styles.venueName}>{venue.name}</h3>
                            <p className={styles.venueDescription}>{venue.description}</p>
                            <div className={styles.venueDetails}>
                                <div className={styles.venueDetail}>
                                    <span className={styles.detailLabel}>Capacity:</span>
                                    <span className={styles.detailValue}>{venue.capacity}</span>
                                </div>
                                <div className={styles.venueDetail}>
                                    <span className={styles.detailLabel}>Location:</span>
                                    <span className={styles.detailValue}>{venue.location}</span>
                                </div>
                                <div className={styles.venueDetail}>
                                    <span className={styles.detailLabel}>Upcoming Events:</span>
                                    <span className={styles.detailValue}>{venue.upcomingEvents}</span>
                                </div>
                            </div>
                            <div className={styles.venueFooter}>
                                <button className={styles.viewButton}>View Details</button>
                                <button className={styles.bookButton}>Book Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Venues; 