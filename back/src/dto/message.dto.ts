import {IMessage} from "../models/Message";
import mongoose from "mongoose";

export type MessageDTO = {
    id: string;
    sender: string;
    receiver: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}

export const toMessageDTO = (message: IMessage): MessageDTO => {
    return {
        id: (message._id as mongoose.Types.ObjectId).toString(),
        sender: message.sender.toString(),
        receiver: message.receiver.toString(),
        message: message.message,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
    };
};