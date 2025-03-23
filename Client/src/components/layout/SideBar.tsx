import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible((prev) => !prev);
    };

    return (
        <header className="flex items-center justify-between bg-gray-800 text-white px-5 py-3">
            {/* Logo */}
            <div className="text-xl font-bold text-blue-400">Stadium Booking</div>

            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-5">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `nav-link py-2 px-3 rounded hover:bg-blue-500 transition ${isActive ? 'bg-blue-600 font-semibold' : ''
                        }`
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/stadiums"
                    className={({ isActive }) =>
                        `nav-link py-2 px-3 rounded hover:bg-blue-500 transition ${isActive ? 'bg-blue-600 font-semibold' : ''
                        }`
                    }
                >
                    Stadiums
                </NavLink>
                <NavLink
                    to="/bookings"
                    className={({ isActive }) =>
                        `nav-link py-2 px-3 rounded hover:bg-blue-500 transition ${isActive ? 'bg-blue-600 font-semibold' : ''
                        }`
                    }
                >
                    My Bookings
                </NavLink>
            </nav>

            {/* Sidebar Toggle Button */}
            <button
                className="md:hidden bg-blue-500 p-2 rounded"
                onClick={toggleSidebar}
            >
                {isSidebarVisible ? 'Close Menu' : 'Menu'}
            </button>

            {/* Sidebar */}
            {isSidebarVisible && (
                <aside className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white z-50 shadow-lg">
                    <div className="flex justify-between items-center px-5 py-3 bg-gray-900">
                        <h2 className="text-2xl font-bold text-blue-400">Menu</h2>
                        <button
                            className="text-xl font-bold"
                            onClick={toggleSidebar}
                        >
                            X
                        </button>
                    </div>
                    <nav className="flex flex-col space-y-4 p-5">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `nav-link py-2 px-3 rounded hover:bg-blue-500 transition ${isActive ? 'bg-blue-600 font-semibold' : 'bg-gray-700'
                                }`
                            }
                            onClick={toggleSidebar} // Close sidebar on link click
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/stadiums"
                            className={({ isActive }) =>
                                `nav-link py-2 px-3 rounded hover:bg-blue-500 transition ${isActive ? 'bg-blue-600 font-semibold' : 'bg-gray-700'
                                }`
                            }
                            onClick={toggleSidebar} // Close sidebar on link click
                        >
                            Stadiums
                        </NavLink>
                        <NavLink
                            to="/bookings"
                            className={({ isActive }) =>
                                `nav-link py-2 px-3 rounded hover:bg-blue-500 transition ${isActive ? 'bg-blue-600 font-semibold' : 'bg-gray-700'
                                }`
                            }
                            onClick={toggleSidebar} // Close sidebar on link click
                        >
                            My Bookings
                        </NavLink>
                    </nav>
                </aside>
            )}
        </header>
    );
};

export default Navbar;
