import { useState } from 'react';
import { register } from "@/services/authService";
import {UserModel} from "@/models/user.model";

interface UseRegisterFormProps {
    onSuccess: (data: UserModel) => void;
    onError?: (error: Error) => void;
}

export const useRegisterForm = ({ onSuccess, onError }: UseRegisterFormProps) => {
    const [formData, setFormData] = useState({
        username: '',
        pseudo: '',
        email: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await register(formData);
            onSuccess(response);
        } catch (error) {
            onError?.(error as Error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        isLoading,
        handleChange,
        handleSubmit,
    };
};
