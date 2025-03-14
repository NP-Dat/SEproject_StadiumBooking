import { Routes } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";

const DashboardRoutes: React.FC = () => {
    return (
        <DashboardLayout>
            <Routes>
                {/* <Route path="book" element={<BookSeats />} /> */}
                {/* Add other dashboard routes here */}
            </Routes>
        </DashboardLayout>
    );
};

export default DashboardRoutes;
