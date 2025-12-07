import { useState } from "react";
import "./css/opd-registration.css";
import AddNewPatientDialog from "../../patient/component/AddNewPatientDialog";
import SearchOldPatientDialog from "../../patient/component/SearchOldPatientDialog";

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
