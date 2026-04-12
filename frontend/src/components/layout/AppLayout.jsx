import Navbar from "../shared/Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <>
            <Navbar />
            {/* Navbar height = h-16 */}
            <main className="pt-16">
                <Outlet />
            </main>
        </>
    );
};

export default AppLayout;
