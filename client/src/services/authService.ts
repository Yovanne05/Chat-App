import { LoginData, RegisterData } from "@/types/auth";
import type { UserModel } from "@/models/user.model";
import { apiClient } from "./apiClient";

interface AuthResponse {
  user: UserModel;
  token: string;
}

export const login = async (data: LoginData): Promise<UserModel> => {
  const result = await apiClient.post<AuthResponse>("/auth/login", data);
  localStorage.setItem("token", result.token);
  return result.user;
};

export const register = async (data: RegisterData): Promise<UserModel> => {
  const result = await apiClient.post<AuthResponse>("/auth/register", data);
  localStorage.setItem("token", result.token);
  return result.user;
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem("token");
};

export const getMe = async (): Promise<UserModel> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token manquant");
  return apiClient.get<UserModel>("/auth/me");
};
