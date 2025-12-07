import api from "../../core/api/api";
import type { CreateDoctorRequest, DoctorResponse } from "./doctor.types";


export const createDoctor = async (userData: CreateDoctorRequest) => {
  const response = await api.post('/api/v1/admin/registerDoctor', userData);
  return response.data;
};

export const getAllDoctorsAPI = () => {
  return api.get<DoctorResponse[]>("/api/v1/doctors/list");
};
