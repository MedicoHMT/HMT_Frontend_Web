import type { Role } from "../../../config/constants";

export interface CreateUserRequest {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number | string; 
  role: Role;
}

export interface CreateDoctorRequest {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number | string; 
  consultation_fee: number;
  department_id: number;
  specialization: string;
}

export interface CreateDepartmentRequest {
  code: string;
  name: string;
  description: string | null;
}