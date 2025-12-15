import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getInvestigations, saveInvestigations } from "../opd.api";
import "./css/assessment.css";
import type { OPDInvestigationsResponse } from "../opd.types";

export default function OpdInvestigations() {
    const navigate = useNavigate();
    const location = useLocation();

    // Get opdVisitId from URL
    const params = new URLSearchParams(location.search);
    const opdVisitId = params.get("visitId");

    const [loading, setLoading] = useState(false);

    const [investigations, setInvestigations] = useState<OPDInvestigationsResponse[]>([]);

    useEffect(() => {
        loadExistingInvestigatins();
    }, []);

    const loadExistingInvestigatins = async () => {
        try {
            const res = await getInvestigations(opdVisitId!);
            setInvestigations(res.data || [])

        } catch (err) {
            console.log("Investigations not found → empty form");
            setInvestigations([]);
        }
    };

    const handleChange = (index: number, field: string, value: any) => {
        setInvestigations( investigation =>
            investigation.map ((prev, i) => 
                index === i ? { ...prev, [field]: value } : prev
            )
        );
    };

    const handleSubmit = async (index: number) => {
        try {
            setLoading(true);

            const investigation = investigations[index];

            // 1️⃣ Save Assessment
            await saveInvestigations({
                opdVisitId: opdVisitId,
                ...investigation
            });

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
            <h2 className="assess-title">Investigations</h2>

            {investigations.length === 0 && (
                <p className="empty-state">No investigations added yet.</p>
            )}
            {investigations.map((investigation, index) => (
                <div className="assess-card">
                    <h5>Investigation {index + 1}</h5>
                    <div className="assess-grid">

                        <div className="assess-field">
                            <label>Test Name</label>
                            <textarea
                                rows={1}
                                value={investigation.testName}
                                onChange={(e) => 
                                    handleChange(index, "testName", e.target.value)}
                                placeholder="Enter Test Name"
                            />
                        </div>

                        <div className="assess-field">
                            <label>Category</label>
                            <textarea
                                rows={5}
                                value={investigation.category}
                                onChange={(e) => 
                                    handleChange(index, "category", e.target.value)}
                                placeholder="Enter Category"
                            />
                        </div>

                        <div className="assess-field">
                            <label>
                            <input
                                type="checkbox"
                                checked={investigation.isUrgent}
                                onChange={(e) => 
                                    handleChange(index, "isUrgent", e.target.checked)}
                                />
                            <span>Is Urgent</span>
                            </label>
                        </div>

                        <div className="assess-field">
                            <label>Status</label>
                            <textarea
                                rows={1}
                                value={investigation.status}
                                onChange={(e) => 
                                    handleChange(index, "status", e.target.value)}
                                placeholder="Enter Status"
                            />
                        </div>

                        <div className="assess-footer">

                            <button 
                                className="btn-primary" 
                                onClick={() => 
                                    handleSubmit(index)} disabled={loading}>
                                {loading ? "Saving..." : "Finish & View Summary"}
                            </button>
                        </div>
                    </div>
                </div>
             ))}
                <button className="btn-cancel" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
}
