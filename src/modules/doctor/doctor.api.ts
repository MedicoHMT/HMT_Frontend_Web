import http from "../../services/http";

export const getDoctors = () => {
  return http.get("/api/v1/doctors");
};
