import { useEffect, useState } from 'react';
import { UserModel } from '@/models/user.model';
import {getAuthToken, removeAuthToken} from "@/utils/auth";
import {getCurrentUser} from "@/services/userService";

export const useUserData = () => {
    const [user, setUser] = useState<UserModel | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = getAuthToken();
        if (!token) {
            setIsLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const currentUser = await getCurrentUser();
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
