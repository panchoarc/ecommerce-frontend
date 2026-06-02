import instance from "@/config/axios";
import publicInstance from "@/config/axiosPublicInstance";
import { UserManager } from "oidc-client-ts";
import { oidcConfig } from "../config/OidcConfig";

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

const userManager = new UserManager(oidcConfig);

let refreshPromise: Promise<any> | null = null;

export const login = async (data: LoginData): Promise<string> => {
  try {
    const response = await publicInstance.post("/auth/login", data, {
      withCredentials: true,
    });
    return response.data.data.access_token;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const logout = async (): Promise<void> => {
  try {
    await publicInstance.post("/auth/logout");
  } catch (error) {
    return Promise.reject(error);
  }
};

export const loginWithProvider = async (
  provider: string,
): Promise<AuthResponse> => {
  try {
    const response = await publicInstance.get(`/auth/provider/${provider}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const registerUser = async (data: RegisterData): Promise<void> => {
  console.log("USER DATA:", data);
  try {
    const response = await instance.post("/auth/register", data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAuthStatus = async (): Promise<string> => {
  try {
    const response = await instance.get("/auth/status");
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const getValidUser = async () => {
  let user = await userManager.getUser();

  if (!user) return null;

  if (!user.expired) return user;

  // evita múltiples refresh simultáneos
  refreshPromise ??= userManager.signinSilent().finally(() => {
    refreshPromise = null;
  });

  try {
    user = await refreshPromise;
  } catch (error) {
    console.error(error);
    await userManager.signoutRedirect();
    return null;
  }
  return user;
};

const AuthService = {
  login,
  logout,
  loginWithProvider,
  registerUser,
  getAuthStatus,
  getValidUser,
};

export default AuthService;
