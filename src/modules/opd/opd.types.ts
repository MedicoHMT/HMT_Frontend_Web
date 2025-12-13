import type { DepartmentResponse } from "../departments/department.type";
import type { DoctorResponse } from "../doctor/doctor.types";
import type { PatientResponseType } from "../patient/patient.types";

export interface CreateOPDVisitRequest {
  patientUHId: string;
  doctorId: number;
  departmentId: number;
  consultationFee: number;
  opdType: string;      
  status: string;       // ACTIVE, COMPLETED, CANCELLED
  reason: string | null;
  triageLevel: string | null;
  opdVisitDateTime: string;
}

// Visit Response
export interface OPDVisitResponse {
  opdId: string;
  opdType: string;
  tokenNumber: number;
  triageLevel: string;
  reason: string;
  visitDate: string;
  consultationFee: number;
  status: string;
  patient: PatientResponseType;
  doctor: DoctorResponse;
  department: DepartmentResponse;
}

//Vitals Request
export interface OPDVitalsRequest {
  opdVisitId: string;
  pulseRate: number;
  bpSystolic: number;
  bpDiastolic: number;
  temperature: number;
  spo2: number;
  respirationRate: number;
  weight: number;
  height: number;
}

// Vitals Response
export interface OPDVitalsResponse {
  //id: number;
  opdVisit: OPDVisitResponse;
  pulseRate: number;
  spo2: number;
  bpSystolic: number;
  bpDiastolic: number;
  temperature: number;
  respirationRate: number;
  weight: number;
  height: number;
  hospitalId: number;
}

// Assessment DTO
export interface OPDAssessmentDTO {
  opdVisitId: number;
  symptoms: string;
  generalExamination: string;
  systemicExamination: string;
  provisionalDiagnosis: string;
  dietPlan: string;
  notes: string;
}

// Assessment Response
export interface OPDAssessmentResponse {
  id: number;
  opdVisit: OPDVisitResponse;
  symptoms: string;
  generalExamination: string;
  systemicExamination: string;
  provisionalDiagnosis: string;
  dietPlan: string;
  notes: string;
  createdAt: string;
}
