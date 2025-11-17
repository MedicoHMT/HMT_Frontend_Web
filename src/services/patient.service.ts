import http from "./http";

export const patientService = {
  getAll() {
    return http.get("/api/v1/patients");
  },

  getById(id: number) {
    return http.get(`/api/v1/patients/${id}`);
  },

  create(data: any) {
    return http.post("/api/v1/patients", data);
  },

  update(id: number, data: any) {
    return http.put(`/api/v1/patients/${id}`, data);
  },

  delete(id: string) {
    return http.delete(`/api/v1/patients/${id}`);
  }
};
