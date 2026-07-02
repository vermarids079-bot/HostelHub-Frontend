import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import PageLayout from "../components/PageLayout";

function MyBooking() {

    const [booking, setBooking] = useState(null);

    const student = JSON.parse(

        localStorage.getItem("userInfo")

    );

    useEffect(() => {

        fetchBooking();

    }, []);

    const fetchBooking = async () => {

        try {

            const res = await axios.get(

                `https://hostelhub-backend-sldr.onrender.com/api/bookings/student/${student._id}`

            );

            setBooking(res.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <PageLayout title="📋 My Booking">

            {

                booking ?

                (

                    <div
                        className="dashboard-card"
                        style={{
                            maxWidth: "650px",
                            margin: "auto"
                        }}
                    >

                        <div
                            className="card-icon"
                            style={{
                                background: "#2563eb"
                            }}
                        >

                            🏠

                        </div>

                        <h2>

                            Room {booking.roomNumber}

                        </h2>

                        <hr />

                        <p>

                            <strong>

                                Booking Status

                            </strong>

                        </p>

                        {

                            booking.status === "Pending" &&

                            <span
                                className="badge bg-warning text-dark fs-6"
                            >

                                Pending

                            </span>

                        }

                        {

                            booking.status === "Approved" &&

                            <span
                                className="badge bg-success fs-6"
                            >

                                Approved

                            </span>

                        }

                        {

                            booking.status === "Rejected" &&

                            <span
                                className="badge bg-danger fs-6"
                            >

                                Rejected

                            </span>

                        }

                        <hr />

                        <p>

                            <strong>

                                Booking Date

                            </strong>

                        </p>

                        <h5>

                            {

                                new Date(

                                    booking.createdAt

                                ).toLocaleDateString()

                            }

                        </h5>

                        {

                            booking.status === "Approved" &&

                            <div
                                className="alert alert-success mt-4"
                            >

                                🎉 Your room has been approved.

                            </div>

                        }

                        {

                            booking.status === "Pending" &&

                            <div
                                className="alert alert-warning mt-4"
                            >

                                ⏳ Please wait for admin approval.

                            </div>

                        }

                        {

                            booking.status === "Rejected" &&

                            <div
                                className="alert alert-danger mt-4"
                            >

                                ❌ Your booking request was rejected.

                            </div>

                        }

                    </div>

                )

                :

                (

                    <div
                        className="alert alert-info text-center"
                    >

                        No Booking Found

                    </div>

                )

            }

        </PageLayout>

    );

}

export default MyBooking;