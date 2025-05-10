import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Stadium.module.css';
import { useAuth } from '../../../contexts/AuthContext';

interface Zone {
    id: string;
    name: string;
    capacity: number;
    price: number;
    available: number;
}

const Stadium: React.FC = () => {
    const { scheduleId } = useParams<{ scheduleId: string }>();
    const [zones, setZones] = useState<Zone[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchZones = async () => {
            try {
                // Replace with actual API call
                const response = await fetch(`/api/schedules/${scheduleId}/zones`);
                const data = await response.json();
                setZones(data);
            } catch (err) {
                setError('Failed to load stadium zones');
                console.error('Error fetching zones:', err);
            } finally {
                setLoading(false);
            }
        };

        if (scheduleId) {
            fetchZones();
        }
    }, [scheduleId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (!zones.length) return <div>No zones available</div>;

    return (
        <div className={styles.container}>
            <h1>Stadium Zones</h1>
            <div className={styles.zonesGrid}>
                {zones.map((zone) => (
                    <div key={zone.id} className={styles.zoneCard}>
                        <h3>{zone.name}</h3>
                        <p>Capacity: {zone.capacity}</p>
                        <p>Available: {zone.available}</p>
                        <p>Price: ${zone.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stadium;