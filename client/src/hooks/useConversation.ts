import { useState, useEffect } from "react";
import { UserService } from "@/services/userService";
import { UserModel } from "@/models/user.model";

export const useConversation = (friendId: string) => {
    const [friend, setFriend] = useState<UserModel | null>(null);
    const [currentUser, setCurrentUser] = useState<UserModel | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadConversationData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const [user, { users }] = await Promise.all([
                    UserService.findCurrentUser(),
                    UserService.findMany()
                ]);

                setCurrentUser(user);

                const foundFriend = users.find(user => user.id === friendId);
                if (!foundFriend) {
                    setError("Friend not found");
                } else {
                    setFriend(foundFriend);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
                console.error("Error loading conversation data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadConversationData();
    }, [friendId]);

    return {
        friend,
        currentUser,
        isLoading,
        error
    };
};