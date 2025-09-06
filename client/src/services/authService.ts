import { LoginData, RegisterData } from "@/types/auth";
import type {UserModel} from "@/models/user.model"

export const login = async (data: LoginData): Promise<UserModel> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Échec de la connexion');
    }

    return response.json();
};

export const register = async (data: RegisterData): Promise<UserModel> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Échec de l\'inscription');
    }

    return response.json();
};

export const logout = async (): Promise<void> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Échec de la déconnexion');
    }
};