import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Hero = () => {
    const images = [
        "/stadium-bg1.jpg",
        "/stadium-bg2.jpg",
        "/stadium-bg3.jpg",
    ]; // Array of image paths for the slideshow

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [images]);

    return (
        <section
            id="home"
            className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center transition-all duration-700"
            style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Hero Content */}
            <motion.h1
                className="text-5xl font-bold text-white z-10 text-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Book Your Stadium Seats with Ease
            </motion.h1>
            <motion.p
                className="mt-4 text-lg text-gray-300 z-10 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                Find and book your favorite matches seamlessly.
            </motion.p>
            <button className="mt-8 px-8 py-3 bg-blue-600 rounded text-white hover:bg-blue-500 hover:shadow-lg hover:scale-105 transition transform duration-300 ease-in-out">
                Get Started
            </button>
        </section>
    );
};

export default Hero;
