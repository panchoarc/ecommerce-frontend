import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AuthService from "@/features/auth/services/AuthService";

let isRefreshing = false;
let refreshFailedOnce = false;

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_API_URL}/api`,
  withCredentials: true,
  headers: {
    "Allow-Control-Allow-Origin": `${import.meta.env.VITE_BACKEND_API_URL}`,
  },
});

const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return exp < Date.now() / 1000;
  } catch {
    return true;
  }
};

const redirectToLogin = () => {
  localStorage.removeItem("access_token");
  window.location.href = "/login";
};

const addAuthorizationHeader = (config: any, token: string) => {
  config.headers = config.headers ?? {};
  config.headers.Authorization = `Bearer ${token}`;
};

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      return config;
    }

    if (!isTokenExpired(token)) {
      addAuthorizationHeader(config, token);
      return config;
    }

    if (isRefreshing || refreshFailedOnce) {
      return config;
    }
    isRefreshing = true;

    try {
      const newToken = await AuthService.refreshToken();
      localStorage.setItem("access_token", newToken);
      addAuthorizationHeader(config, newToken);
    } catch (error) {
      console.error(error);
      refreshFailedOnce = true;
      redirectToLogin();
    } finally {
      isRefreshing = false;
    }

    return config;
  },
  (error) => Promise.reject(new Error(error))
);

export default instance;
