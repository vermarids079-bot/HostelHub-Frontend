import { useState } from "react";
import axios from "axios";
function Profile() {

  const student = JSON.parse(
    localStorage.getItem("userInfo")
);

const [editMode, setEditMode] = useState(false);

const [profile, setProfile] = useState({

    name: student.name,
    contact: student.contact || "",
    hostelBlock: student.hostelBlock || "",
    roomNumber: student.roomNumber || ""

});
const handleChange = (e) => {

    setProfile({

        ...profile,
        [e.target.name]: e.target.value

    });

};
const handleSave = async () => {

    try {

        const res = await axios.put(

            `https://hostelhub-backend-sldr.onrender.com/api/profile/update/${student._id}`,

            profile

        );

        localStorage.setItem(

            "userInfo",

            JSON.stringify(res.data.user)

        );

        alert(res.data.message);

        setEditMode(false);

        window.location.reload();

    } catch (error) {

        alert("Unable to update profile.");

    }

};
if (!student) {
    return (
       <div className="mb-3">

    <strong>Full Name :</strong>

    {

        editMode ?

        <input

            type="text"

            name="name"

            className="form-control mt-2"

            value={profile.name}

            onChange={handleChange}

        />

        :

        student.name

    }

</div>
    );
}

    return (
        <div className="container mt-5">

            <h2 className="text-center mb-4">
                Student Profile
            </h2>

            <div className="card shadow p-4">

                <div className="mb-3">
                    <strong>Full Name :</strong> {student.name}
                </div>

                <div className="mb-3">
                    <strong>Email :</strong> {student.email}
                </div>

                <div className="mb-3">
                    <strong>Role :</strong> {student.role}
                </div>
                <div className="mb-3">
    <strong>Registered On :</strong>{" "}
    {new Date(student.createdAt).toLocaleDateString()}
</div>

                <div className="mb-3">
                    <strong>Department :</strong> Electronics and Communication
                </div>

                <div className="mb-3">

    <strong>Contact :</strong>

    {

        editMode ?

        <input

            type="text"

            name="contact"

            className="form-control mt-2"

            value={profile.contact}

            onChange={handleChange}

        />

        :

        student.contact || "Not Updated"

    }

</div>

                <div className="mb-3">

    <strong>Hostel Block :</strong>

    {

        editMode ?

        <input

            type="text"

            name="hostelBlock"

            className="form-control mt-2"

            value={profile.hostelBlock}

            onChange={handleChange}

        />

        :

        student.hostelBlock || "Not Assigned"

    }

</div>

                <div className="mb-3">

    <strong>Room Number :</strong>

    {

        editMode ?

        <input

            type="text"

            name="roomNumber"

            className="form-control mt-2"

            value={profile.roomNumber}

            onChange={handleChange}

        />

        :

        student.roomNumber || "Not Assigned"

    }

</div>

               {

    editMode ?

    <button

        className="btn btn-success"

        onClick={handleSave}

    >

        Save Changes

    </button>

    :

    <button

        className="btn btn-primary"

        onClick={() => setEditMode(true)}

    >

        Edit Profile

    </button>

}

            </div>

        </div>
    );
}

export default Profile;