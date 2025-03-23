import { motion } from "framer-motion";
import Hero from "./components/Hero";
import Event from "./components/Event";
import Feature from "./components/Feature";
import JoinUs from "./components/JoinUs";

const Home = () => {
    return (
        <div className="w-full min-h-screen bg-gray-900 text-white">
            <Hero />
            <Event />
            <Feature />
            < JoinUs />
        </div >
    );
};

export default Home;
