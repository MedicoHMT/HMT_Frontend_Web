import api from "../../core/api/api";
import type { DepartmentResponse } from "./department.type";



export const getDepartments = async (): Promise<DepartmentResponse[]> => {
    const response = await api.get<DepartmentResponse[]>('/api/v1/departments');
    return response.data;
};