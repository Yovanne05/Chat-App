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

    // Gestion des connexions
    io.on("connection", (socket) => {

        // Rejoindre une room pour les conversations privées
        socket.on("join_conversation", (data: { userId: string; friendId: string }) => {
            const roomId = [data.userId, data.friendId].sort().join("-");
            socket.join(roomId);
        });

        // Quitter une conversation
        socket.on("leave_conversation", (data: { userId: string; friendId: string }) => {
            const roomId = [data.userId, data.friendId].sort().join("-");
            socket.leave(roomId);
        });

        // Envoi de message en temps réel
        socket.on("send_message", async (data: {
            senderId: string;
            receiverId: string;
            message: string;
        }) => {
            try {
                // Sauvegarder le message en base
                const newMessage = await messageService.sendMessage(
                    data.senderId,
                    data.receiverId,
                    data.message
                );

                const messageDTO = toMessageDTO(newMessage);

                // Créer l'ID de room pour cette conversation
                const roomId = [data.senderId, data.receiverId].sort().join("-");

                // Diffuser le message à tous les utilisateurs dans la room
                io.to(roomId).emit("receive_message", messageDTO);

                // Notifier également l'expéditeur pour confirmation
                socket.emit("message_sent", messageDTO);

            } catch (error) {
                socket.emit("message_error", { error: "Erreur lors de l'envoi du message" });
            }
        });
    });

    return io;
};

export type WebSocket = typeof SocketIOServer;