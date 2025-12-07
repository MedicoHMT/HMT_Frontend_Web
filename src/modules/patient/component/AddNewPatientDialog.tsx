import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dialog.css";
import { createPatientAPI } from "../patient.api";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddNewPatientDialog({ open, onClose }: Props) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    address: "",
    email:"",
    emergencyContactName:"",
    emergencyContactNumber:"",
  });

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
  try {
    setLoading(true);

    // Create Patient
    const patientRes = await createPatientAPI(form);
    const patientId = patientRes.data.uhid;

    onClose();

    // Redirect to Visit Details Page
    navigate(`/opd/visit-details/${patientId}`);

  } catch (err) {
    console.error(err);
    alert("Error saving patient");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="dialog-overlay">
      <div className="dialog-box">

        <h3>Add New Patient</h3>

        <div className="dialog-body">
          <input
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />

          <input
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />

          <label>Date of Birth</label>
          <input
            type="date"
            value={form.dateOfBirth}
            onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
          />

          <select
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>

          <input
            placeholder="Contact Number"
            value={form.contactNumber}
            onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
          />

          <textarea
            placeholder="Address"
            rows={3}
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>

        <div className="dialog-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </div>

      </div>
    </div>
  );
}
