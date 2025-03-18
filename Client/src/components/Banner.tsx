import React from 'react';

const Banner: React.FC = () => {
    return (
        <div
            className="relative h-80 bg-cover bg-center text-white flex items-center justify-center"
            style={{
                backgroundImage: `url('https://via.placeholder.com/1920x1080')`, // Replace with your stadium image URL
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Dark overlay */}

            <div className="relative z-10 text-center">
                <h1 className="text-5xl font-bold mb-4">
                    Experience the Thrill of Live Events
                </h1>
                <p className="text-lg">
                    Book your stadium seats today for an unforgettable experience.
                </p>
            </div>
        </div>
    );
};

export default Banner;
