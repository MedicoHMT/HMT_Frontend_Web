import http from "../../services/http";

export const createPatient = (data: any) => {
  return http.post("/api/v1/patients", data);
};

export const getPatientById = (id: string | number) => {
  return http.get(`/api/v1/patients/${id}`);
};

export const searchPatientByUHID = (uhid: string) => {
  return http.get(`/api/v1/patients/${uhid}`);
};
