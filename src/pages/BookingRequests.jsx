import { useEffect, useState } from "react";
import axios from "axios";

function BookingRequests() {

    const [bookings, setBookings] = useState([]);

    // ==========================
    // Fetch All Bookings
    // ==========================

    const fetchBookings = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/bookings/all"
            );

            setBookings(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchBookings();

    }, []);

    // ==========================
    // Approve Booking
    // ==========================

    const approveBooking = async (id) => {

        try {

            const res = await axios.put(

                `http://localhost:5000/api/bookings/approve/${id}`

            );

            alert(res.data.message);

            fetchBookings();

        } catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to approve booking."

            );

        }

    };

    // ==========================
    // Reject Booking
    // ==========================

    const rejectBooking = async (id) => {

        try {

            const res = await axios.put(

                `http://localhost:5000/api/bookings/reject/${id}`

            );

            alert(res.data.message);

            fetchBookings();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to reject booking."

            );

        }

    };

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-4">

                📋 Booking Requests

            </h2>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>Student</th>

                        <th>Email</th>

                        <th>Room</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        bookings.length === 0 ?

                            (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center"
                                    >

                                        No Booking Requests

                                    </td>

                                </tr>

                            )

                            :

                            (

                                bookings.map((booking) => (

                                    <tr key={booking._id}>

                                        <td>

                                            {booking.studentName}

                                        </td>

                                        <td>

                                            {booking.studentEmail}

                                        </td>

                                        <td>

                                            {booking.roomNumber}

                                        </td>

                                        <td>

                                            {

                                                booking.status === "Pending" &&

                                                <span className="badge bg-warning text-dark">

                                                    Pending

                                                </span>

                                            }

                                            {

                                                booking.status === "Approved" &&

                                                <span className="badge bg-success">

                                                    Approved

                                                </span>

                                            }

                                            {

                                                booking.status === "Rejected" &&

                                                <span className="badge bg-danger">

                                                    Rejected

                                                </span>

                                            }

                                        </td>

                                        <td>

                                            {

                                                booking.status === "Pending" ?

                                                    <>

                                                        <button

                                                            className="btn btn-success me-2"

                                                            onClick={() => approveBooking(booking._id)}

                                                        >

                                                            Approve

                                                        </button>

                                                        <button

                                                            className="btn btn-danger"

                                                            onClick={() => rejectBooking(booking._id)}

                                                        >

                                                            Reject

                                                        </button>

                                                    </>

                                                    :

                                                    booking.status === "Approved" ?

                                                        <span className="text-success fw-bold">

                                                            Approved

                                                        </span>

                                                        :

                                                        <span className="text-danger fw-bold">

                                                            Rejected

                                                        </span>

                                            }

                                        </td>

                                    </tr>

                                ))

                            )

                    }

                </tbody>

            </table>

        </div>

    );

}

export default BookingRequests;