import React from "react";

const Hero = () => {
    return (
        <section
            className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('/about-hero-bg.jpg')" }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <h1 className="text-5xl font-bold text-white z-10 text-center">
                Welcome to Webify Co.
            </h1>
            <p className="mt-4 text-lg text-gray-300 z-10 text-center">
                Where passion meets innovation to redefine stadium experiences.
            </p>
        </section>
    );
};

export default Hero;
