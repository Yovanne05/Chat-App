import { useState, useCallback } from "react";
import { MessageDTO } from "@/dto/message.dto";
import { MessageService } from "@/services/message.service";

type OptimisticMessageInput = Pick<MessageDTO, "sender" | "receiver" | "message">;

export const useMessages = (userId: string | null, friendId: string) => {
  const [messages, setMessages] = useState<MessageDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMessages = useCallback(async () => {
    if (!userId) return;

    try {
      setIsLoading(true);
      setError(null);
      const conversationMessages = await MessageService.getConversation(
        userId,
        friendId,
      );
      setMessages(conversationMessages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error loading messages:", err);
    } finally {
      setIsLoading(false);
    }
  }, [userId, friendId]);

  const addMessage = useCallback((message: MessageDTO) => {
    setMessages((prev) => {
      if (prev.some((m) => m.id === message.id)) {
        return prev;
      }

      const optimisticIndex = prev.findIndex(
        (m) =>
          m.id.startsWith("temp-") &&
          m.sender === message.sender &&
          m.receiver === message.receiver &&
          m.message === message.message,
      );

      if (optimisticIndex !== -1) {
        const next = [...prev];
        next[optimisticIndex] = message;
        return next;
      }

      return [...prev, message];
    });
  }, []);

  const addOptimisticMessage = useCallback(
    ({ sender, receiver, message }: OptimisticMessageInput) => {
      const now = new Date().toISOString();
      const optimisticMessage: MessageDTO = {
        id: `temp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        sender,
        receiver,
        message,
        createdAt: now,
        updatedAt: now,
      };

      setMessages((prev) => [...prev, optimisticMessage]);
      return optimisticMessage;
    },
    [],
  );

  return {
    messages,
    isLoading,
    error,
    loadMessages,
    addMessage,
    addOptimisticMessage,
  };
};
