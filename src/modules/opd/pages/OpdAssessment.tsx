import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAssessment, saveAssessment, updateVisitStatus } from "../opd.api";
import "./css/assessment.css";
import type { OPDAssessmentDTO, OPDAssessmentResponse } from "../opd.types";

export default function OpdAssessment() {
    const navigate = useNavigate();
    const location = useLocation();

    // Get visitId from URL
    const params = new URLSearchParams(location.search);
    const visitId = params.get("visitId");

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        symptoms: "",
        generalExamination: "",
        systemicExamination: "",
        provisionalDiagnosis: "",
        dietPlan: "",
        notes: "",
    });

    useEffect(() => {
        loadExistingAssessment();
    }, []);

    const loadExistingAssessment = async () => {
        try {
            const res = await getAssessment(visitId!);

            const data: OPDAssessmentResponse = res.data;

            if (data) {
                setForm({
                    symptoms: data.symptoms ?? "",
                    generalExamination: data.generalExamination ?? "",
                    systemicExamination: data.systemicExamination ?? "",
                    provisionalDiagnosis: data.provisionalDiagnosis ?? "",
                    dietPlan: data.dietPlan ?? "",
                    notes: data.notes ?? "",
                });
            }
        } catch (err) {
            console.log("Assessment not found → empty form");
        }
    };

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };
    const handleSubmit = async () => {
        try {
            setLoading(true);

            const payload = {
                opd_id: visitId,
                ...form
            };

            // 1️⃣ Save Assessment
            await saveAssessment(payload);

            // 2️⃣ Mark Visit Completed
            await updateVisitStatus(visitId!, "COMPLETED");

            // 3️⃣ Redirect to summary page
            navigate(`/opd/summary/${visitId}`);

        } catch (err) {
            console.error(err);
            alert("Failed to save assessment");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="assess-container">
            <h2 className="assess-title">Doctor Assessment</h2>

            <div className="assess-grid">

                <div className="assess-field">
                    <label>Symptoms</label>
                    <textarea
                        rows={3}
                        value={form.symptoms}
                        onChange={(e) => handleChange("symptoms", e.target.value)}
                        placeholder="Enter symptoms"
                    />
                </div>

                <div className="assess-field">
                    <label>General Examination</label>
                    <textarea
                        rows={3}
                        value={form.generalExamination}
                        onChange={(e) => handleChange("generalExamination", e.target.value)}
                        placeholder="General examination notes"
                    />
                </div>

                <div className="assess-field">
                    <label>Systemic Examination</label>
                    <textarea
                        rows={3}
                        value={form.systemicExamination}
                        onChange={(e) => handleChange("systemicExamination", e.target.value)}
                        placeholder="Systemic examination details"
                    />
                </div>

                <div className="assess-field">
                    <label>Provisional Diagnosis</label>
                    <textarea
                        rows={3}
                        value={form.provisionalDiagnosis}
                        onChange={(e) => handleChange("provisionalDiagnosis", e.target.value)}
                        placeholder="Diagnosis"
                    />
                </div>

                <div className="assess-field">
                    <label>Diet Plan</label>
                    <textarea
                        rows={3}
                        value={form.dietPlan}
                        onChange={(e) => handleChange("dietPlan", e.target.value)}
                        placeholder="Diet plan"
                    />
                </div>

                <div className="assess-field">
                    <label>Additional Notes</label>
                    <textarea
                        rows={3}
                        value={form.notes}
                        onChange={(e) => handleChange("notes", e.target.value)}
                        placeholder="Any notes"
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
