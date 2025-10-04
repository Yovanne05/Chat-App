"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WS_URL || "http://localhost:5000", {
      transports: ["websocket"],
    });
    socketRef.current = socket;

    socket.on("connect", () => console.log("✅ WebSocket connecté:", socket.id));
    socket.on("disconnect", () => console.log("❌ WebSocket déconnecté"));

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
