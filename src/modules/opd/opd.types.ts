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

  patientName: string;
  patientDob?: string;
  patientUhid: string;

  doctorId: number;
  doctorName: string;

  department?: string;

  visitDate: string;
  visitTime: string;
  consultationFee: number;

  status: string;
}

// Vitals DTO
export interface OPDVitalsDTO {
  visitId: number;
  pulse: number;
  spo2: number;
  bp: string;
  temperature: number;
  respiration: number;
  weight: number;
  height: number;
}

// Vitals Response
export interface OPDVitalsResponse {
  opdid: number;
  pulse: number;
  spo2: number;
  bp: string;
  temperature: number;
  respiration: number;
  weight: number;
  height: number;
  createdAt: string;
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
