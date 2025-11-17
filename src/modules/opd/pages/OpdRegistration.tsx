import { useState } from "react";
import AddNewPatientDialog from "../components/AddNewPatientDialog";
import SearchOldPatientDialog from "../components/SearchOldPatientDialog";
import "./css/opd-registration.css";

export default function OpdRegistration() {
  const [openNew, setOpenNew] = useState(false);
  const [openOld, setOpenOld] = useState(false);

  return (
    <>
      <div className="reg-container">
        <h2 className="reg-title">OPD Registration</h2>

        <div className="reg-grid">

          <div className="reg-card" onClick={() => setOpenNew(true)}>
            <h3>Add New Patient</h3>
            <p>Register a new patient</p>
          </div>

          <div className="reg-card" onClick={() => setOpenOld(true)}>
            <h3>Search Old Patient</h3>
            <p>Find existing patient using UHID / Phone</p>
          </div>

        </div>
      </div>

      <AddNewPatientDialog open={openNew} onClose={() => setOpenNew(false)} />
      <SearchOldPatientDialog open={openOld} onClose={() => setOpenOld(false)} />
    </>
  );
}
