import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllVisits } from "../opd.api";
import "./css/visit-list.css";

export default function OpdVisitList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [visits, setVisits] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadVisits();
  }, []);

  const loadVisits = async () => {
    try {
      setLoading(true);
      const res = await getAllVisits();
      setVisits(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = visits.filter((v) => {
    const s = search.toLowerCase();
    return (
      v.opdId?.toLowerCase().includes(s) ||
      v.patientUhid?.toLowerCase().includes(s) ||
      (v.patientName && v.patientName.toLowerCase().includes(s))
    );
  });

  const openVisit = (visitId: number) => {
    navigate(`/opd/summary/${visitId}`);
  };

  return (
    <div className="visit-container">

      <h2 className="visit-title">OPD Visit List</h2>

      <div className="visit-search">
        <input
          type="text"
          placeholder="Search by OPD ID / UHID / Patient Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn-refresh" onClick={loadVisits}>Refresh</button>
      </div>

      {loading ? (
        <div>Loading visits...</div>
      ) : (
        <table className="visit-table">
          <thead>
            <tr>
              <th>OPD ID</th>
              <th>Patient UHID</th>
              <th>Patient</th>
              <th>Visit Date</th>
              <th>Doctor</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((v) => (
              <tr key={v.id}>
                <td>{v.opdId}</td>
                <td>{v.patientUhid}</td>
                <td>{v.patientName || "N/A"}</td>
                <td>{v.visitDate}</td>
                <td>{v.doctorName || "Doctor"}</td>
                <td>
                  <button
                    className="btn-small"
                    onClick={() => openVisit(v.id)}
                  >
                    Open
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No matching records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

    </div>
  );
}
