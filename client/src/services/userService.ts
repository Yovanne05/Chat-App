import {User} from "@/types/user";

export const getUsers = async (): Promise<User[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
};

export const getFriendsById = async (userId: string): Promise<User[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/friends`);
    if (!response.ok) {
        throw new Error('Failed to fetch friends');
    }
    return response.json();
};
