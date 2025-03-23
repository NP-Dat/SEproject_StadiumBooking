import React from "react";
import { motion } from "framer-motion";
const Journey = () => {
    return (
        <section className="py-16 bg-gray-800 text-center">
            <motion.h2
                className="text-3xl font-semibold text-blue-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                Our Journey
            </motion.h2>
            <div className="mt-8 px-6 md:px-20 text-gray-300">
                <motion.p
                    className="mb-6"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    Webify Co. started as a small team of dreamers determined to simplify event bookings for fans worldwide. From humble beginnings, we’ve grown into a global platform, connecting millions to their favorite events.
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    The journey wasn’t easy — we faced challenges with funding, technology, and scaling up. But every milestone we achieved came from a belief in delivering unforgettable experiences, one booking at a time.
                </motion.p>
            </div>
        </section>
    );
};

export default Journey;
