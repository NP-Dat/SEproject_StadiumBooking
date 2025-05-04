import React, { useState } from 'react';
import styles from './Stadium.module.css';
import { TicketType } from '../../types/ticketType';

interface StadiumProps {
  zones: TicketType[];
  scheduleId: number;
  onZoneSelect?: (zoneId: number) => void;
}

const Stadium: React.FC<StadiumProps> = ({ zones, scheduleId, onZoneSelect }) => {
  const [selectedZone, setSelectedZone] = useState<number | null>(null);
  
  // Group zones by their location (North, South, East, West)
  // This assumes your zone names contain location indicators
  const getZoneByLocation = (location: string) => {
    return zones.find(zone => 
      zone.name.toLowerCase().includes(location.toLowerCase())
    );
  };

  const northZone = getZoneByLocation('north');
  const southZone = getZoneByLocation('south');
  const eastZone = getZoneByLocation('east');
  const westZone = getZoneByLocation('west');

  // Get availability color class based on available seats
  const getAvailabilityColorClass = (zone?: TicketType) => {
    if (!zone) return styles.unavailable;
    
    if (zone.availableSeats <= 0) return styles.soldOut;
    if (zone.availableSeats < 5) return styles.lowAvailability;
    if (zone.availableSeats < 20) return styles.mediumAvailability;
    return styles.highAvailability;
  };

  // Handle zone click
  const handleZoneClick = (zone?: TicketType) => {
    if (!zone || zone.availableSeats <= 0) return;
    
    setSelectedZone(zone.id);
    if (onZoneSelect) {
      onZoneSelect(zone.id);
    }
  };

  return (
    <div className={styles.stadiumContainer}>
      <h3 className={styles.stadiumTitle}>Stadium Seating Map</h3>
      <p className={styles.instructions}>Click on a zone to select it</p>
      
      <div className={styles.stadium}>
        {/* North Zone */}
        <div 
          className={`${styles.zone} ${styles.northZone} ${getAvailabilityColorClass(northZone)} ${selectedZone === northZone?.id ? styles.selected : ''}`}
          onClick={() => handleZoneClick(northZone)}
        >
          <div className={styles.zoneContent}>
            <span className={styles.zoneName}>NORTH</span>
            {northZone && (
              <div className={styles.zoneDetails}>
                <div>${northZone.price}</div>
                <div>{northZone.availableSeats} seats</div>
              </div>
            )}
          </div>
        </div>
        
        {/* South Zone */}
        <div 
          className={`${styles.zone} ${styles.southZone} ${getAvailabilityColorClass(southZone)} ${selectedZone === southZone?.id ? styles.selected : ''}`}
          onClick={() => handleZoneClick(southZone)}
        >
          <div className={styles.zoneContent}>
            <span className={styles.zoneName}>SOUTH</span>
            {southZone && (
              <div className={styles.zoneDetails}>
                <div>${southZone.price}</div>
                <div>{southZone.availableSeats} seats</div>
              </div>
            )}
          </div>
        </div>
        
        {/* East Zone */}
        <div 
          className={`${styles.zone} ${styles.eastZone} ${getAvailabilityColorClass(eastZone)} ${selectedZone === eastZone?.id ? styles.selected : ''}`}
          onClick={() => handleZoneClick(eastZone)}
        >
          <div className={styles.zoneContent}>
            <span className={styles.zoneName}>EAST</span>
            {eastZone && (
              <div className={styles.zoneDetails}>
                <div>${eastZone.price}</div>
                <div>{eastZone.availableSeats} seats</div>
              </div>
            )}
          </div>
        </div>
        
        {/* West Zone */}
        <div 
          className={`${styles.zone} ${styles.westZone} ${getAvailabilityColorClass(westZone)} ${selectedZone === westZone?.id ? styles.selected : ''}`}
          onClick={() => handleZoneClick(westZone)}
        >
          <div className={styles.zoneContent}>
            <span className={styles.zoneName}>WEST</span>
            {westZone && (
              <div className={styles.zoneDetails}>
                <div>${westZone.price}</div>
                <div>{westZone.availableSeats} seats</div>
              </div>
            )}
          </div>
        </div>
        
        {/* Field */}
        <div className={styles.field}>FIELD</div>
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={`${styles.legendColor} ${styles.highAvailability}`}></span>
          <span>Good Availability</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendColor} ${styles.mediumAvailability}`}></span>
          <span>Limited</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendColor} ${styles.lowAvailability}`}></span>
          <span>Almost Full</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendColor} ${styles.soldOut}`}></span>
          <span>Sold Out</span>
        </div>
      </div>
    </div>
  );
};

export default Stadium;