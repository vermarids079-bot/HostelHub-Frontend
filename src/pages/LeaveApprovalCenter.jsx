import { useEffect, useState } from "react";
import axios from "axios";

function LeaveApprovalCenter() {

    const [leaves, setLeaves] = useState([]);

    useEffect(() => {

        fetchLeaves();

    }, []);

    const fetchLeaves = async () => {

        try {

            const res = await axios.get(

                "http://localhost:5000/api/leaves/all"

            );

            setLeaves(res.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const approveLeave = async (id) => {

        try {

            const res = await axios.put(

                `http://localhost:5000/api/leaves/approve/${id}`

            );

            alert(res.data.message);

            fetchLeaves();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to approve leave."

            );

        }

    };

    const rejectLeave = async (id) => {

        try {

            const res = await axios.put(

                `http://localhost:5000/api/leaves/reject/${id}`

            );

            alert(res.data.message);

            fetchLeaves();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to reject leave."

            );

        }

    };

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-4">

                🚪 Leave Approval Center

            </h2>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>Student</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        leaves.length === 0 ?

                        (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center"
                                >

                                    No Leave Requests

                                </td>

                            </tr>

                        )

                        :

                        (

                            leaves.map((leave) => (

                                <tr key={leave._id}>

                                    <td>{leave.studentName}</td>

                                    <td>

                                        {

                                            new Date(

                                                leave.fromDate

                                            ).toLocaleDateString()

                                        }

                                    </td>

                                    <td>

                                        {

                                            new Date(

                                                leave.toDate

                                            ).toLocaleDateString()

                                        }

                                    </td>

                                    <td>{leave.reason}</td>

                                    <td>{leave.status}</td>

                                    <td>

                                        {

                                            leave.status === "Pending"

                                            ?

                                            <>

                                                <button

                                                    className="btn btn-success me-2"

                                                    onClick={() =>

                                                        approveLeave(leave._id)

                                                    }

                                                >

                                                    Approve

                                                </button>

                                                <button

                                                    className="btn btn-danger"

                                                    onClick={() =>

                                                        rejectLeave(leave._id)

                                                    }

                                                >

                                                    Reject

                                                </button>

                                            </>

                                            :

                                            leave.status

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

export default LeaveApprovalCenter;