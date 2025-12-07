import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dialog.css";
import { searchPatientByUHIDAPI } from "../patient.api";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchOldPatientDialog({ open, onClose }: Props) {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  if (!open) return null;

  const handleSearch = async () => {
    try {
      const res = await searchPatientByUHIDAPI(query);
      setResults([res.data]);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  const handleSelect = (patientId: number) => {
    // Close modal
    onClose();

    // Redirect to Visit Details page
    navigate(`/opd/visit-details?patientId=${patientId}`);
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">

        <h3>Search Old Patient</h3>

        <div className="dialog-body">

          <input
            placeholder="Search UHID"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button className="btn-primary" onClick={handleSearch}>
            Search
          </button>

          {results.length > 0 && (
            <table className="result-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Select</th>
                </tr>
              </thead>

              <tbody>
                {results.map((p) => (
                  <tr key={p.id}>
                    <td>{p.firstName} {p.lastName}</td>
                    <td>{p.contactNumber}</td>
                    <td>
                      <button
                        className="btn-small"
                        onClick={() => handleSelect(p.id)}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>

        <div className="dialog-footer">
          <button className="btn-cancel" onClick={onClose}>Close</button>
        </div>

      </div>
    </div>
  );
}
