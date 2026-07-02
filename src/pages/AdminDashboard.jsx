import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";

import {
    FaUsers,
    FaBed,
    FaPlusCircle,
    FaClipboardList,
    FaTools,
    FaSignOutAlt,
    FaBullhorn,
    FaChartBar
} from "react-icons/fa";

import "../styles/dashboard.css";

function AdminDashboard() {

    return (

        <>

            <Navbar title="Smart Hostel Admin Portal" />

            <div className="dashboard-container">

                <h2
                    style={{
                        marginBottom: "35px",
                        fontWeight: "bold"
                    }}
                >
                    👋 Welcome Admin
                </h2>

                <div className="dashboard-grid">

                    <DashboardCard

                        icon={<FaUsers />}

                        title="Student Management"

                        description="View all registered students."

                        button="Open"

                        color="#2563eb"

                        link="/students"

                    />

                    <DashboardCard

                        icon={<FaBed />}

                        title="Room Matrix"

                        description="Manage hostel rooms."

                        button="Open"

                        color="#16a34a"

                        link="/roommatrix"

                    />

                    <DashboardCard

                        icon={<FaPlusCircle />}

                        title="Add Room"

                        description="Create a new hostel room."

                        button="Open"

                        color="#0ea5e9"

                        link="/add-room"

                    />

                    <DashboardCard

                        icon={<FaClipboardList />}

                        title="Booking Requests"

                        description="Approve or reject bookings."

                        button="Open"

                        color="#f59e0b"

                        link="/bookingrequests"

                    />

                    <DashboardCard

                        icon={<FaTools />}

                        title="Resolution Center"

                        description="Manage hostel complaints."

                        button="Open"

                        color="#dc2626"

                        link="/resolutioncenter"

                    />

                    <DashboardCard

                        icon={<FaSignOutAlt />}

                        title="Leave Approval"

                        description="Approve or reject leave requests."

                        button="Open"

                        color="#7c3aed"

                        link="/leaveapproval"

                    />

                    <DashboardCard

                        icon={<FaBullhorn />}

                        title="Notice Management"

                        description="Post hostel notices."

                        button="Open"

                        color="#0f766e"

                        link="/notice-management"

                    />

                    <DashboardCard

                        icon={<FaChartBar />}

                        title="Analytics"

                        description="View hostel statistics."

                        button="Open"

                        color="#1d4ed8"

                        link="/analytics"

                    />

                </div>

            </div>

        </>

    );

}

export default AdminDashboard;