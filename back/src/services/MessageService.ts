import { MessageRepository } from "../respository/MessageRepository";
import mongoose from "mongoose";
import { IMessage } from "../models/Message";

export class MessageService {
    private messageRepository: MessageRepository;

    constructor() {
        this.messageRepository = new MessageRepository();
    }

    async sendMessage(senderId: string, receiverId: string, message: string): Promise<IMessage> {
        return await this.messageRepository.create({
            sender: new mongoose.Types.ObjectId(senderId),
            receiver: new mongoose.Types.ObjectId(receiverId),
            message,
        });
    }

    async getMessageById(id: string): Promise<IMessage | null> {
        return await this.messageRepository.findById(id);
    }

    async getConversation(userId1: string, userId2: string): Promise<IMessage[]> {
        return await this.messageRepository.findConversation(userId1, userId2);
    }

    async deleteMessage(id: string): Promise<IMessage | null> {
        return await this.messageRepository.deleteById(id);
    }
}
