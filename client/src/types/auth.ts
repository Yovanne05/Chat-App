import {User} from "@/types/user";

export interface AuthResponse {
    user: User;
    token: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    username: string;
    pseudo: string;
    email: string;
    password: string;
}
