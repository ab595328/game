import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/wallet"
});

// 🔐 Token auto add
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getWalletApi = () => API.get("/");
export const addCashApi = (amount) =>
  API.post("/add-cash", { amount });

export const addMoneyOfferApi = () =>
  API.post("/add-money-offer");

export const walletHistoryApi = () =>
  API.get("/history");

export const walletHistoryAllApi = () =>
  API.get("/history/all");
