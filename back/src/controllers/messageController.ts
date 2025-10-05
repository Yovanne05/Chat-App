import { Request, Response } from "express";
import { MessageService } from "../services/MessageService";
import { toMessageDTO } from "../dto/message.dto";

const messageService = new MessageService();

export const createMessage = async (req: Request, res: Response): Promise<void> => {
    const { senderId, receiverId, message } = req.body;
    const newMessage = await messageService.sendMessage(senderId, receiverId, message);
    res.status(201).json(toMessageDTO(newMessage));
};

export const getMessageById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const message = await messageService.getMessageById(id);
    res.status(200).json(toMessageDTO(message));
};

export const getConversation = async (req: Request, res: Response): Promise<void> => {
    const { user1, user2 } = req.params;
    const messages = await messageService.getConversation(user1, user2);
    res.status(200).json(messages.map(toMessageDTO));
};

export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const deleted = await messageService.deleteMessage(id);
    res.status(200).json("");
};
