import Hero from "./sections/Hero/Hero"
import Journey from "./sections/Journey/Journey";
import Value from "./sections/Value/Value";
import Mission from "./sections/Mission/Mission";
import Contact from "./sections/Contact/Contact";
import styles from "./About.module.css";

const About = () => {
    const journeyData = [
        {
            date: "2025",
            title: "The Vision Begins",
            description: "Founded with a vision to revolutionize stadium booking, we set out to create a seamless experience for sports and entertainment enthusiasts."
        },
        {
            date: "2026",
            title: "Innovation Milestone",
            description: "Launched our AI-powered booking system, making it the first platform to offer real-time seat recommendations and dynamic pricing."
        },
        {
            date: "2027",
            title: "Global Expansion",
            description: "Expanded our services to major stadiums worldwide, serving millions of fans with our cutting-edge technology."
        },
        {
            date: "2028",
            title: "Future Forward",
            description: "Introduced virtual reality stadium tours and predictive analytics for personalized event recommendations."
        }
    ];

    const valuesData = [
        {
            icon: "🎯",
            title: "Innovation First",
            description: "We constantly push boundaries to deliver cutting-edge solutions that enhance the stadium experience."
        },
        {
            icon: "🤝",
            title: "Customer Focus",
            description: "Your satisfaction is our priority. We ensure every interaction is seamless and enjoyable."
        },
        {
            icon: "💡",
            title: "Smart Solutions",
            description: "Leveraging AI and data analytics to provide personalized recommendations and optimize your experience."
        },
        {
            icon: "🔒",
            title: "Trust & Security",
            description: "Your data and transactions are protected with enterprise-grade security measures."
        },
        {
            icon: "🌍",
            title: "Global Reach",
            description: "Access to stadiums worldwide with localized support and seamless booking experience."
        },
        {
            icon: "🎉",
            title: "Premium Experience",
            description: "Exclusive perks, VIP access, and special rewards for our valued customers."
        }
    ];

    return (
        <div className={styles.about}>
            <Hero
                title="Our Story"
                subtitle="Revolutionizing Stadium Booking Since 2025"
            />
            <Mission
                title="Our Mission"
                description="We're on a mission to transform how people experience stadium events. By combining cutting-edge technology with a deep understanding of fan needs, we're creating a future where booking your perfect seat is as exciting as the event itself."
                imageUrl="https://i.imgur.com/vRdN4bY.jpeg
"
            />
            <Journey
                title="Our Journey"
                subtitle="From Vision to Reality"
                timeline={journeyData}
            />
            <Value
                title="Why Choose Us"
                subtitle="Experience the Future of Stadium Booking"
                values={valuesData}
            />
            <Contact
                title="Get in Touch"
                description="Have questions or want to learn more? We'd love to hear from you."
                email="contact@weblifyco.com"
                phone="090-988-1111"
                address="Thu Duc City, Ho Chi Minh City"
            />
        </div>
    );
};

export default About;
