import express, { Request, Response } from "express";
import Message from "../models/Message";
const router = express.Router();

// Créer un message
router.post("/", async (req: Request, res: Response) => {
    try {
        const message = await Message.create(req.body);
        res.status(201).json(message);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// Récupérer tous les messages
router.get("/", async (req: Request, res: Response) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Supprimer tous les messages
router.delete("/", async (req: Request, res: Response) => {
    try {
        await Message.deleteMany({});
        res.json({ message: "Tous les messages ont été supprimés" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
