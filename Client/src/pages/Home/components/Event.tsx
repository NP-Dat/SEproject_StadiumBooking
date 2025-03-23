import React from "react";
import { motion } from "framer-motion";

const Event = () => {
    const events = [
        {
            title: "Football Championship",
            date: "March 15, 2025",
            location: "National Stadium",
            image: "/football-event.jpg",
        },
        {
            title: "Concert: Rock Night",
            date: "April 5, 2025",
            location: "City Arena",
            image: "/concert-event.jpg",
        },
        {
            title: "Basketball Finals",
            date: "May 10, 2025",
            location: "Sports Complex",
            image: "/basketball-event.jpg",
        },
    ];

    return (
        <section id="events" className="py-16 text-center bg-gray-800">
            <h2 className="text-3xl font-semibold text-blue-400">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 px-10">
                {events.map((event, index) => (
                    <motion.div
                        key={index}
                        className="relative bg-gray-700 p-6 rounded-lg cursor-pointer hover:scale-105 transition-transform overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <img
                            src={event.image}
                            alt={event.title}
                            className="absolute inset-0 object-cover w-full h-full opacity-30 hover:opacity-50 transition"
                        />
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold">{event.title}</h3>
                            <p className="mt-2 text-gray-300">{event.date}</p>
                            <p className="mt-1 text-gray-400">{event.location}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Event;
