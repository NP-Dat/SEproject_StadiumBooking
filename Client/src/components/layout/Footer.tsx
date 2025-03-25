import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10 px-6">
            <div className="max-w-[1132px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Logo and Contact */}
                <div className="flex flex-col gap-5">
                    <h1 className="text-3xl font-bold">
                        Webify <span className="text-[#51b7d0]">Co.</span>
                    </h1>
                    <p className="text-neutral-400 text-sm">
                        Thu Duc District, Ho Chi Minh City
                    </p>
                    <p className="text-neutral-400 text-sm">
                        <span className="font-semibold text-white">Contact:</span>{' '}
                        <a href="mailto:contact@webify.vn" className="hover:underline">
                            contact@webify.vn
                        </a>
                    </p>
                    <p className="text-neutral-400 text-sm">
                        &copy; {new Date().getFullYear()} Webify Co.
                    </p>
                </div>

                {/* Important Links */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold text-sky-400">Important</h3>
                    <Link to="/about" className="text-neutral-400 hover:underline">
                        About us
                    </Link>
                    <Link to="/terms" className="text-neutral-400 hover:underline">
                        Terms
                    </Link>
                    <Link to="/policy" className="text-neutral-400 hover:underline">
                        Policy
                    </Link>
                    <Link to="/contact" className="text-neutral-400 hover:underline">
                        Contact
                    </Link>
                </div>

                {/* Payment and Socials */}
                <div className="flex flex-col gap-5">
                    <div>
                        <h3 className="text-lg font-semibold text-sky-400 mb-3">Payment</h3>
                        <div className="flex gap-4">
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0193d01d27ec4f57ac28c071eac09a3f23edb1dca9e08a488e09e8340fd5ab9d?placeholderIfAbsent=true&apiKey=ebb3257718164cd3b8c551bf8167e955"
                                alt="Payment method 1"
                                className="object-contain w-12"
                            />
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/30ce08cf3a71ba02a4f3bf27d801f24a23f92a94a0b0862f9e7a226f270b7f04?placeholderIfAbsent=true&apiKey=ebb3257718164cd3b8c551bf8167e955"
                                alt="Payment method 2"
                                className="object-contain w-12"
                            />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-sky-400 mb-3">Follow us</h3>
                        <div className="flex gap-4">
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/611116ccd7b438644a2ef71fc6a83985d14aa0bc2947c93a273f8eea6ba040a8?placeholderIfAbsent=true&apiKey=ebb3257718164cd3b8c551bf8167e955"
                                alt="Social media 1"
                                className="object-contain w-10"
                            />
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e7eed5fb7672c5b167c981d0582a694cde5677216c3ee139d1c5acd148af9adc?placeholderIfAbsent=true&apiKey=ebb3257718164cd3b8c551bf8167e955"
                                alt="Social media 2"
                                className="object-contain w-10"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
