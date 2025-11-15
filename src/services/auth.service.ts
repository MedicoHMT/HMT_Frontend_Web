import http from "./http";

export interface LoginPayload {
  username: string;
  password: string;
}

export const authService = {
  login(data: LoginPayload) {
    return http.post("/api/auth/login", data);
  },
   logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("hospitalId");
  },
};
