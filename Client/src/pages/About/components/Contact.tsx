import React from "react";

const Contact = () => {
    return (
        <section className="py-16 bg-gray-900 text-center">
            <h2 className="text-3xl font-semibold text-blue-400">Get in Touch</h2>
            <p className="mt-4 text-gray-300">
                We're always here to help. Drop us a message, and we'll get back to you!
            </p>
            <button className="mt-6 px-8 py-3 bg-blue-600 rounded text-white hover:bg-blue-500 hover:shadow-lg hover:scale-105 transition transform duration-300 ease-in-out">
                Contact Us
            </button>
        </section>
    );
};

export default Contact;
