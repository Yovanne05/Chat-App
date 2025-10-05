import { Request, Response } from "express";
import { MessageService } from "../services/MessageService";
import { toMessageDTO } from "../dto/message.dto";

const messageService = new MessageService();

export const createMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { senderId, receiverId, message } = req.body;

        if (!senderId || !receiverId || !message) {
            res.status(400).json({ error: "senderId, receiverId et message sont requis" });
            return;
        }

        const newMessage = await messageService.sendMessage(senderId, receiverId, message);
        res.status(201).json(toMessageDTO(newMessage));
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getMessageById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const message = await messageService.getMessageById(id);

        if (!message) {
            res.status(404).json("");
            return;
        }

        res.status(200).json(toMessageDTO(message));
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getConversation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user1, user2 } = req.params;

        if (!user1 || !user2) {
            res.status(400).json({ error: "user1 et user2 sont requis" });
            return;
        }

        const messages = await messageService.getConversation(user1, user2);
        res.status(200).json(messages.map(toMessageDTO));
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deleted = await messageService.deleteMessage(id);

        if (!deleted) {
            res.status(404).json({ error: "Message non trouvé" });
            return;
        }

        res.status(200).json("");
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
