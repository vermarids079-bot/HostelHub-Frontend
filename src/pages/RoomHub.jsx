import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import PageLayout from "../components/PageLayout";
import RoomCard from "../components/RoomCard";

function RoomHub() {

    const [rooms, setRooms] = useState([]);
    const [bookingStatus, setBookingStatus] = useState(null);

    const student = JSON.parse(
        localStorage.getItem("userInfo")
    );

    useEffect(() => {

        fetchRooms();
        fetchBookingStatus();

    }, []);

    const fetchRooms = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/rooms/all"
            );

            const availableRooms = res.data.filter(

                (room) => room.status === "Available"

            );

            setRooms(availableRooms);

        }

        catch (error) {

            console.log(error);

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "Unable to fetch rooms."

            });

        }

    };

    const fetchBookingStatus = async () => {

        try {

            const res = await axios.get(

                `http://localhost:5000/api/bookings/student-status/${student._id}`

            );

            if (res.data.hasBooking) {

                setBookingStatus(res.data.status);

            }

            else {

                setBookingStatus(null);

            }

        }

        catch (error) {

            console.log(error);

        }

    };

    const bookRoom = async (room) => {

        if (bookingStatus === "Approved") {

            Swal.fire({

                icon: "info",

                title: "Already Booked",

                text: "You already have an approved room."

            });

            return;

        }

        if (bookingStatus === "Pending") {

            Swal.fire({

                icon: "warning",

                title: "Booking Pending",

                text: "Please wait for admin approval."

            });

            return;

        }

        try {

            const bookingData = {

                studentId: student._id,

                studentName: student.name,

                studentEmail: student.email,

                roomId: room._id,

                roomNumber: room.roomNumber

            };

            const res = await axios.post(

                "http://localhost:5000/api/bookings/create",

                bookingData

            );

            Swal.fire({

                icon: "success",

                title: "Success",

                text: res.data.message

            });

            fetchBookingStatus();
            fetchRooms();

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: "Booking Failed",

                text:

                    error.response?.data?.message ||

                    "Unable to book room."

            });

        }

    };

    return (

        <PageLayout title="🏠 RoomHub">

            {

                bookingStatus === "Approved" &&

                <div className="alert alert-success">

                    ✅ You already have an approved room.

                </div>

            }

            {

                bookingStatus === "Pending" &&

                <div className="alert alert-warning">

                    ⏳ Your booking request is waiting for admin approval.

                </div>

            }

            <div className="dashboard-grid">

                {

                    rooms.length === 0 ?

                    (

                        <div className="alert alert-info w-100 text-center">

                            No Rooms Available

                        </div>

                    )

                    :

                    (

                        rooms.map((room) => (

                            <RoomCard

                                key={room._id}

                                room={room}

                                bookingStatus={bookingStatus}

                                onBook={bookRoom}

                            />

                        ))

                    )

                }

            </div>

        </PageLayout>

    );

}

export default RoomHub;