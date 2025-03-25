import React from 'react';
import styles from './Events.module.css';

const Events: React.FC = () => {
    const events = [
        {
            id: 1,
            title: 'Football Championship Finals',
            date: 'April 15, 2025',
            time: '7:00 PM',
            venue: 'Main Stadium',
            price: '$120',
            image: 'https://images.unsplash.com/photo-1508098682722-e99c643e7d22?q=80&w=2070'
        },
        {
            id: 2,
            title: 'Basketball Tournament',
            date: 'April 22, 2025',
            time: '5:30 PM',
            venue: 'Indoor Arena',
            price: '$85',
            image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069'
        },
        {
            id: 3,
            title: 'Tennis Grand Slam',
            date: 'May 5, 2025',
            time: '2:00 PM',
            venue: 'Tennis Complex',
            price: '$150',
            image: 'https://images.unsplash.com/photo-1595435934344-5f0ab2114c6a?q=80&w=1974'
        },
        {
            id: 4,
            title: 'International Soccer Match',
            date: 'May 12, 2025',
            time: '8:00 PM',
            venue: 'Main Stadium',
            price: '$200',
            image: 'https://images.unsplash.com/photo-1518604666860-9cd681582551?q=80&w=2070'
        },
        {
            id: 5,
            title: 'Swimming Championship',
            date: 'May 18, 2025',
            time: '10:00 AM',
            venue: 'Aquatic Center',
            price: '$75',
            image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=2070'
        },
        {
            id: 6,
            title: 'Marathon Event',
            date: 'May 25, 2025',
            time: '6:00 AM',
            venue: 'City Circuit',
            price: '$60',
            image: 'https://images.unsplash.com/photo-1509797571078-d8bd73d3e35f?q=80&w=2069'
        }
    ];

    return (
        <div className={styles.events}>
            <div className={styles.container}>
                <h1 className={styles.title}>Upcoming Events</h1>
                <p className={styles.subtitle}>Book your tickets for the hottest sporting events</p>

                <div className={styles.filters}>
                    <input
                        type="text"
                        placeholder="Search events..."
                        className={styles.searchInput}
                    />
                    <select className={styles.filterSelect}>
                        <option value="">All Venues</option>
                        <option value="Main Stadium">Main Stadium</option>
                        <option value="Indoor Arena">Indoor Arena</option>
                        <option value="Tennis Complex">Tennis Complex</option>
                        <option value="Aquatic Center">Aquatic Center</option>
                    </select>
                    <select className={styles.filterSelect}>
                        <option value="">All Events</option>
                        <option value="Football">Football</option>
                        <option value="Basketball">Basketball</option>
                        <option value="Tennis">Tennis</option>
                        <option value="Swimming">Swimming</option>
                    </select>
                </div>

                <div className={styles.eventsGrid}>
                    {events.map(event => (
                        <div key={event.id} className={styles.eventCard}>
                            <div className={styles.eventImageContainer}>
                                <img src={event.image} alt={event.title} className={styles.eventImage} />
                            </div>
                            <div className={styles.eventInfo}>
                                <h3 className={styles.eventTitle}>{event.title}</h3>
                                <p className={styles.eventDate}>
                                    <span>{event.date}</span> | <span>{event.time}</span>
                                </p>
                                <p className={styles.eventVenue}>{event.venue}</p>
                                <div className={styles.eventBottom}>
                                    <p className={styles.eventPrice}>{event.price}</p>
                                    <button className={styles.bookButton}>Book Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Events; 