import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Dashboard Title */}
      <h2 className="text-center mt-4 fw-bold">Dashboard</h2>

      {/* Buttons Row */}
      <div className="d-flex justify-content-center mt-5 gap-5 flex-wrap">

        {/* Doctors */}
        <div
          onClick={() => navigate("/doctors")}
          className="dashboard-card"
        >
          Doctors
        </div>

        {/* Patients */}
        <div
          onClick={() => navigate("/patients")}
          className="dashboard-card"
        >
          Patient
        </div>

        {/* OPD */}
        <div
          onClick={() => navigate("/opd")}
          className="dashboard-card"
        >
          OPD
        </div>

      </div>
    </div>
  );
}
