"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { LoginData } from "@/types/auth";
import type { UserModel } from "@/models/user.model";
import * as authService from "@/services/auth.service";

interface AuthContextType {
  user: UserModel | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifie le token au premier rendu
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await authService.getMe();
        setUser(currentUser);
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ✅ Ici la correction principale
  const login = async (data: LoginData) => {
    try {
      await authService.login(data); // enregistre le token
      const currentUser = await authService.getMe(); // récupère les infos de l'utilisateur
      setUser(currentUser); // met à jour immédiatement le contexte
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
