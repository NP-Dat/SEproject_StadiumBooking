import { type FC } from 'react';
import Hero from "./sections/Hero/Hero";
import EventSection from "./sections/Event/Event";
import BookingGuide from "./sections/BookingGuide/BookingGuide";
import JoinUs from "./sections/JoinUs/JoinUs";
import styles from './Home.module.css';

const Home: FC = () => {
    return (
        <div className={styles.home}>
            <Hero />
            <EventSection />
            <BookingGuide />
            <JoinUs />
        </div>
    );
};

export default Home;
