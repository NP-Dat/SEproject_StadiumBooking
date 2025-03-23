import React from "react";
import { motion } from "framer-motion";
const Value = () => {
    const values = [
        { icon: "🌟", title: "Innovation", description: "Pushing boundaries with creativity." },
        { icon: "❤️", title: "Passion", description: "Connecting fans to what they love." },
        { icon: "🤝", title: "Community", description: "Fostering global connections." },
    ];

    return (
        <section className="py-16 bg-gray-900 text-center">
            <motion.h2
                className="text-3xl font-semibold text-blue-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                Our Values
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8 px-10 text-gray-300">
                {values.map((value, index) => (
                    <motion.div
                        key={index}
                        className="p-6 bg-gray-800 rounded-lg hover:scale-105 transition-transform"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                    >
                        <div className="text-5xl mb-4">{value.icon}</div>
                        <h3 className="text-xl font-bold text-white">{value.title}</h3>
                        <p className="mt-2">{value.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Value;
