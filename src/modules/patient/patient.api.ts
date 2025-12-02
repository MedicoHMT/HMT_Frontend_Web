import api from "../../core/api/api";
import type { Patient } from "./patient.types";

export const createPatient = (data: any) => {
  return api.post<Patient>("/api/v1/patients", data);
};


export const searchPatientByUHID = (uhid: string) => {
  return api.get<Patient>(`/api/v1/patients/${uhid}`);
};