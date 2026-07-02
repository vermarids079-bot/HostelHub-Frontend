import { useState } from "react";
import axios from "axios";

function AddRoom() {

    const [room, setRoom] = useState({

        roomNumber: "",
        block: "",
        floor: "",
        capacity: ""

    });

    const handleChange = (e) => {

        setRoom({

            ...room,
            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.post(

                "https://hostelhub-backend-sldr.onrender.com/api/rooms/add",

                room

            );

            alert(res.data.message);

            setRoom({

                roomNumber: "",
                block: "",
                floor: "",
                capacity: ""

            });

        } catch (error) {

            alert("Unable to add room.");

        }

    };

    return (

        <div className="container mt-5">

            <div className="card shadow p-4">

                <h2 className="text-center mb-4">

                    Add New Room

                </h2>

                <form onSubmit={handleSubmit}>

                    <input

                        type="text"

                        name="roomNumber"

                        placeholder="Room Number"

                        className="form-control mb-3"

                        value={room.roomNumber}

                        onChange={handleChange}

                    />

                    <input

                        type="text"

                        name="block"

                        placeholder="Block"

                        className="form-control mb-3"

                        value={room.block}

                        onChange={handleChange}

                    />

                    <input

                        type="number"

                        name="floor"

                        placeholder="Floor"

                        className="form-control mb-3"

                        value={room.floor}

                        onChange={handleChange}

                    />

                    <input

                        type="number"

                        name="capacity"

                        placeholder="Capacity"

                        className="form-control mb-3"

                        value={room.capacity}

                        onChange={handleChange}

                    />

                    <button className="btn btn-success w-100">

                        Add Room

                    </button>

                </form>

            </div>

        </div>

    );

}

export default AddRoom;