"use client";
import { useEffect, useRef, useCallback } from "react";
import io, {Socket} from "socket.io-client";
import { MessageDTO } from "@/dto/message.dto";

interface UseWebSocketProps {
    userId: string | null;
    onMessageReceived: (message: MessageDTO) => void;
    onError?: (error: string) => void;
}

export const useWebSocket = ({ userId, onMessageReceived, onError }: UseWebSocketProps) => {
    const socketRef = useRef<Socket | null>(null);

    const connect = useCallback(() => {
        if (!userId) return;

        socketRef.current = io(process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3001", {
            transports: ["websocket"],
        });

        socketRef.current.on("connect", () => {
            console.log("Connecté au serveur WebSocket");
        });

        socketRef.current.on("receive_message", onMessageReceived);

        socketRef.current.on("message_error", (data: { error: string }) => {
            onError?.(data.error);
        });

        socketRef.current.on("disconnect", () => {
            console.log("Déconnecté du serveur WebSocket");
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, [userId, onMessageReceived, onError]);

    const joinConversation = useCallback((friendId: string) => {
        if (socketRef.current && userId) {
            socketRef.current.emit("join_conversation", { userId, friendId });
        }
    }, [userId]);

    const leaveConversation = useCallback((friendId: string) => {
        if (socketRef.current && userId) {
            socketRef.current.emit("leave_conversation", { userId, friendId });
        }
    }, [userId]);

    const sendMessage = useCallback((receiverId: string, message: string) => {
        if (socketRef.current && userId) {
            socketRef.current.emit("send_message", {
                senderId: userId,
                receiverId,
                message
            });
        }
    }, [userId]);

    useEffect(() => {
        const cleanup = connect();
        return cleanup;
    }, [connect]);

    return {
        joinConversation,
        leaveConversation,
        sendMessage,
        isConnected: socketRef.current?.connected || false
    };
};