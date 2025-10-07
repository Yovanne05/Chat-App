import { LoginData, RegisterData } from "@/types/auth";
import type { UserModel } from "@/models/user.model";
import { api } from "./api";

interface AuthResponse {
  user: UserModel;
  token: string;
}

export const login = async (data: LoginData): Promise<UserModel> => {
  const result = await api.post<AuthResponse>("/auth/login", data);
  localStorage.setItem("token", result.token);
  return result.user;
};

export const register = async (data: RegisterData): Promise<UserModel> => {
  const result = await api.post<AuthResponse>("/auth/register", data);
  localStorage.setItem("token", result.token);
  return result.user;
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem("token");
};

export const getMe = async (): Promise<UserModel> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token manquant");
  return api.get<UserModel>("/auth/me");
};
