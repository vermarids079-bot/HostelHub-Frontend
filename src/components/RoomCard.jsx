import Swal from "sweetalert2";

function RoomCard({

    room,

    onBook,

    bookingStatus

}) {

    const occupancy =

        (room.occupied / room.capacity) * 100;

    const handleBooking = () => {

        Swal.fire({

            title: "Book Room?",

            text: `Do you want to book Room ${room.roomNumber}?`,

            icon: "question",

            showCancelButton: true,

            confirmButtonText: "Book Now"

        }).then((result) => {

            if (result.isConfirmed) {

                onBook(room);

            }

        });

    };

    return (

        <div className="dashboard-card">

            <div

                className="card-icon"

                style={{

                    background:"#2563eb"

                }}

            >

                🏠

            </div>

            <h3>

                Room {room.roomNumber}

            </h3>

            <hr/>

            <p>

                <strong>Block :</strong>

                {" "}

                {room.block}

            </p>

            <p>

                <strong>Floor :</strong>

                {" "}

                {room.floor}

            </p>

            <p>

                <strong>Capacity :</strong>

                {" "}

                {room.capacity}

            </p>

            <p>

                <strong>Occupied :</strong>

                {" "}

                {room.occupied}

            </p>

            <div className="progress mb-3">

                <div

                    className="progress-bar bg-success"

                    style={{

                        width:`${occupancy}%`

                    }}

                >

                    {Math.round(occupancy)}%

                </div>

            </div>

            <span

                className={`badge mb-3 ${

                    room.status==="Available"

                    ?

                    "bg-success"

                    :

                    "bg-danger"

                }`}

            >

                {room.status}

            </span>

            {

                bookingStatus==="Approved"

                ?

                <button

                    className="btn btn-success w-100"

                    disabled

                >

                    ✅ Already Booked

                </button>

                :

                bookingStatus==="Pending"

                ?

                <button

                    className="btn btn-warning w-100"

                    disabled

                >

                    ⏳ Pending Approval

                </button>

                :

                <button

                    className="btn btn-primary w-100"

                    onClick={handleBooking}

                >

                    Book Room

                </button>

            }

        </div>

    );

}

export default RoomCard;