import instance from "@/config/axios";

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

export const login = async (data: LoginData): Promise<string> => {
  try {
    const response = await instance.post("/auth/login", data);
    return response.data.data.access_token;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const logout = async (): Promise<void> => {
  try {
    await instance.post("/auth/logout");
  } catch (error) {
    return Promise.reject(error);
  }
};

export const loginWithProvider = async (
  provider: string
): Promise<AuthResponse> => {
  try {
    const response = await instance.get(`/auth/provider/${provider}`);
    console.log(response);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const registerUser = async (data: RegisterData): Promise<void> => {
  try {
    const response = await instance.post("/auth/register", data);
    console.log(response);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const refreshToken = async (): Promise<string> => {
  try {
    const response = await instance.get("/auth/refresh-token");
    console.log("Response", response);
    return response.data.data.access_token;
  } catch (error) {
    console.error("Error refreshing token", error.response);
    return Promise.reject(error);
  }
};

const AuthService = {
  login,
  logout,
  loginWithProvider,
  registerUser,
  refreshToken,
};

export default AuthService;
