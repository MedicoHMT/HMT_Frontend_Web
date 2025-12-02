import api from "../../core/api/api";

export const getDoctors = () => {
  return api.get("/api/v1/doctors");
};
export const getDoctorById = (id: number) => {
  return api.get(`/api/v1/doctors/${id}`);
};