import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createVisit } from "../opd.api";
import "./css/visit-details.css";
import { getAllDoctorsAPI } from "../../doctor/doctor.api";
import type { DoctorResponse } from "../../doctor/doctor.types";

export default function OpdVisitDetails() {
    const navigate = useNavigate();
    const { patientUHID } = useParams();

    const [loading, setLoading] = useState(false);
    const [doctorList, setDoctorList] = useState<DoctorResponse[]>([]);

    const [form, setForm] = useState({
        doctorId: "",
        department: "",
        consultationFee: "",
        opdType: "",
        opdStatus: "ACTIVE",
    });



    useEffect(() => {
        loadDoctors();
    }, []);

    const loadDoctors = async () => {
        try {
            const response = await getAllDoctorsAPI();
            setDoctorList(response.data);
        } catch (err) {
            console.error("Failed to load doctors", err);
        }
    };


    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const payload = {
                patientUHId: patientUHID,
                doctorId: Number(form.doctorId),
                consultationFee: Number(form.consultationFee),
                opdType: form.opdType,
                status: form.opdStatus
            };

            await createVisit(payload);

            alert("OPD Visit Saved Successfully!");

            navigate("/opd"); 

        } catch (err) {
            console.error(err);
            alert("Failed to save OPD visit");
        } finally {
            setLoading(false);
        }
    };

    // Auto-fill department when doctor is selected
    const handleDoctorChange = (doctorId: string) => {
        const selected = doctorList.find((d: any) => d.id === Number(doctorId));

        // setForm((prev) => ({
        //     ...prev,
        //     doctorId,
        //     department: selected ? selected.department : ""
        // }));
    };


    return (
        <div className="visit-details-container">
            <h2 className="visit-details-title">Create OPD Visit</h2>
            <div className="text-lg mb-3">Patient UHID: {patientUHID}</div>

            <div className="visit-details-grid">

                <div className="visit-field">
                    <label>Doctor</label>
                    <select
                        value={form.doctorId}
                        onChange={(e) => handleDoctorChange(e.target.value)}
                    >
                        <option value="">Select Doctor</option>

                        {doctorList.map((doc: any) => (
                            <option key={doc.id} value={doc.id}>
                                {doc.firstName} {doc.lastName} {doc.specialization ? `(${doc.specialization})` : ""}
                            </option>
                        ))}
                    </select>
                </div>


                <div className="visit-field">
                    <label>Department</label>
                    <input
                        value={form.department}
                        disabled
                        placeholder="Auto-filled from doctor"
                    />
                </div>


                <div className="visit-field">
                    <label>Consultation Fee</label>
                    <input
                        type="number"
                        placeholder="Enter fee"
                        value={form.consultationFee}
                        onChange={(e) => handleChange("consultationFee", e.target.value)}
                    />
                </div>

                <div className="visit-field">
                    <label>OPD Type</label>
                    <select
                        value={form.opdType}
                        onChange={(e) => handleChange("opdType", e.target.value)}
                    >
                        <option value="">Select Type</option>
                        <option value="GENERAL">General OPD</option>
                        <option value="REVISIT">Revisit</option>
                        <option value="EMERGENCY">Emergency</option>
                    </select>
                </div>

                <div className="visit-field">
                    <label>Status</label>
                    <select
                        value={form.opdStatus}
                        onChange={(e) => handleChange("opdStatus", e.target.value)}
                    >
                        <option value="ACTIVE">Active</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>

            </div>

            <div className="visit-details-footer">
                <button className="btn-cancel" onClick={() => navigate(-1)}>Back</button>

                <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Saving..." : "Save Visit"}
                </button>
            </div>
        </div>
    );
}
