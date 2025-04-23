import { useState } from 'react';
import styles from './Events.module.css';

const Events = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDate, setSelectedDate] = useState('all');

    const categories = [
        { id: 'all', name: 'All Events' },
        { id: 'sports', name: 'Sports' },
        { id: 'concerts', name: 'Concerts' },
        { id: 'family', name: 'Family' },
        { id: 'special', name: 'Special Events' }
    ];

    const events = [
        {
            id: 1,
            title: 'Championship Final',
            category: 'sports',
            date: '2024-06-15',
            time: '7:00 PM',
            venue: 'Main Stadium',
            image: '/event1.jpg',
            price: '$50'
        },
        {
            id: 2,
            title: 'Summer Concert Series',
            category: 'concerts',
            date: '2024-07-20',
            time: '8:00 PM',
            venue: 'Arena Hall',
            image: '/event2.jpg',
            price: '$75'
        },
        // Add more events as needed
    ];

    return (
        <div className={styles.eventsContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Upcoming Events</h1>
                <p className={styles.subtitle}>Find and book tickets for the best events in town</p>
            </div>

            <div className={styles.filters}>
                <div className={styles.categoryFilter}>
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`${styles.filterButton} ${selectedCategory === category.id ? styles.active : ''}`}
                            onClick={() => setSelectedCategory(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                <div className={styles.dateFilter}>
                    <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className={styles.dateSelect}
                    >
                        <option value="all">All Dates</option>
                        <option value="today">Today</option>
                        <option value="tomorrow">Tomorrow</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                    </select>
                </div>
            </div>

            <div className={styles.eventsGrid}>
                {events.map(event => (
                    <div key={event.id} className={styles.eventCard}>
                        <div className={styles.eventImage}>
                            <img src={event.image} alt={event.title} />
                            <span className={styles.eventCategory}>{event.category}</span>
                        </div>
                        <div className={styles.eventContent}>
                            <h3 className={styles.eventTitle}>{event.title}</h3>
                            <div className={styles.eventDetails}>
                                <p className={styles.eventDate}>{event.date} at {event.time}</p>
                                <p className={styles.eventVenue}>{event.venue}</p>
                            </div>
                            <div className={styles.eventFooter}>
                                <span className={styles.eventPrice}>{event.price}</span>
                                <button className={styles.bookButton}>Book Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events; 