import { useState } from 'react';
import { AuthResponse } from "@/types/auth";
import { login } from "@/services/authService";
import {UserModel} from "@/models/user.model";

interface UseLoginFormProps {
    onSuccess: (data: UserModel) => void;
    onError?: (error: Error) => void;
}

export const useLoginForm = ({ onSuccess, onError }: UseLoginFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await login({ email, password });
            onSuccess(response);
        } catch (error) {
            onError?.(error as Error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email,
        password,
        isLoading,
        setEmail,
        setPassword,
        handleSubmit,
    };
};
