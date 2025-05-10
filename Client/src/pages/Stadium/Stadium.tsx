import { Stadium } from '../../types/stadium';
import { useEffect, useState } from 'react';
import { StadiumService } from '../../services/StadiumService';
import styles from './Stadium.module.css';
import { useNavigate } from 'react-router-dom';

const StadiumList = () => {
  const [stadiums, setStadiums] = useState<Stadium[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/eventsbystadium/${id}`);  
  }

  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        const fetchedStadiums = await StadiumService.fetchStadiums();
        setStadiums(fetchedStadiums);
      } catch (err) {
        console.error('Failed to fetch stadiums:', err);
        setError('Failed to fetch stadiums');
      } finally {
        setLoading(false);
      }
    };

    fetchStadiums();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading stadiums...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>{error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Stadium List</h1>
      <div className={styles.grid}>
        {stadiums.map((stadium) => (
          <div
            key={stadium.id}
            className={styles.card}
            onClick={() => handleCardClick(stadium.id)}
            style={{ cursor: 'pointer' }}
          >
            <h2>{stadium.name}</h2>
            <p>Size: {stadium.size}</p>
            <p>Status: {stadium.status}</p>
            <p className="mb-3">Address: {stadium.address}</p>
            <div>
              <h3 className={styles.underline}>Scheduled Events:</h3>
              {stadium.events.length === 0 ? (
                <p>No events scheduled</p>
              ) : (
                <ul>
                  {stadium.events.map((event) => (
                    <li key={event.scheduleId}>
                      <span style={{ fontWeight: '600' }}>{event.eventName}</span> –{' '}
                      {new Date(event.date).toLocaleDateString()} ({event.timeStart} to {event.timeEnd})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StadiumList;
