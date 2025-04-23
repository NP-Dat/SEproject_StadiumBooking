import Hero from "./components/Hero/Hero";
import Event from "./components/Event/Event";
import Venue from "./components/Venue/Venue";
import BookingGuide from "./components/BookingGuide/BookingGuide";
import JoinUs from "./components/JoinUs/JoinUs";
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
