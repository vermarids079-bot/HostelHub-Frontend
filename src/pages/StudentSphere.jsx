import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function StudentSphere() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        "http://localhost:5000/api/auth/students"
      );

      if (data.success) {
        setStudents(data.students || []);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load students.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const deleteStudent = async (id, name) => {
    const result = await Swal.fire({
      title: "Delete Student?",
      text: `Remove ${name} from StudentSphere?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/auth/student/${id}`
      );

      setStudents((prev) => prev.filter((student) => student._id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Student removed successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to delete student.",
      });
    }
  };

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const query = search.toLowerCase();

      return (
        (student.name || "").toLowerCase().includes(query) ||
        (student.email || "").toLowerCase().includes(query)
      );
    });
  }, [students, search]);

  return (
    <div className="container py-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <h2 className="fw-bold m-0">👨‍🎓 StudentSphere</h2>

        <input
          type="text"
          className="form-control"
          style={{ maxWidth: "350px" }}
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div
            className="spinner-border text-primary"
            role="status"
          ></div>
          <p className="mt-3">Loading students...</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="alert alert-info text-center">
          No students found.
        </div>
      ) : (
        <div className="row g-4">
          {filteredStudents.map((student) => (
            <div
              className="col-12 col-sm-6 col-lg-4"
              key={student._id}
            >
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold mb-3">
                    {student.name || "N/A"}
                  </h5>

                  <p className="mb-2">
                    <strong>Email:</strong>{" "}
                    {student.email || "N/A"}
                  </p>

                  <p className="mb-2">
                    <strong>Room:</strong>{" "}
                    {student.room ||
                      student.roomNumber ||
                      student.roomNo ||
                      "Not Assigned"}
                  </p>

                  {student.phone && (
                    <p className="mb-2">
                      <strong>Phone:</strong> {student.phone}
                    </p>
                  )}

                  <div className="mt-auto pt-3">
                    <button
                      className="btn btn-danger w-100"
                      onClick={() =>
                        deleteStudent(student._id, student.name)
                      }
                    >
                      Remove Student
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentSphere;