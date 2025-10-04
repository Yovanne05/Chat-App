"use client";
import { useEffect, useRef, useCallback } from "react";
import io, { Socket } from "socket.io-client";
import { MessageDTO } from "@/dto/message.dto";

interface UseWebSocketProps {
  userId: string | null;
  onMessageReceived: (message: MessageDTO) => void;
  onError?: (error: string) => void;
}

export const useWebSocket = ({
  userId,
  onMessageReceived,
  onError,
}: UseWebSocketProps) => {
  const socketRef = useRef<Socket | null>(null);
  const isConnectedRef = useRef(false);

  useEffect(() => {
    if (!userId) return;
    if (socketRef.current?.connected) return;

    socketRef.current = io(
      process.env.NEXT_PUBLIC_WS_URL || "http://localhost:5000",
      {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      }
    );

    socketRef.current.on("connect", () => {
      isConnectedRef.current = true;
    });

    socketRef.current.on("receive_message", onMessageReceived);

    socketRef.current.on("message_error", (data: { error: string }) => {
      onError?.(data.error);
    });

    socketRef.current.on("disconnect", () => {
      isConnectedRef.current = false;
    });

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
      isConnectedRef.current = false;
    };
  }, [userId]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.off("receive_message");
      socketRef.current.on("receive_message", onMessageReceived);
    }
  }, [onMessageReceived]);

  useEffect(() => {
    if (socketRef.current && onError) {
      socketRef.current.off("message_error");
      socketRef.current.on("message_error", (data: { error: string }) => {
        onError(data.error);
      });
    }
  }, [onError]);

  const joinConversation = useCallback(
    (friendId: string) => {
      if (socketRef.current?.connected && userId) {
        socketRef.current.emit("join_conversation", { userId, friendId });
      } else {
        console.warn("⚠️ Socket non connecté lors de joinConversation");
      }
    },
    [userId]
  );

  const leaveConversation = useCallback(
    (friendId: string) => {
      if (socketRef.current?.connected && userId) {
        socketRef.current.emit("leave_conversation", { userId, friendId });
      }
    },
    [userId]
  );

  const sendMessage = useCallback(
    (receiverId: string, message: string) => {
      if (socketRef.current?.connected && userId) {
        socketRef.current.emit("send_message", {
          senderId: userId,
          receiverId,
          message,
        });
      } else {
        console.error(
          "❌ Impossible d'envoyer le message: socket non connecté"
        );
      }
    },
    [userId]
  );

  return {
    joinConversation,
    leaveConversation,
    sendMessage,
    isConnected: socketRef.current?.connected || false,
  };
};
