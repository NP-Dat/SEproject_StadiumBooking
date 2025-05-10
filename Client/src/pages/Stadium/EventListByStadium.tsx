import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stadium } from '../../types/stadium';
import { StadiumService } from '../../services/StadiumService';
import styles from './EventListByStadium.module.css';

const EventList = () => {
  const { id } = useParams<{ id: string }>();
  const [stadium, setStadium] = useState<Stadium | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStadium = async () => {
      try {
        if (id) {
          const data = await StadiumService.fetchStadiumById(id);
          setStadium(data);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load stadium events');
      } finally {
        setLoading(false);
      }
    };
    fetchStadium();
  }, [id]);

  if (loading) return <div className={styles.message}>Loading events...</div>;
  if (error) return <div className={`${styles.message} ${styles.error}`}>{error}</div>;
  if (!stadium) return <div className={styles.message}>No stadium data found.</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{stadium.name} – Events</h1>
      {stadium.events.length === 0 ? (
        <p className={styles.noEvents}>No events scheduled.</p>
      ) : (
        <ul className={styles.eventList}>
          {stadium.events.map((event) => (
            <li key={event.scheduleId} className={styles.eventItem}>
              <strong>{event.eventName}</strong> — {new Date(event.date).toLocaleDateString()} ({event.timeStart}–{event.timeEnd})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
