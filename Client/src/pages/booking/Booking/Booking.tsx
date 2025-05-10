import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Booking.module.css'

interface Event {
  id: number
  name: string
  date: string
  time: string
  venue: string
  description: string
  price: number
  image: string
}

function Booking() {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch events from API
    const fetchEvents = async () => {
      try {
        // Replace with actual API call
        const response = await fetch('http://localhost:8001/api/events')
        const data = await response.json()
        setEvents(data)
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    }

    fetchEvents()
  }, [])

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event)
    navigate(`/zone-selection?eventId=${event.id}`)
  }

  return (
    <div className={styles.bookingContainer}>
      <h1 className={styles.title}>Book Your Event</h1>
      <div className={styles.eventGrid}>
        {events.map((event) => (
          <div key={event.id} className={styles.eventCard} onClick={() => handleEventSelect(event)}>
            <img src={event.image} alt={event.name} className={styles.eventImage} />
            <div className={styles.eventInfo}>
              <h2 className={styles.eventName}>{event.name}</h2>
              <p className={styles.eventDate}>{event.date} at {event.time}</p>
              <p className={styles.eventVenue}>{event.venue}</p>
              <p className={styles.eventPrice}>${event.price}</p>
              <button className={styles.selectButton}>Select Seats</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Booking 