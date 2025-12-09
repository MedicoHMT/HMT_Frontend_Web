import api from "../../core/api/api";
import type { CreateDoctorRequest, DoctorResponse } from "./doctor.types";
import type { AxiosRequestConfig } from "axios";


export const createDoctor = async (userData: CreateDoctorRequest) => {
  const response = await api.post('/api/v1/admin/registerDoctor', userData);
  return response.data;
};

// Accept an optional axios config so callers can pass an AbortController signal
export const getAllDoctorsAPI = (config?: AxiosRequestConfig) => {
  return api.get<DoctorResponse[]>("/api/v1/doctors/list", config);
};
