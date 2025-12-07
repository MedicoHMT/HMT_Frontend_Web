import type { Role } from "../../../config/constants";


export interface UserPayload {
  sub: string;
  role: Role;
  permissions?: string[];
  hospitalId?: string | null;
  hospitalName?: string | null;
  exp?: number;
  iat?: number;
}

export interface CurrentUser {
  username: string;
  role: Role;
  permissions: string[];
  hospitalName?: string | null;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number | string; 
  role: Role;
}

