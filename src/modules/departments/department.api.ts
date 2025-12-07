import api from "../../core/api/api";
import type { DepartmentRequest, DepartmentResponse } from "./department.type";



export const createDepartmentApi = async (userData: DepartmentRequest) => {
  const response = await api.post('/api/v1/departments/create', userData);
  return response.data;
};

export const getDepartments = async (): Promise<DepartmentResponse[]> => {
    const response = await api.get<DepartmentResponse[]>('/api/v1/departments');
    return response.data;
};