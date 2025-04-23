import Hero from "./sections/Hero/Hero";
import Event from "./sections/Event/Event";
import Venue from "./sections/Venue/Venue";
import BookingGuide from "./sections/BookingGuide/BookingGuide";
import JoinUs from "./sections/JoinUs/JoinUs";
import styles from './Home.module.css';

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
