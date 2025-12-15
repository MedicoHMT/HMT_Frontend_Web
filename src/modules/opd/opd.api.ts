import api from "../../core/api/api";
import type { CreateOPDVisitRequest, OPDDetailedVisitResponse, OPDVisitResponse } from "./opd.types";


export const createVisit = (data: CreateOPDVisitRequest) => {
  return api.post<OPDVisitResponse>("/api/v1/opd/visits", data);
};

export const getAllVisits = () => {
  return api.get<OPDVisitResponse[]>("/api/v1/opd/visits");
};

export const getVisitById = (opdId: string) => {
  return api.get<OPDVisitResponse>(`/api/v1/opd/visits/${opdId}`);
};

export const getDetailedVisitById = (opdId: string) => {
  return api.get<OPDDetailedVisitResponse>(`/api/v1/opd/visits/detail/${opdId}`);
};


export const getVitals = (id: string) => {
  return api.get(`/api/v1/opd/vitals/${id}`);
};

export const getAssessment = (id: string) => {
  return api.get(`/api/v1/opd/assessment/${id}`);
};

export const getDiagnosis = (id: string) => {
  return api.get(`/api/v1/opd/diagnosis/${id}`);
}

export const getInvestigations = (id: string) => {
  return api.get(`/api/v1/opd/investigations/${id}`);
}


export const saveVitals = (data: any) => {
  return api.post("/api/v1/opd/vitals", data);
};

export const saveAssessment = (data: any) => {
  return api.post("/api/v1/opd/assessment", data);
};

export const saveDiagnosis = (data: any) => {
  return api.post("/api/v1/opd/diagnosis", data);
}

export const saveInvestigations = (data: any) => {
  return api.post("/api/v1/opd/investigations", data);
}

export const updateVisitStatus = (visitId: string, status: string) => {
  return api.put(`/api/v1/opd/visits/${visitId}/status`, { status });
};
