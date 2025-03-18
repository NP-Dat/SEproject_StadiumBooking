import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AuthLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 p-4">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
