import type { Role } from "../../../config/constants";

export interface CreateUserRequest {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number | string; 
  role: Role;
}