import {IUser} from "../models/user.model";
import mongoose from "mongoose";

export type UserDTO = {
    id: string;
    pseudo: string;
    username: string;
    email: string;
    friends: string[];
    createdAt: Date;
    updatedAt: Date;
}

export const toUserDTO = (user: IUser): UserDTO => {
    return {
        id: (user._id as mongoose.Types.ObjectId).toString(),
        pseudo: user.pseudo,
        username: user.username,
        email: user.email,
        friends: user.friends.map(f => f.toString()),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}