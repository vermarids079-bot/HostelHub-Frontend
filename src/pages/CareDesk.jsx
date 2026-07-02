import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import PageLayout from "../components/PageLayout";

function CareDesk() {

    const student = JSON.parse(
        localStorage.getItem("userInfo")
    );

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {

        fetchComplaints();

    }, []);

    const fetchComplaints = async () => {

        try {

            const res = await axios.get(

                `https://hostelhub-backend-sldr.onrender.com/api/complaints/student/${student._id}`

            );

            setComplaints(res.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const submitComplaint = async (e) => {

        e.preventDefault();

        try {

            const complaintData = {

                studentId: student._id,

                studentName: student.name,

                studentEmail: student.email,

                title,

                description

            };

            const res = await axios.post(

                "https://hostelhub-backend-sldr.onrender.com/api/complaints/create",

                complaintData

            );

            Swal.fire({

                icon: "success",

                title: "Complaint Submitted",

                text: res.data.message

            });

            setTitle("");
            setDescription("");

            fetchComplaints();

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: "Submission Failed",

                text:

                    error.response?.data?.message ||

                    "Unable to submit complaint."

            });

        }

    };

    return (

        <PageLayout title="🛠 CareDesk">

            <div
                className="form-box mb-5"
                style={{
                    maxWidth: "700px",
                    margin: "auto"
                }}
            >

                <h3 className="mb-4">

                    Raise New Complaint

                </h3>

                <form onSubmit={submitComplaint}>

                    <div className="mb-3">

                        <label className="form-label">

                            Complaint Title

                        </label>

                        <input

                            type="text"

                            className="form-control"

                            value={title}

                            onChange={(e) =>

                                setTitle(e.target.value)

                            }

                            required

                        />

                    </div>

                    <div className="mb-4">

                        <label className="form-label">

                            Description

                        </label>

                        <textarea

                            rows="5"

                            className="form-control"

                            value={description}

                            onChange={(e) =>

                                setDescription(e.target.value)

                            }

                            required

                        />

                    </div>

                    <button
                        className="btn btn-primary w-100"
                    >

                        Submit Complaint

                    </button>

                </form>

            </div>

            <h3 className="mb-4">

                📋 Complaint History

            </h3>

            <div className="dashboard-grid">

                {

                    complaints.length === 0 ?

                    (

                        <div className="alert alert-info w-100">

                            No Complaints Found

                        </div>

                    )

                    :

                    (

                        complaints.map((complaint) => (

                            <div

                                className="dashboard-card"

                                key={complaint._id}

                            >

                                <div

                                    className="card-icon"

                                    style={{

                                        background:"#dc2626"

                                    }}

                                >

                                    🛠

                                </div>

                                <h3>

                                    {complaint.title}

                                </h3>

                                <hr/>

                                <p>

                                    {complaint.description}

                                </p>

                                <p>

                                    <strong>

                                        Submitted :

                                    </strong>

                                </p>

                                <p>

                                    {

                                        new Date(

                                            complaint.createdAt

                                        ).toLocaleDateString()

                                    }

                                </p>

                                {

                                    complaint.status==="Pending" &&

                                    <span className="badge bg-warning text-dark">

                                        Pending

                                    </span>

                                }

                                {

                                    complaint.status==="Resolved" &&

                                    <span className="badge bg-success">

                                        Resolved

                                    </span>

                                }

                                {

                                    complaint.status==="In Progress" &&

                                    <span className="badge bg-primary">

                                        In Progress

                                    </span>

                                }

                            </div>

                        ))

                    )

                }

            </div>

        </PageLayout>

    );

}

export default CareDesk;