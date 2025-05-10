import React, { useState, useEffect } from 'react'
import styles from './ScheduleEvent.module.css'
import { EventService } from '../../../services/EventService'
import type { Event } from '../../../types/event'

export default function ScheduleEvent() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    time: '',
    venue: ''
  })

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await EventService.getEvents()
        setEvents(eventsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch events')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const eventData = {
        ...newEvent,
        date: `${newEvent.date}T${newEvent.time}`,
        status: 'upcoming'
      }
      const createdEvent = await EventService.createEvent(eventData)
      setEvents([...events, createdEvent])
      setNewEvent({ name: '', date: '', time: '', venue: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create event')
    }
  }

  return (
    <div className={styles.scheduleContainer}>
      <h1>Schedule Event</h1>

      <div className={styles.scheduleContent}>
        <section className={styles.formSection}>
          <h2>Add New Event</h2>
          <form onSubmit={handleSubmit} className={styles.eventForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Event Title</label>
              <input
                type="text"
                id="name"
                value={newEvent.name}
                onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="time">Time</label>
              <input
                type="time"
                id="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="venue">Venue</label>
              <input
                type="text"
                id="venue"
                value={newEvent.venue}
                onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Schedule Event
            </button>
          </form>
        </section>

        <section className={styles.eventsSection}>
          <h2>Upcoming Events</h2>
          <div className={styles.eventsList}>
            {events.map((event) => (
              <div key={event.id} className={styles.eventCard}>
                <h3>{event.name}</h3>
                <p>Date: {event.date}</p>
                <p>Time: {event.time}</p>
                <p>Venue: {event.venue}</p>
                <span className={`${styles.status} ${styles[event.status]}`}>
                  {event.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
} 