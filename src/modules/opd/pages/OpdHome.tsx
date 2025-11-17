import { useNavigate } from "react-router-dom";
import "./css/opd.css"

export default function OpdHome() {
  const navigate = useNavigate();

  return (
    <div className="opd-container">
      <h2 className="opd-title">OPD Management</h2>

      <div className="opd-grid">

        {/* Registration */}
        <div className="opd-card" onClick={() => navigate("/opd/registration")}>
          <h3>Registration</h3>
          <p>Add new patient or search old patient</p>
        </div>

        {/* Edit OPD */}
        <div className="opd-card" onClick={() => navigate("/opd/edit")}>
          <h3>Edit OPD</h3>
          <p>Edit OPD details and patient vitals/notes</p>
        </div>

        {/* View OPD */}
        <div className="opd-card" onClick={() => navigate("/opd/view")}>
          <h3>View OPD</h3>
          <p>View existing OPD records and summary</p>
        </div>

        {/* View OPD List*/}
        <div className="opd-card" onClick={() => navigate("/opd/visits")}>
          <h3>OPD List</h3>
          <p>View existing OPD List</p>
        </div>

      </div>
    </div>
  );
}
