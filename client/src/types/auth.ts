import {UserModel} from "@/models/user.model";

export interface AuthResponse {
    user: UserModel;
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
