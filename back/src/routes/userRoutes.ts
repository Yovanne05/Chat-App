import express, { Request, Response } from "express";
import User from "../models/User";
const router = express.Router();
import {addFriend, getAllFriendsById} from "../services/userService";

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
        res.status(200).json(users);
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

// Récupérer tous les amis d'un utilisateur
router.get("/:id/friends", async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
        const friends = await getAllFriendsById(userId);
        if (!friends) {
            res.status(404).json({ error: "Utilisateur non trouvé" });
        }
        res.status(200).json(friends);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Ajouter un ami à un utilisateur
router.post("/:idUser/friends/:idNewFriend", async (req: Request, res: Response) => {
    const { idUser, idNewFriend } = req.params;
    try {
        await addFriend(idUser, idNewFriend);
        res.status(200).json({ message: "Ami ajouté avec succès" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
