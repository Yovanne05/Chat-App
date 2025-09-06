import { Request, Response } from "express";
import User from "../models/User";
import { UserService } from "../services/UserService";
import {toUserDTO} from "../dto/user.dto";

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        const userDTO = toUserDTO(user);
        res.status(201).json(userDTO);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        const usersDTO = users.map(toUserDTO);
        res.status(200).json(usersDTO);
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
        const friends = await UserService.getFriends(userId);
        if (!friends) {
            res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        if (!friends || friends.length === 0) {
            res.status(404).json({ error: "Aucun ami trouvé" });
        }else{
            const friendsDTO = friends.map(toUserDTO);
            res.status(200).json(friendsDTO);
        }
        res.status(500).json({ error: "Utilisateur non trouvé" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const addFriendToUser = async (req: Request, res: Response) => {
    const { idUser, idNewFriend } = req.params;
    try {
        await UserService.addFriend(idUser, idNewFriend);
        res.status(200).json({ message: "Ami ajouté avec succès" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
