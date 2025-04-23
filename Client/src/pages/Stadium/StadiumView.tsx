import { useState } from "react";
import style from "./StadiumView.module.css";

interface Seat {
    id: string;
    price: number;
}

const Stadium = () => {
    const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

    const handleSeatClick = (seat: Seat) => {
        setSelectedSeat(seat);
    };

    const createSeatButton = (id: string) => (
        <button
            key={id}
            className={`${style.seat} ${selectedSeat?.id === id ? style.selected : ''}`}
            onClick={() => handleSeatClick({ id, price: 50 + Math.floor(Math.random() * 50) })}
        >
            {id}
        </button>
    );

    // Create arrays for North section (N1-N20 split into rows of 10)
    const northSeatsRow1 = Array.from({ length: 10 }, (_, i) => createSeatButton(`N${i + 1}`));
    const northSeatsRow2 = Array.from({ length: 10 }, (_, i) => createSeatButton(`N${i + 11}`));

    // Create arrays for South section (S40-S54 split into rows of 10)
    const southSeatsRow1 = Array.from({ length: 10 }, (_, i) => createSeatButton(`S${i + 40}`));
    const southSeatsRow2 = Array.from({ length: 5 }, (_, i) => createSeatButton(`S${i + 50}`));

    return (
        <div className={style.stadium}>
            <div className={style.container}>
                <div className={style.stadiumContainer}>
                    <h2 className={style.title}>Stadium Seating Map</h2>
                    
                    <div className={style.seatingLayout}>
                        {/* North Section - Two rows of 10 seats */}
                        <div className={style.northSection}>
                            <div className={style.northRow}>
                                {northSeatsRow1}
                            </div>
                            <div className={style.northRow}>
                                {northSeatsRow2}
                            </div>
                        </div>

                        <div className={style.middleSection}>
                            {/* West Side - Two columns */}
                            <div className={style.westSection}>
                                <div className={style.sideColumn}>
                                    {Array.from({ length: 6 }, (_, i) => createSeatButton(`W${i + 28}`))}
                                </div>
                                <div className={style.sideColumn}>
                                    {Array.from({ length: 6 }, (_, i) => createSeatButton(`W${i + 34}`))}
                                </div>
                            </div>

                            {/* Field */}
                            <div className={style.field}>
                                <span>Field</span>
                            </div>

                            {/* East Side - Two columns */}
                            <div className={style.eastSection}>
                                <div className={style.sideColumn}>
                                    {Array.from({ length: 6 }, (_, i) => createSeatButton(`E${i + 16}`))}
                                </div>
                                <div className={style.sideColumn}>
                                    {Array.from({ length: 6 }, (_, i) => createSeatButton(`E${i + 22}`))}
                                </div>
                            </div>
                        </div>

                        {/* South Section - One row of 10 seats and one row of remaining seats */}
                        <div className={style.southSection}>
                            <div className={style.southRow}>
                                {southSeatsRow1}
                            </div>
                            <div className={style.southRow}>
                                {southSeatsRow2}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.seatInfo}>
                    <h2>Seat Information</h2>
                    {selectedSeat ? (
                        <div>
                            <p><strong>Seat Number:</strong> {selectedSeat.id}</p>
                            <p><strong>Price:</strong> ${selectedSeat.price}</p>
                        </div>
                    ) : (
                        <p>Please select a seat to view details</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Stadium;