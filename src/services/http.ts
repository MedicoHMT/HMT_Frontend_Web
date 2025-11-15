import axios from "axios";
import { API_BASE_URL } from "../config/constants";

const http = axios.create({
  baseURL: API_BASE_URL,
});

// Attach token automatically
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;
