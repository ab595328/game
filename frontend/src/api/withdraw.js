import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/withdraw"
});

// Token attach
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const withdrawApi = (data) => API.post("/", data);
export const withdrawHistoryApi = () =>
  API.get("/history");

