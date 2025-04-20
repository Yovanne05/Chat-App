import express, { Request, Response } from "express";
import User from "../models/User";
const router = express.Router();

// Créer un utilisateur
router.post("/", async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// Récupérer tous les utilisateurs
router.get("/", async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Supprimer tous les utilisateurs
router.delete("/", async (req: Request, res: Response) => {
    try {
        await User.deleteMany({});
        res.json({ message: "Tous les utilisateurs ont été supprimés" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
