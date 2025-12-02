import type { Doctor } from "../doctor/doctor.types";
import type { Patient } from "../patient/patient.types";

// Create Visit DTO
export interface CreateVisitDTO {
  patientId: number;
  doctorId: number;
  consultationFee: number;
  opdType: string;       // GENERAL, REVISIT, etc.
  status?: string;       // ACTIVE, COMPLETED, CANCELLED
}

// Visit Response
export interface OPDVisitResponse {
  opdId: string;
  opdType: string;

  patientId: number;
  doctorId: number;

  visitDate: string;
  visitTime: string;
  consultationFee: number;
  status: string;

  patientUhid: string;

  patient: Patient;
  doctor: Doctor;
}

// Vitals Response
export interface OPDVitalsResponse {
  id: number;
  opdVisit: OPDVisitResponse;
  pulse: number;
  spo2: number;
  bp: string;
  temperature: number;
  respiration: number;
  weight: number;
  height: number;
  hospitalId: number;
}

// Assessment DTO
export interface OPDAssessmentDTO {
  visitId: number;
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
  visitId: number;
  symptoms: string;
  generalExamination: string;
  systemicExamination: string;
  provisionalDiagnosis: string;
  dietPlan: string;
  notes: string;
  createdAt: string;
}
