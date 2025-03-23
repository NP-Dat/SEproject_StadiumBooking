import React from "react";
import Hero from "./components/Hero";
import Mission from "./components/Mission";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Journey from "./components/Journey";
import Value from "./components/Value";

const About = () => {
    return (
        <div
            className="w-full min-h-screen text-white"
            style={{
                background: "linear-gradient(135deg, #1e1e2f, #1c232a, #23262a, #191923)",
                backgroundSize: "400% 400%",
                animation: "gradientAnimation 15s ease infinite",
            }}
        >
            <Hero />
            <Journey />
            <Value />
            <Mission />
            <Team />
            <Contact />
        </div>
    );
};

export default About;
