import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getDiagnosis, saveDiagnosis } from "../opd.api";
import "./css/assessment.css";
import type { OPDDiagnosisResponse } from "../opd.types";

export default function OpdDiagnosis() {
    const navigate = useNavigate();
    const location = useLocation();

    // Get opdVisitId from URL
    const params = new URLSearchParams(location.search);
    const opdVisitId = params.get("visitId");

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        icd10Code: "",
        description: "",
    });

    useEffect(() => {
        loadExistingDiagnosis();
    }, []);

    const loadExistingDiagnosis = async () => {
        try {
            const res = await getDiagnosis(opdVisitId!);

            const data: OPDDiagnosisResponse= res.data;

            if (data) {
                setForm({
                    icd10Code: data.icd10Code ?? "",
                    description: data.description ?? "",
                });
            }
        } catch (err) {
            console.log("Diagnosis not found → empty form");
        }
    };

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };
    const handleSubmit = async () => {
        try {
            setLoading(true);
            
            const payload = {
                opdVisitId: opdVisitId,
                ...form
            };

            // 1️⃣ Save Assessment
            await saveDiagnosis(payload);

            // 2️⃣ Mark Visit Completed
            // await updateVisitStatus(opdVisitId!, "COMPLETED");

            // 3️⃣ Redirect to summary page
            navigate(`/opd/summary/${opdVisitId}`);

        } catch (err) {
            console.error(err);
            alert("Failed to save assessment");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="assess-container">
            <h2 className="assess-title">Diagnosis</h2>

            <div className="assess-grid">

                <div className="assess-field">
                    <label>ICD10 Code</label>
                    <textarea
                        rows={1}
                        value={form.icd10Code}
                        onChange={(e) => handleChange("icd10Code", e.target.value)}
                        placeholder="Enter ICD10 Code"
                    />
                </div>

                <div className="assess-field">
                    <label>Description</label>
                    <textarea
                        rows={5}
                        value={form.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        placeholder="Enter Diagnosis Description"
                    />
                </div>

            </div>

            <div className="assess-footer">
                <button className="btn-cancel" onClick={() => navigate(-1)}>Back</button>

                <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Saving..." : "Finish & View Summary"}
                </button>
            </div>
        </div>
    );
}
