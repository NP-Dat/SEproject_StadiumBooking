import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

export default function PublicLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Banner />
            <Navbar />
            <div className="flex-1 p-4">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
