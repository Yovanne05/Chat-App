"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const [isConnectedState, setIsConnectedState] = useState(false);

  useEffect(() => {
    if (!userId) {
      socketRef.current?.disconnect();
      socketRef.current = null;
      isConnectedRef.current = false;
      setIsConnectedState(false);
      return;
    }

    if (socketRef.current?.connected) {
      return;
    }

    const socket = io(
      process.env.NEXT_PUBLIC_WS_URL || "http://localhost:5000",
      {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      },
    );

    socketRef.current = socket;

    socket.on("connect", () => {
      isConnectedRef.current = true;
      setIsConnectedState(true);
    });

    socket.on("disconnect", () => {
      isConnectedRef.current = false;
      setIsConnectedState(false);
    });

    return () => {
      socket.disconnect();
      if (socketRef.current === socket) {
        socketRef.current = null;
      }
      isConnectedRef.current = false;
      setIsConnectedState(false);
    };
  }, [userId]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !isConnectedRef.current) {
      return;
    }

    const handler = (message: MessageDTO) => {
      onMessageReceived(message);
    };

    socket.on("receive_message", handler);
    return () => {
      socket.off("receive_message", handler);
    };
  }, [onMessageReceived, isConnectedState]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !onError || !isConnectedRef.current) {
      return;
    }

    const handler = (data: { error: string }) => {
      onError(data.error);
    };

    socket.on("message_error", handler);
    return () => {
      socket.off("message_error", handler);
    };
  }, [onError, isConnectedState]);

  const joinConversation = useCallback(
    (friendId: string) => {
      if (socketRef.current?.connected && userId) {
        socketRef.current.emit("join_conversation", { userId, friendId });
      } else {
        console.warn("Socket non connecte lors de joinConversation");
      }
    },
    [userId],
  );

  const leaveConversation = useCallback(
    (friendId: string) => {
      if (socketRef.current?.connected && userId) {
        socketRef.current.emit("leave_conversation", { userId, friendId });
      }
    },
    [userId],
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
        console.error("Impossible d'envoyer le message: socket non connecte");
      }
    },
    [userId],
  );

  return {
    joinConversation,
    leaveConversation,
    sendMessage,
    isConnected: isConnectedState,
  };
};
