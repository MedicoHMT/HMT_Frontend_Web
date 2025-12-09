import { useEffect, useState } from "react";
import type { PatientResponseType } from "../patient.types";
import { getAllPatientsAPI } from "../patient.api";

export default function Patients() {
  const [patients, setPatients] = useState<PatientResponseType[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPatients = async () => {
    setLoading(true);
    const res = await getAllPatientsAPI();
    setPatients(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadPatients();
  }, []);

  return (
    <div>

      <div className="container mt-4">

        <div className="d-flex justify-content-between mb-3">
          <h3 className="fw-bold">Patients</h3>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>UHID</th>
                <th>Name</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Address</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((p) => (
                <tr key={p.uhid}>
                  <td>{p.uhid}</td>
                  <td>{p.firstName} {p.lastName}</td>
                  <td>{p.dateOfBirth}</td>
                  <td>{p.gender}</td>
                  <td>{p.contactNumber}</td>
                  <td>{p.address}</td>
                </tr>
              ))}

              {patients.length === 0 && (
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


    </div>
  );
}
