export interface DepartmentRequest {
    code: string;
    name: string;
    description: string;
}

export interface DepartmentResponse {
    department_id: number;
    code: string;
    name: string;
    description: string;
}