import React from "react";
import { motion } from "framer-motion";
const Team = () => {
    const team = [
        { name: "Jane Smith", role: "CEO", image: "/team-jane.jpg" },
        { name: "John Doe", role: "CTO", image: "/team-john.jpg" },
        { name: "Emily Carter", role: "Design Lead", image: "/team-emily.jpg" },
    ];

    return (
        <section className="py-16 bg-gray-800 text-center">
            <h2 className="text-3xl font-semibold text-blue-400">Meet Our Team</h2>
            <div className="flex overflow-x-auto mt-8 px-10 space-x-6">
                {team.map((member, index) => (
                    <motion.div
                        key={index}
                        className="flex-none w-80 p-6 bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-xl font-bold text-white">{member.name}</h3>
                        <p className="mt-2 text-gray-300">{member.role}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Team;
