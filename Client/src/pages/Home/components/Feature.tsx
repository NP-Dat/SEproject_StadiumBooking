import React from "react";

const Feature = () => {
    const experiences = [
        {
            title: "VIP Lounges",
            description: "Exclusive access to luxury lounges.",
            image: "/vip-lounge.jpg",
        },
        {
            title: "Front Row Access",
            description: "Best view of the action.",
            image: "/front-row.jpg",
        },
        {
            title: "Group Discounts",
            description: "Bring the whole squad and save!",
            image: "/group-discount.jpg",
        },
    ];

    return (
        <section id="featured-experiences" className="py-16 bg-gray-900 text-center">
            <h2 className="text-3xl font-semibold text-blue-400">Featured Experiences</h2>
            <p className="mt-4 text-gray-300">
                Explore premium event packages and unforgettable experiences.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 px-10">
                {experiences.map((experience, index) => (
                    <div
                        key={index}
                        className="relative bg-gray-800 p-6 rounded-lg overflow-hidden hover:scale-105 transition-transform"
                    >
                        <img
                            src={experience.image}
                            alt={experience.title}
                            className="absolute inset-0 object-cover w-full h-full opacity-40 hover:opacity-60 transition"
                        />
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-white">{experience.title}</h3>
                            <p className="mt-2 text-gray-300">{experience.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Feature;
