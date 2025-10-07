import { Request, Response } from "express";
import { MessageService } from "../services/message.service";

const messageService = new MessageService();

export const create = async (req: Request, res: Response): Promise<void> => {
  const { senderId, receiverId, message } = req.body;
  const newMessage = await messageService.sendMessage(senderId, receiverId, message);
  res.status(201).json(newMessage);
};

export const findOne = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const message = await messageService.getMessageById(id);
  res.status(200).json(message);
};

export const findConversation = async (req: Request, res: Response): Promise<void> => {
  const { user1, user2 } = req.params;
  const messages = await messageService.getConversation(user1, user2);
  res.status(200).json(messages);
};

export const findMany = async (req: Request, res: Response): Promise<void> => {
  const params = {
    senderId: req.query.senderId as string,
    receiverId: req.query.receiverId as string,
    text: req.query.text as string,
    sortBy: req.query.sortBy as "createdAt" | "updatedAt",
    sortDir: req.query.sortDir as "asc" | "desc",
    limit: req.query.limit ? parseInt(req.query.limit as string, 10) : undefined,
    offset: req.query.offset ? parseInt(req.query.offset as string, 10) : undefined,
  };

  const { messages, total } = await messageService.findMany(params);
  res.status(200).json({ messages, total });
};

export const deleteOneMessage = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  await messageService.deleteMessage(id);
  res.status(200).json("");
};
