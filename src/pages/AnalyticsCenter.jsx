import { useEffect, useState } from "react";
import axios from "axios";

function AnalyticsCenter() {
    const [analytics, setAnalytics] = useState({
        totalStudents: 0,
        totalRooms: 0,
        availableRooms: 0,
        fullRooms: 0,
        totalBookings: 0,
        totalComplaints: 0,
        totalLeaves: 0,
        totalNotices: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const res = await axios.get(
                "https://hostelhub-backend-sldr.onrender.com/api/analytics"
            );

            setAnalytics({
                totalStudents: res.data.totalStudents || 0,
                totalRooms: res.data.totalRooms || 0,
                availableRooms: res.data.availableRooms || 0,
                fullRooms: res.data.fullRooms || 0,
                totalBookings: res.data.totalBookings || 0,
                totalComplaints: res.data.totalComplaints || 0,
                totalLeaves: res.data.totalLeaves || 0,
                totalNotices: res.data.totalNotices || 0,
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const cards = [
        {
            title: "Total Students",
            value: analytics.totalStudents,
            icon: "👨‍🎓",
            color: "primary",
        },
        {
            title: "Total Rooms",
            value: analytics.totalRooms,
            icon: "🏠",
            color: "success",
        },
        {
            title: "Available Rooms",
            value: analytics.availableRooms,
            icon: "🟢",
            color: "info",
        },
        {
            title: "Occupied Rooms",
            value: analytics.fullRooms,
            icon: "🔴",
            color: "danger",
        },
        {
            title: "Booking Requests",
            value: analytics.totalBookings,
            icon: "📋",
            color: "warning",
        },
        {
            title: "Complaints",
            value: analytics.totalComplaints,
            icon: "🛠️",
            color: "secondary",
        },
        {
            title: "Leave Requests",
            value: analytics.totalLeaves,
            icon: "🚪",
            color: "dark",
        },
        {
            title: "Notices",
            value: analytics.totalNotices,
            icon: "📢",
            color: "primary",
        },
    ];

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
                <div>
                    <h2 className="fw-bold mb-1">📊 Analytics Center</h2>
                    <p className="text-muted mb-0">
                        Hostel statistics overview
                    </p>
                </div>

                <button
                    className="btn btn-outline-primary"
                    onClick={fetchAnalytics}
                >
                    🔄 Refresh
                </button>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div
                        className="spinner-border text-primary"
                        role="status"
                    ></div>
                    <p className="mt-3">Loading analytics...</p>
                </div>
            ) : (
                <>
                    <div className="row g-4">
                        {cards.map((card, index) => (
                            <div className="col-lg-3 col-md-6" key={index}>
                                <div
                                    className={`card border-0 shadow-sm h-100 border-start border-4 border-${card.color}`}
                                >
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="text-muted mb-2">
                                                    {card.title}
                                                </h6>

                                                <h2 className="fw-bold mb-0">
                                                    {card.value}
                                                </h2>
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: "2.3rem",
                                                }}
                                            >
                                                {card.icon}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="row mt-4">
                        <div className="col-lg-6 mb-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-header bg-primary text-white">
                                    Room Occupancy
                                </div>

                                <div className="card-body">
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between">
                                            <span>Occupied</span>
                                            <span>
                                                {analytics.fullRooms}/
                                                {analytics.totalRooms}
                                            </span>
                                        </div>

                                        <div className="progress mt-2">
                                            <div
                                                className="progress-bar bg-danger"
                                                style={{
                                                    width: `${
                                                        analytics.totalRooms
                                                            ? (analytics.fullRooms /
                                                                  analytics.totalRooms) *
                                                              100
                                                            : 0
                                                    }%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="d-flex justify-content-between">
                                            <span>Available</span>
                                            <span>
                                                {analytics.availableRooms}/
                                                {analytics.totalRooms}
                                            </span>
                                        </div>

                                        <div className="progress mt-2">
                                            <div
                                                className="progress-bar bg-success"
                                                style={{
                                                    width: `${
                                                        analytics.totalRooms
                                                            ? (analytics.availableRooms /
                                                                  analytics.totalRooms) *
                                                              100
                                                            : 0
                                                    }%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 mb-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-header bg-success text-white">
                                    Quick Summary
                                </div>

                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between">
                                            <span>Total Students</span>
                                            <strong>
                                                {analytics.totalStudents}
                                            </strong>
                                        </li>

                                        <li className="list-group-item d-flex justify-content-between">
                                            <span>Booking Requests</span>
                                            <strong>
                                                {analytics.totalBookings}
                                            </strong>
                                        </li>

                                        <li className="list-group-item d-flex justify-content-between">
                                            <span>Complaints</span>
                                            <strong>
                                                {analytics.totalComplaints}
                                            </strong>
                                        </li>

                                        <li className="list-group-item d-flex justify-content-between">
                                            <span>Leave Requests</span>
                                            <strong>
                                                {analytics.totalLeaves}
                                            </strong>
                                        </li>

                                        <li className="list-group-item d-flex justify-content-between">
                                            <span>Active Notices</span>
                                            <strong>
                                                {analytics.totalNotices}
                                            </strong>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default AnalyticsCenter;