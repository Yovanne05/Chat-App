import User from "../models/User";
import { IUser } from "../models/User";

export const getAllFriendsById = async (id: string): Promise<IUser[] | null> => {
    try {
        const user = await User.findById(id).populate("friends");
        if (!user) return null;
        return user.friends as IUser[];
    } catch (error) {
        console.error("Erreur lors de la récupération des amis :", error);
        return null;
    }
};

export const addFriend = async (idUser: string, idNewFriend: string): Promise<void> => {
    try {
        const user = await User.findById(idUser);
        const newFriend = await User.findById(idNewFriend);

        if (!user || !newFriend) {
            throw new Error("Utilisateur ou ami introuvable");
        }

        if (!user.friends.includes(newFriend._id)) {
            user.friends.push(newFriend._id);
            await user.save();
        }

        if (!newFriend.friends.includes(user._id)) {
            newFriend.friends.push(user._id);
            await newFriend.save();
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout d'un ami :", error);
        throw new Error("Erreur lors de l'ajout de l'ami");
    }
};
