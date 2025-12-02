import api from "../core/api/api";

export const patientService = {
  getAll() {
    return api.get("/api/v1/patients");
  },

  getById(id: number) {
    return api.get(`/api/v1/patients/${id}`);
  },

  create(data: any) {
    return api.post("/api/v1/patients", data);
  },

  update(id: number, data: any) {
    return api.put(`/api/v1/patients/${id}`, data);
  },

  delete(id: string) {
    return api.delete(`/api/v1/patients/${id}`);
  }
};
