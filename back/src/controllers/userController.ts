import { Request, Response } from "express";
import User from "../models/User";
import { addFriend, getAllFriendsById } from "../services/UserService";

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteAllUsers = async (req: Request, res: Response) => {
    try {
        await User.deleteMany({});
        res.json({ message: "Tous les utilisateurs ont été supprimés" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getFriends = async (req: Request, res: Response) => {
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
};

export const addFriendToUser = async (req: Request, res: Response) => {
    const { idUser, idNewFriend } = req.params;
    try {
        await addFriend(idUser, idNewFriend);
        res.status(200).json({ message: "Ami ajouté avec succès" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
