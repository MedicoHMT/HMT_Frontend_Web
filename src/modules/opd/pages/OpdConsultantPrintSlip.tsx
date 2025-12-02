import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./css/print-slip.css";
import { getVisitById } from "../opd.api";
import { getDoctorById } from "../../doctor/doctor.api";

export default function OpdConsultantPrintSlip() {
  const { opdId } = useParams();

  const [visit, setVisit] = useState<any>(null);
  const [doctor, setDoctor] = useState<any>(null);

  useEffect(() => {
    loadSlipData();
  }, []);

  const loadSlipData = async () => {
    try {
      const res = await getVisitById(opdId!);
      setVisit(res.data);

      const doc = await getDoctorById(res.data.doctorId);
      setDoctor(doc.data);
    } catch (err) {
      console.error(err);
      alert("Unable to load slip");
    }
  };

  if (!visit || !doctor) return <div>Loading...</div>;

  const patient = visit.patient;

  return (
    <div className="print-container">
        
      <button
        className="print-btn"
        onClick={() => window.print()}
      >
        Print Receipt
      </button>
      {/* HEADER */}
      <div className="header">
        <div className="hospital-text">
          <h1>{localStorage.getItem("hospitalName")}</h1>
        </div>
      </div>

      <h2 className="title">OPD Payment Receipt</h2>

      {/* DETAILS GRID */}
      <div className="details-grid">

        <div><b>UHID:</b> {patient.uhid}</div>
        <div><b>OPD ID:</b> {visit.opdId}</div>
        <div><b>Name:</b> {patient.firstName} {patient.lastName}</div>
        <div><b>Date:</b> {visit.visitDate} {visit.visitTime}</div>
        <div><b>Gender:</b> {patient.gender}</div>
        <div><b>Mobile:</b> {patient.contactNumber}</div>
        <div><b>Age/DOB:</b> {patient.dateOfBirth}</div>
        <div><b>Department:</b> {doctor.department}</div>
        <div><b>Doctor:</b> {doctor.firstName} {doctor.lastName}</div>
        <div><b>Address:</b> {patient.address}</div>

      </div>

      {/* TABLE */}
      <table className="fees-table">
        <thead>
          <tr>
            <th>S. No</th>
            <th>Particular</th>
            <th>Mode</th>
            <th>Amount (Rs)</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Consultation Fee</td>
            <td>Cash</td>
            <td>{visit.consultationFee.toFixed(2)}</td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={3} className="paid-label">
              Paid Amount (Rupees {visit.consultationFee} Only)
            </td>
            <td className="paid-amount">
              {visit.consultationFee.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>

      <div className="note">
        Received with thanks Rs. {visit.consultationFee}/- from{" "}
        <b>{patient.firstName} {patient.lastName}</b>.
      </div>

      <div className="signature">
        Authorized Signature
      </div>
    </div>
  );
}
