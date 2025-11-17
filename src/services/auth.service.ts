import type { AxiosResponse } from "axios";
import http from "./http";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: string;
  hospitalName: string;
}

export const authService = {
  login(data: LoginPayload): Promise<AxiosResponse<LoginResponse>> {
    return http.post("/api/auth/login", data);
  },
   logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("hospitalName");
  },
};
