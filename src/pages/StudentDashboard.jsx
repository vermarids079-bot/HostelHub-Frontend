import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";

import {
    FaUser,
    FaBed,
    FaClipboardList,
    FaTools,
    FaSignOutAlt,
    FaBullhorn
} from "react-icons/fa";

import "../styles/dashboard.css";

function StudentDashboard() {

    return (

        <>

            <Navbar title="Smart Hostel Management" />

            <div className="dashboard-container">

                <h2
    style={{

        marginBottom: "45px",

        color: "white",

        fontWeight: "700",

        fontSize: "40px",

        textShadow: "2px 2px 10px rgba(0,0,0,0.4)"

    }}
>

    👋 Welcome Student

</h2>
                <div className="dashboard-grid">

                    <DashboardCard

                        icon={<FaUser />}

                        title="My Profile"

                        description="View and update your profile."

                        button="Open"

                        color="#2563eb"

                        link="/profile"

                    />

                    <DashboardCard

                        icon={<FaBed />}

                        title="RoomHub"

                        description="Browse and book hostel rooms."

                        button="Open"

                        color="#16a34a"

                        link="/rooms"

                    />

                    <DashboardCard

                        icon={<FaClipboardList />}

                        title="My Booking"

                        description="Track your booking status."

                        button="Open"

                        color="#f59e0b"

                        link="/mybooking"

                    />

                    <DashboardCard

                        icon={<FaTools />}

                        title="CareDesk"

                        description="Raise hostel complaints."

                        button="Open"

                        color="#dc2626"

                        link="/complaints"

                    />

                    <DashboardCard

                        icon={<FaSignOutAlt />}

                        title="LeaveEase"

                        description="Apply hostel leave."

                        button="Open"

                        color="#7c3aed"

                        link="/leave"

                    />

                    <DashboardCard

                        icon={<FaBullhorn />}

                        title="Notice Board"

                        description="Read latest hostel notices."

                        button="Open"

                        color="#0f766e"

                        link="/notices"

                    />

                </div>

            </div>

        </>

    );

}

export default StudentDashboard;