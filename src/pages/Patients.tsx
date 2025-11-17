import { useEffect, useState } from "react";
import { patientService } from "../services/patient.service";
import LogoutButton from "../components/LogoutButton";

export default function Patients() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    contactNumber: "",
    address: ""
  });

  const [showForm, setShowForm] = useState(false);

  const loadPatients = async () => {
    setLoading(true);
    const res = await patientService.getAll();
    setPatients(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleAddPatient = async () => {
    await patientService.create(form);

    setShowForm(false);
    setForm({
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      contactNumber: "",
      address: ""
    });
    loadPatients();
  };

  const deletePatient = async (uhid: string) => {
    await patientService.delete(uhid);
    loadPatients();
  };

  // Search by first OR last name
  const filtered = patients.filter((p) => {
    const name = `${p.firstName || ""} ${p.lastName || ""}`.toLowerCase();
    return name.includes(search.toLowerCase());
  });

  return (
    <div>

      {/* Content */}
      <div className="container mt-4">

        <div className="d-flex justify-content-between mb-3">
          <h3 className="fw-bold">Patients</h3>

          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Add Patient
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Address</th>
                <th style={{ width: "150px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>{p.firstName} {p.lastName}</td>
                  <td>{p.dateOfBirth}</td>
                  <td>{p.gender}</td>
                  <td>{p.contactNumber}</td>
                  <td>{p.address}</td>

                  <td>
                    <button
                      onClick={() => deletePatient(p.uhid)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Patient Modal */}
      {showForm && (
        <div className="modal fade show d-block bg-dark bg-opacity-50">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Add Patient</h5>
                <button className="btn-close" onClick={() => setShowForm(false)} />
              </div>

              <div className="modal-body">

                {/* FIRST ROW */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      value={form.firstName}
                      onChange={(e) =>
                        setForm({ ...form, firstName: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      value={form.lastName}
                      onChange={(e) =>
                        setForm({ ...form, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* SECOND ROW */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="date"
                      className="form-control"
                      value={form.dateOfBirth}
                      onChange={(e) =>
                        setForm({ ...form, dateOfBirth: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <select
                      className="form-control"
                      value={form.gender}
                      onChange={(e) =>
                        setForm({ ...form, gender: e.target.value })
                      }
                    >
                      <option value="">Select Gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                    </select>
                  </div>
                </div>

                {/* THIRD ROW */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Contact Number"
                      value={form.contactNumber}
                      onChange={(e) =>
                        setForm({ ...form, contactNumber: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address"
                      value={form.address}
                      onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button className="btn btn-primary" onClick={handleAddPatient}>
                  Save
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
