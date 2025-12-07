import { useEffect, useState } from "react";
import type { DoctorResponse } from "../doctor.types";
import { getAllDoctorsAPI } from "../doctor.api";

export default function Doctors() {
  const [doctor, setDoctor] = useState<DoctorResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDoctors = async () => {
    setLoading(true);
    const res = await getAllDoctorsAPI();
    setDoctor(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  return (
    <div>

      <div className="container mt-4">

        <div className="d-flex justify-content-between mb-3">
          <h3 className="fw-bold">Doctor</h3>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>doctorId</th>
                <th>Name</th>
                <th>specialization</th>
                <th>consultationFee</th>
                <th>department Name</th>
              </tr>
            </thead>

            <tbody>
              {doctor.map((d) => (
                <tr key={d.doctorId}>
                  <td>{d.doctorId}</td>
                  <td>{d.firstName} {d.lastName}</td>
                  <td>{d.specialization}</td>
                  <td>{d.consultationFee}</td>
                  <td>{d.department.name}</td>
                </tr>
              ))}

              {doctor.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted">
                    No Doctors found.
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
