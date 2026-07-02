import { useEffect, useState } from "react";
import axios from "axios";

function RoomMatrix() {

    const [rooms, setRooms] = useState([]);
    const [editingRoom, setEditingRoom] = useState(null);

    const fetchRooms = async () => {

        try {

            const res = await axios.get(
                "https://hostelhub-backend-sldr.onrender.com/api/rooms/all"
            );

            setRooms(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchRooms();

    }, []);

    const deleteRoom = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this room?"
        );

        if (!confirmDelete) return;

        try {

            const res = await axios.delete(
                `https://hostelhub-backend-sldr.onrender.com/api/rooms/delete/${id}`
            );

            alert(res.data.message);

            fetchRooms();

        } catch (error) {

            alert("Unable to delete room.");

        }

    };

    const handleChange = (e) => {

        setEditingRoom({

            ...editingRoom,

            [e.target.name]: e.target.value

        });

    };

    const updateRoom = async () => {

        try {

            const res = await axios.put(

                `https://hostelhub-backend-sldr.onrender.com/api/rooms/update/${editingRoom._id}`,

                editingRoom

            );

            alert(res.data.message);

            setEditingRoom(null);

            fetchRooms();

        } catch (error) {

            alert("Unable to update room.");

        }

    };

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-4">
                🏠 Room Matrix
            </h2>

            <div className="row">

                {

                    rooms.map((room) => (

                        <div
                            className="col-md-4 mb-4"
                            key={room._id}
                        >

                            <div className="card shadow p-4">

                                {

                                    editingRoom &&
                                    editingRoom._id === room._id ?

                                    <>

                                        <input
                                            className="form-control mb-2"
                                            name="roomNumber"
                                            value={editingRoom.roomNumber}
                                            onChange={handleChange}
                                        />

                                        <input
                                            className="form-control mb-2"
                                            name="block"
                                            value={editingRoom.block}
                                            onChange={handleChange}
                                        />

                                        <input
                                            className="form-control mb-2"
                                            name="floor"
                                            value={editingRoom.floor}
                                            onChange={handleChange}
                                        />

                                        <input
                                            className="form-control mb-2"
                                            name="capacity"
                                            value={editingRoom.capacity}
                                            onChange={handleChange}
                                        />

                                        <select
                                            className="form-control mb-3"
                                            name="status"
                                            value={editingRoom.status}
                                            onChange={handleChange}
                                        >

                                            <option>
                                                Available
                                            </option>

                                            <option>
                                                Occupied
                                            </option>

                                            <option>
                                                Maintenance
                                            </option>

                                        </select>

                                        <button
                                            className="btn btn-success w-100 mb-2"
                                            onClick={updateRoom}
                                        >
                                            Save
                                        </button>

                                        <button
                                            className="btn btn-secondary w-100"
                                            onClick={() => setEditingRoom(null)}
                                        >
                                            Cancel
                                        </button>

                                    </>

                                    :

                                    <>

                                        <h4>{room.roomNumber}</h4>

                                        <p>
                                            <strong>Block:</strong> {room.block}
                                        </p>

                                        <p>
                                            <strong>Floor:</strong> {room.floor}
                                        </p>

                                        <p>
                                            <strong>Capacity:</strong> {room.capacity}
                                        </p>

                                        <p>
                                            <strong>Status:</strong> {room.status}
                                        </p>

                                        <button
                                            className="btn btn-warning w-100 mb-2"
                                            onClick={() => setEditingRoom({ ...room })}
                                        >
                                            Edit Room
                                        </button>

                                        <button
                                            className="btn btn-danger w-100"
                                            onClick={() => deleteRoom(room._id)}
                                        >
                                            Delete Room
                                        </button>

                                    </>

                                }

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default RoomMatrix;