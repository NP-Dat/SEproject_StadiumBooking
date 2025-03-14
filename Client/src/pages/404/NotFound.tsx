import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const NotFound = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-col justify-center items-center min-h-[80vh] text-center">
                <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
                <p className="text-gray-600 mt-2">Sorry, the page you're looking for doesn't exist.</p>
                <Link to="/" className="mt-4">
                    <button className="bg-blue-600 text-white px-6 py-2 mt-4 rounded-lg hover:bg-blue-700 transition">
                        Go Back Home
                    </button>
                </Link>
            </main>
            <Footer />
        </div>
    );
}

export default NotFound;
