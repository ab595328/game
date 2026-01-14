import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth"
});

export const signupApi = (data) => API.post("/signup", data);
export const loginApi = (data) => API.post("/login", data);
