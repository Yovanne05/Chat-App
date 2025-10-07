import { useState, useCallback } from "react";
import { MessageDTO } from "@/dto/message.dto";
import { MessageService } from "@/services/message.service";

export const useMessages = (userId: string | null, friendId: string) => {
    const [messages, setMessages] = useState<MessageDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadMessages = useCallback(async () => {
        if (!userId) return;

        try {
            setIsLoading(true);
            setError(null);
            const conversationMessages = await MessageService.getConversation(userId, friendId);
            setMessages(conversationMessages);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            console.error("Error loading messages:", err);
        } finally {
            setIsLoading(false);
        }
    }, [userId, friendId]);

    const addMessage = useCallback((message: MessageDTO) => {
        setMessages(prev => [...prev, message]);
    }, []);

    return {
        messages,
        isLoading,
        error,
        loadMessages,
        addMessage,
    };
};