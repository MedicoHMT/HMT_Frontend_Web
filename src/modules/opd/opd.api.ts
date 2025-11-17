import http from "../../services/http";


export const getAllVisits = () => {
  return http.get("/api/v1/opd/visits");
};

export const getVisitById = (id: string) => {
  return http.get(`/api/v1/opd/visits/${id}`);
};

export const getVitals = (id: string) => {
  return http.get(`/api/v1/opd/vitals/${id}`);
};

export const getAssessment = (id: string) => {
  return http.get(`/api/v1/opd/assessment/${id}`);
};

export const createVisit = (data: any) => {
  return http.post("/api/v1/opd/visits", data);
};

export const saveVitals = (data: any) => {
  return http.post("/api/v1/opd/vitals", data);
};

export const saveAssessment = (data: any) => {
  return http.post("/api/v1/opd/assessment", data);
};

export const updateVisitStatus = (visitId: string, status: string) => {
  return http.put(`/api/v1/opd/visits/${visitId}/status`, { status });
};
