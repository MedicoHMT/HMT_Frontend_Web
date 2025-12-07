import api from "../../core/api/api";
import type { PatientRequestType, PatientResponseType } from "./patient.types";


export const createPatientAPI = (data: PatientRequestType) =>
  api.post<PatientResponseType>("/api/v1/patients", data);

export const searchPatientByUHIDAPI = (uhid: string) =>
  api.get<PatientResponseType>(`/api/v1/patients/${uhid}`);

export const getAllPatientsAPI = () =>
  api.get<PatientResponseType[]>("/api/v1/patients");

