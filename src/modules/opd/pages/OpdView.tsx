import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllVisits, getVisitById } from "../opd.api";
import "./css/opd-view.css";
import type { OPDVisitResponse } from "../opd.types";

export default function OpdView() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [visits, setVisits] = useState<OPDVisitResponse[]>([]);
  const [filtered, setFiltered] = useState<OPDVisitResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActiveVisits();
  }, []);

  const loadActiveVisits = async () => {
    try {
      setLoading(true);
      const res = await getAllVisits();

      // filter ACTIVE only
    //   const active = res.data.filter((v: any) => v.status === "ACTIVE");
        const active = res.data;
      setVisits(active);
      setFiltered(active);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) return setFiltered(visits);

    try {
      const res = await getVisitById(search);
      setFiltered([res.data]);
    } catch {
      alert("OPD ID not found");
    }
  };

  const openExamine = (visitId: string) => {
    navigate(`/opd/examine/${visitId}`);
  };

  const editVisit = (visitId: string) => {
    navigate(`/opd/edit?visitId=${visitId}`);
  };

  const printSlip = (visitId: string) => {
    window.open(`/opd/print/${visitId}`, "_blank");
  };

  return (
    <div className="opd-view-container">
      <h2>View OPD</h2>

      {/* SEARCH BOX */}
      <div className="search-box">
        <input
          placeholder="Search by OPD ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn-primary" onClick={handleSearch}>Search</button>
      </div>

      {/* TABLE */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="opd-table">
          <thead>
            <tr>
              <th>OPD ID</th>
              <th>UHID</th>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Department</th>
              <th>Print</th>
              <th>Edit</th>
              <th>Examine</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((v) => (
              <tr key={v.opdId}>
                <td>{v.opdId}</td>
                <td>{v.patientUhid}</td>
                <td>{v.patient.firstName} {v.patient.lastName}</td>
                <td>{v.doctor.firstName} {v.doctor.lastName}</td>
                <td>{v.doctor.department || "N/A"}</td>
                <td>
                  <button className="btn-small" onClick={() => printSlip(v.opdId)}>
                    Print Slip
                  </button>
                </td>
                <td>
                  <button className="btn-small" onClick={() => editVisit(v.opdId)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn-primary btn-small" onClick={() => openExamine(v.opdId)}>
                    Examine
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
