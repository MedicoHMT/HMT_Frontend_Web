import type { DepartmentResponse } from "../departments/department.type";

export interface CreateDoctorRequest {
  username: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string; 
  consultation_fee: number;
  department_id: number;
  specialization: string;
}


export interface DoctorResponse {
  doctorId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  consultationFee: number;
  specialization: number;
  department: DepartmentResponse;
}