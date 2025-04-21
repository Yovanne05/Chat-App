import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/services/authService';
import { User } from '@/types/user';
import {getAuthToken, removeAuthToken} from "@/utils/auth";

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = getAuthToken();
        if (!token) {
            setIsLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const currentUser = await getCurrentUser(token);
                setUser(currentUser);
            } catch {
                removeAuthToken();
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, isLoading };
};
