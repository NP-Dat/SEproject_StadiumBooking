export const SubNavbar = () => {
    return (
        <nav className="flex flex-wrap gap-10 px-16 w-full text-2xl font-bold text-center text-white bg-gray-700 max-md:px-5 max-md:max-w-full">
            <div className="flex-1 whitespace-nowrap">
                <button className="px-14 py-2 bg-gray-700 w-full max-md:px-5">
                    Home
                </button>
            </div>
            <div className="flex-1">
                <button className="px-10 py-2 bg-gray-700 w-full max-md:px-5">
                    About Us
                </button>
            </div>
            <div className="flex-1 whitespace-nowrap">
                <button className="px-10 py-2 bg-gray-700 w-full max-md:px-5">
                    Bookings
                </button>
            </div>
            <div className="flex-1 self-start whitespace-nowrap">
                <button className="px-11 py-2 bg-gray-700 w-full max-md:px-5">
                    Stadium
                </button>
            </div>
            <div className="flex-1 whitespace-nowrap">
                <button className="px-12 py-2 bg-gray-700 w-full max-md:px-5">
                    Contact
                </button>
            </div>
        </nav>
    );
};
