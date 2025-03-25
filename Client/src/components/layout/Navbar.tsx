import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check authentication status when the component mounts
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
        };

        checkAuth();
        // Set up an event listener for storage changes (for logout in other tabs)
        window.addEventListener('storage', checkAuth);

        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <header className="bg-gray-900 text-white">
            <nav className="flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <div className="flex-shrink-0 ml-0">
                    <h1
                        className="text-3xl font-bold cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        Webify <span className="text-[#2687b8]">Co.</span>
                    </h1>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/events" className="hover:underline">Events</Link>
                    <Link to="/about" className="hover:underline">About</Link>
                    <Link to="/contact" className="hover:underline">Contact</Link>
                </div>

                {/* Modern Search Bar */}
                <input
                    type="search"
                    placeholder="Search events, venues, or teams..."
                    className="hidden md:block px-6 py-3 w-[300px] lg:w-[500px] rounded-full bg-white text-black shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

                {/* Buttons */}
                <div className="flex items-center gap-4">
                    {isLoggedIn ? (
                        <>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="px-6 py-2 text-sm border border-white rounded-full hover:bg-white hover:text-black transition"
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-6 py-2 text-sm bg-blue-600 rounded-full hover:bg-blue-700 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate('/login')}
                                className="px-6 py-2 text-sm border border-white rounded-full hover:bg-white hover:text-black transition"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="px-6 py-2 text-sm bg-blue-600 rounded-full hover:bg-blue-700 transition"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className="block md:hidden px-4 py-2">
                <button className="text-sm bg-blue-600 px-4 py-2 rounded">
                    Menu
                </button>
            </div>
        </header>
    );
};

export default Navbar;
