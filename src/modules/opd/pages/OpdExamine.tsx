import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


import "./css/opd-examine.css";
import { getAssessment, getVisitById, getVitals } from "../opd.api";
import type { OPDVisitResponse, OPDVitalsResponse, OPDAssessmentResponse } from "../opd.types";

export default function OpdExamine() {
  const { visitId } = useParams();
  const navigate = useNavigate();

  const [visit, setVisit] = useState<OPDVisitResponse | null>(null);
  const [vitals, setVitals] = useState<OPDVitalsResponse | null>(null);
  const [assessment, setAssessment] = useState<OPDAssessmentResponse | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const visitRes = await getVisitById(visitId!);
      setVisit(visitRes.data);

      const vitalsRes = await getVitals(visitId!);
      setVitals(vitalsRes.data);

      const assessRes = await getAssessment(visitId!);
      setAssessment(assessRes.data);

    } catch (err) {
      console.error(err);
    }
  };

  if (!visit) return <div>Loading...</div>;

  return (
    <div className="examine-container">
      
      {/* TOP BLUE PATIENT INFO BOX */}
      <div className="examine-header">
        <div><b>UHID:</b> {visit.patientUhid}</div>
        <div><b>OPD ID:</b> {visit.opdId}</div>
        <div><b>Patient:</b> {visit.patientName}</div>
        <div><b>Doctor:</b> {visit.doctorName}</div>
        <div><b>Department:</b> {visit.department}</div>
        <div><b>DOB:</b> {visit.patientDob}</div>
      </div>

      {/* BUTTONS */}
      <div className="examine-options">
        <button onClick={() => navigate(`/opd/vitals?visitId=${visitId}`)}>
          Examine Vitals
        </button>
        <button onClick={() => navigate(`/opd/assessment?visitId=${visitId}`)}>
          Examine Assessment
        </button>
      
      </div>

      {/* OPD SUMMARY SHOWN DIRECTLY HERE */}
      <div className="summary-section">

        <h3>OPD Summary</h3>

        <div className="summary-block">
          <h4>Visit Details</h4>
          <p><b>Visit Date:</b> {visit.visitDate}</p>
          <p><b>Visit Time:</b> {visit.visitTime}</p>
          <p><b>Consultation Fee:</b> ₹{visit.consultationFee}</p>
          <p><b>OPD Type:</b> {visit.opdType}</p>
          <p><b>Status:</b> {visit.status}</p>
        </div>

        {vitals && (
          <div className="summary-block">
            <h4>Vitals</h4>
            <p><b>BP:</b> {vitals.bp}</p>
            <p><b>Pulse:</b> {vitals.pulse}</p>
            <p><b>SPO2:</b> {vitals.spo2}</p>
            <p><b>Respiration:</b> {vitals.respiration}</p>
            <p><b>Temperature:</b> {vitals.temperature} °F</p>
            <p><b>Weight:</b> {vitals.weight} kg</p>
            <p><b>Height:</b> {vitals.height} cm</p>
          </div>
        )}

        {assessment && (
          <div className="summary-block">
            <h4>Assessment</h4>
            <p><b>Symptoms:</b> {assessment.symptoms}</p>
            <p><b>General Exam:</b> {assessment.generalExamination}</p>
            <p><b>Systemic Exam:</b> {assessment.systemicExamination}</p>
            <p><b>Diagnosis:</b> {assessment.provisionalDiagnosis}</p>
            <p><b>Diet Plan:</b> {assessment.dietPlan}</p>
            <p><b>Notes:</b> {assessment.notes}</p>
          </div>
        )}

        {!vitals && !assessment && (
          <div className="summary-empty">
            No vitals or assessment added yet.
          </div>
        )}

      </div>
    </div>
  );
}
