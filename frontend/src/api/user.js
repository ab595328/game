import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/user"
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getMeApi = () => API.get("/me");
export const updateProfileApi = (data) => API.put("/update", data);
