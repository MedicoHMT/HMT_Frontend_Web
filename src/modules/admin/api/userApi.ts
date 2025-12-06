import api from "../../../core/api/api";
import type { CreateUserRequest, CreateDoctorRequest, CreateDepartmentRequest } from "../types/user.types";

export const createUser = async (userData: CreateUserRequest) => {
  const response = await api.post('/api/v1/admin/register', userData);
  return response.data;
};
export const createDoctor = async (userData: CreateDoctorRequest) => {
  const response = await api.post('/api/v1/admin/registerDoctor', userData);
  return response.data;
};
export const createDepartmentApi = async (userData: CreateDepartmentRequest) => {
  const response = await api.post('/api/v1/departments/create', userData);
  return response.data;
};