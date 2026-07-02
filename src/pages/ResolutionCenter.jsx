import { useEffect, useState } from "react";
import axios from "axios";

function ResolutionCenter() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                "https://hostelhub-backend-sldr.onrender.com/api/complaints/all"
            );

            setComplaints(res.data);
        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message ||
                    "Failed to fetch complaints."
            );
        } finally {
            setLoading(false);
        }
    };

    const resolveComplaint = async (id) => {
        try {
            const res = await axios.put(
                `https://hostelhub-backend-sldr.onrender.com/api/complaints/resolve/${id}`
            );

            alert(res.data.message);
            fetchComplaints();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                    "Unable to resolve complaint."
            );
        }
    };

    const rejectComplaint = async (id) => {
        try {
            const res = await axios.put(
                `https://hostelhub-backend-sldr.onrender.com/api/complaints/reject/${id}`
            );

            alert(res.data.message);
            fetchComplaints();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                    "Unable to reject complaint."
            );
        }
    };

    const getBadge = (status) => {
        switch (status) {
            case "Resolved":
                return <span className="badge bg-success">Resolved</span>;
            case "Rejected":
                return <span className="badge bg-danger">Rejected</span>;
            default:
                return (
                    <span className="badge bg-warning text-dark">
                        Pending
                    </span>
                );
        }
    };

    const filteredComplaints = complaints.filter((complaint) => {
        const matchesSearch =
            complaint.studentName
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||
            complaint.studentEmail
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||
            complaint.title
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||
            complaint.description
                ?.toLowerCase()
                .includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "All" ||
            complaint.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="container py-4">
            <div className="card shadow border-0">
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">🛠 Resolution Center</h3>

                    <button
                        className="btn btn-light btn-sm"
                        onClick={fetchComplaints}
                    >
                        Refresh
                    </button>
                </div>

                <div className="card-body">
                    <div className="row mb-4">
                        <div className="col-md-8 mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by student, email, complaint title or description..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />
                        </div>

                        <div className="col-md-4">
                            <select
                                className="form-select"
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                            >
                                <option value="All">
                                    All Status
                                </option>
                                <option value="Pending">
                                    Pending
                                </option>
                                <option value="Resolved">
                                    Resolved
                                </option>
                                <option value="Rejected">
                                    Rejected
                                </option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-5">
                            <div
                                className="spinner-border text-primary"
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th>#</th>
                                        <th>Student</th>
                                        <th>Email</th>
                                        <th>Complaint</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                        <th width="180">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredComplaints.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="text-center py-4"
                                            >
                                                No complaints found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredComplaints.map(
                                            (complaint, index) => (
                                                <tr
                                                    key={
                                                        complaint._id
                                                    }
                                                >
                                                    <td>
                                                        {index + 1}
                                                    </td>

                                                    <td>
                                                        {
                                                            complaint.studentName
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            complaint.studentEmail
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            complaint.title
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            complaint.description
                                                        }
                                                    </td>

                                                    <td>
                                                        {getBadge(
                                                            complaint.status
                                                        )}
                                                    </td>

                                                    <td>
                                                        {complaint.status ===
                                                        "Pending" ? (
                                                            <div className="d-flex gap-2">
                                                                <button
                                                                    className="btn btn-success btn-sm"
                                                                    onClick={() =>
                                                                        resolveComplaint(
                                                                            complaint._id
                                                                        )
                                                                    }
                                                                >
                                                                    Resolve
                                                                </button>

                                                                <button
                                                                    className="btn btn-danger btn-sm"
                                                                    onClick={() =>
                                                                        rejectComplaint(
                                                                            complaint._id
                                                                        )
                                                                    }
                                                                >
                                                                    Reject
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <span className="text-muted fw-semibold">
                                                                Completed
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="card-footer text-muted d-flex justify-content-between">
                    <span>
                        Total Complaints: {complaints.length}
                    </span>

                    <span>
                        Showing: {filteredComplaints.length}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ResolutionCenter;