import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface UseLoginFormProps {
    onError?: (error: Error) => void;
}

export const useLoginForm = ({ onError }: UseLoginFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await login({ email, password });
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
