import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import PageLayout from "../components/PageLayout";

function LeaveEase() {

    const student = JSON.parse(
        localStorage.getItem("userInfo")
    );

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [reason, setReason] = useState("");
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {

        fetchLeaves();

    }, []);

    const fetchLeaves = async () => {

        try {

            const res = await axios.get(

                `http://localhost:5000/api/leaves/student/${student._id}`

            );

            setLeaves(res.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const applyLeave = async (e) => {

        e.preventDefault();

        try {

            const leaveData = {

                studentId: student._id,

                studentName: student.name,

                studentEmail: student.email,

                fromDate,

                toDate,

                reason

            };

            const res = await axios.post(

                "http://localhost:5000/api/leaves/apply",

                leaveData

            );

            Swal.fire({

                icon: "success",

                title: "Leave Applied",

                text: res.data.message

            });

            setFromDate("");
            setToDate("");
            setReason("");

            fetchLeaves();

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: "Leave Application Failed",

                text:

                    error.response?.data?.message ||

                    "Unable to apply leave."

            });

        }

    };

    return (

        <PageLayout title="🚪 LeaveEase">

            <div
                className="form-box mb-5"
                style={{
                    maxWidth: "700px",
                    margin: "auto"
                }}
            >

                <h3 className="mb-4">

                    Apply For Leave

                </h3>

                <form onSubmit={applyLeave}>

                    <div className="mb-3">

                        <label className="form-label">

                            From Date

                        </label>

                        <input

                            type="date"

                            className="form-control"

                            value={fromDate}

                            onChange={(e)=>

                                setFromDate(e.target.value)

                            }

                            required

                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            To Date

                        </label>

                        <input

                            type="date"

                            className="form-control"

                            value={toDate}

                            onChange={(e)=>

                                setToDate(e.target.value)

                            }

                            required

                        />

                    </div>

                    <div className="mb-4">

                        <label className="form-label">

                            Reason

                        </label>

                        <textarea

                            rows="5"

                            className="form-control"

                            value={reason}

                            onChange={(e)=>

                                setReason(e.target.value)

                            }

                            required

                        />

                    </div>

                    <button
                        className="btn btn-primary w-100"
                    >

                        Apply Leave

                    </button>

                </form>

            </div>

            <h3 className="mb-4">

                📋 Leave History

            </h3>

            <div className="dashboard-grid">

                {

                    leaves.length===0 ?

                    (

                        <div className="alert alert-info w-100">

                            No Leave Requests Found

                        </div>

                    )

                    :

                    (

                        leaves.map((leave)=>(

                            <div

                                className="dashboard-card"

                                key={leave._id}

                            >

                                <div

                                    className="card-icon"

                                    style={{

                                        background:"#f59e0b"

                                    }}

                                >

                                    🚪

                                </div>

                                <h3>

                                    Leave Request

                                </h3>

                                <hr/>

                                <p>

                                    <strong>

                                        From

                                    </strong>

                                </p>

                                <p>

                                    {

                                        new Date(

                                            leave.fromDate

                                        ).toLocaleDateString()

                                    }

                                </p>

                                <p>

                                    <strong>

                                        To

                                    </strong>

                                </p>

                                <p>

                                    {

                                        new Date(

                                            leave.toDate

                                        ).toLocaleDateString()

                                    }

                                </p>

                                <p>

                                    <strong>

                                        Reason

                                    </strong>

                                </p>

                                <p>

                                    {leave.reason}

                                </p>

                                {

                                    leave.status==="Pending" &&

                                    <span className="badge bg-warning text-dark">

                                        Pending

                                    </span>

                                }

                                {

                                    leave.status==="Approved" &&

                                    <span className="badge bg-success">

                                        Approved

                                    </span>

                                }

                                {

                                    leave.status==="Rejected" &&

                                    <span className="badge bg-danger">

                                        Rejected

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

export default LeaveEase;