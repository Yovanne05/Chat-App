import { Request, Response } from "express";
import Message from "../models/Message";

export const createMessage = async (req: Request, res: Response) => {
    try {
        const message = await Message.create(req.body);
        res.status(201).json(message);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const getAllMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteAllMessages = async (req: Request, res: Response) => {
    try {
        await Message.deleteMany({});
        res.json({ message: "Tous les messages ont été supprimés" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
