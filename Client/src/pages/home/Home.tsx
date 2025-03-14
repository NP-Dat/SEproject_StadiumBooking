// src/pages/Home/Home.tsx
import React from 'react';
import Button from "../../components/buttons/Button.tsx"

const Home: React.FC = () => {
    return (
        <div className="home-page">
            <h2>Welcome to Stadium Seat Booking</h2>
            <p>Book your seats easily and quickly!</p>
            {/* Direct the user to the booking page or login */}
            <Button to="/login" label="Get Started" />
        </div>
    );
};

export default Home;
