import React from "react";
import Hero from "./components/Hero";
import Event from "./components/Event";
import Venue from "./components/Venue";
import BookingGuide from "./components/BookingGuide";
import JoinUs from "./components/JoinUs";
import styles from "./Home.module.css";

const Home = () => {
    return (
        <div className={styles.home}>
            <Hero />
            <Event />
            <Venue />
            <BookingGuide />
            <JoinUs />
        </div>
    );
};

export default Home;
