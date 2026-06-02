import axios from "axios";
import AuthService from "@/features/auth/services/AuthService";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
});

api.interceptors.request.use(async (config) => {
  const user = await AuthService.getValidUser();

  if (user?.access_token) {
    config.headers.Authorization = `Bearer ${user.access_token}`;
  }

  return config;
});

export default api;
