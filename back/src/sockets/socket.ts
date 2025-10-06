import { Server as SocketIOServer } from "socket.io";
import { Server as HttpServer } from "http";
import {MessageService} from "../services/MessageService";
import {toMessageDTO} from "../dto/message.dto";

const messageService = new MessageService();

export const setupWebSocket = (server: HttpServer) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: process.env.FRONTEND_URL || "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {

        socket.on("join_conversation", (data: { userId: string; friendId: string }) => {
            const roomId = [data.userId, data.friendId].sort().join("-");
            socket.join(roomId);
        });

        socket.on("leave_conversation", (data: { userId: string; friendId: string }) => {
            const roomId = [data.userId, data.friendId].sort().join("-");
            socket.leave(roomId);
        });

        socket.on("send_message", async (data: {
            senderId: string;
            receiverId: string;
            message: string;
        }) => {
            try {
                const messageDTO = await messageService.sendMessage(
                    data.senderId,
                    data.receiverId,
                    data.message
                );

                const roomId = [data.senderId, data.receiverId].sort().join("-");

                io.to(roomId).emit("receive_message", messageDTO);
                socket.emit("message_sent", messageDTO);

            } catch (error) {
                socket.emit("message_error", { error: "Erreur lors de l'envoi du message" });
            }
        });
    });

    return io;
};

export type WebSocket = typeof SocketIOServer;