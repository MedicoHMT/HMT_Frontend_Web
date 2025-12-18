import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


import "./css/opd-examine.css";
import { getDetailedVisitById } from "../opd.api";
import { type OPDVisitResponse, type OPDVitalsResponse, type OPDAssessmentResponse, type OPDDiagnosisResponse, type OPDInvestigationsResponse } from "../opd.types";

export default function OpdExamine() {
  const { visitId } = useParams();
  const navigate = useNavigate();

  const [visit, setVisit] = useState<OPDVisitResponse | null>(null);
  const [vitals, setVitals] = useState<OPDVitalsResponse | null>(null);
  const [assessment, setAssessment] = useState<OPDAssessmentResponse | null>(null);
  const [diagnosis, setDiagnosis] = useState<OPDDiagnosisResponse | null>(null);
  const [investigations, setInvestigations] = useState<OPDInvestigationsResponse[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const detailedVisitRes = await getDetailedVisitById(visitId!);
      setVisit(detailedVisitRes.data);

      //const vitalsRes = await getVitals(visitId!);
      setVitals(detailedVisitRes.data.opdVital);

      //const assessRes = await getAssessment(visitId!);
      setAssessment(detailedVisitRes.data.opdAssessment);

      setDiagnosis(detailedVisitRes.data.opdDiagnosis);

      setInvestigations(detailedVisitRes.data.opdInvestigations);
    } catch (err) {
      console.error(err);
    }
  };

  if (!visit) return <div>Loading...</div>;

  return (
    <div className="examine-container">
      
      {/* TOP BLUE PATIENT INFO BOX */}
      <div className="examine-header">
        <div><b>UHID:</b> {visit.patient.uhid}</div>
        <div><b>OPD ID:</b> {visit.opdId}</div>
        <div><b>Patient:</b> {visit.patient.firstName} {visit.patient.lastName}</div>
        <div><b>Doctor:</b> {visit.doctor.firstName} {visit.doctor.lastName}</div>
        <div><b>Department:</b> {visit.department.name}</div>
        <div><b>DOB:</b> {visit.patient.dateOfBirth}</div>
      </div>

      {/* BUTTONS */}
      <div className="examine-options">
        <button onClick={() => navigate(`/opd/vitals?visitId=${visitId}`)}>
          Examine Vitals
        </button>
        <button onClick={() => navigate(`/opd/assessment?visitId=${visitId}`)}>
          Examine Assessment
        </button>
        <button onClick={() => navigate(`/opd/diagnosis?visitId=${visitId}`)}>
          Diagnosis
        </button>
        <button onClick={() => navigate(`/opd/investigations?visitId=${visitId}`)}>
          Investigations
        </button>
      
      </div>

      {/* OPD SUMMARY SHOWN DIRECTLY HERE */}
      <div className="summary-section">

        <h3>OPD Summary</h3>

        <div className="summary-block">
          <h4>Visit Details</h4>
          <p><b>Visit Date & Time:</b> {visit.visitDate}</p>
          <p><b>Consultation Fee:</b> ₹{visit.consultationFee}</p>
          <p><b>OPD Type:</b> {visit.opdType}</p>
          <p><b>Status:</b> {visit.status}</p>
        </div>

        {vitals && (
          <div className="summary-block">
            <h4>Vitals</h4>
            <p><b>BP:</b> {vitals.bpSystolic}/{vitals.bpDiastolic}</p>
            <p><b>Pulse:</b> {vitals.pulseRate}</p>
            <p><b>SPO2:</b> {vitals.spo2}</p>
            <p><b>Respiration:</b> {vitals.respirationRate}</p>
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

        {diagnosis && (
          <div className="summary-block">
            <h4>Diagnosis</h4>
            <p><b>ICD10 Code</b> {diagnosis.icd10Code}</p>
            <p><b>Description:</b> {diagnosis.description}</p>
          </div>
        )}

        {investigations && investigations.length > 0 && (
          <div className="summary-block">
            <h4>Investigations</h4>

            {investigations.map((investigation, index) => (
              <div className="investigation-item">
                <h5>Investigation {index + 1}</h5>
                <p><b>Test Name:</b> {investigation.testName}</p>
                <p><b>Category:</b> {investigation.category}</p>
                <p><b>Is Urgent:</b> {investigation.isUrgent}</p>
                <p><b>Status:</b> {investigation.status}</p>
                {investigations.length > index + 1 && <hr /> }
              </div>
            ))}
          </div>
        )}        

        {!vitals && !assessment && !diagnosis && (
          <div className="summary-empty">
            No vitals or assessment or diagnosis added yet.
          </div>
        )}

      </div>
    </div>
  );
}
