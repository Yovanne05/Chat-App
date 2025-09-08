import MessageModel, { IMessage } from "../models/Message";

export class MessageRepository {
    async create(messageData: Partial<IMessage>): Promise<IMessage> {
        const message = new MessageModel(messageData);
        return await message.save();
    }

    async findById(id: string): Promise<IMessage | null> {
        return await MessageModel.findById(id).exec();
    }

    async findConversation(userId1: string, userId2: string): Promise<IMessage[]> {
        return await MessageModel.find({
            $or: [
                { sender: userId1, receiver: userId2 },
                { sender: userId2, receiver: userId1 },
            ],
        })
            .sort({ createdAt: 1 })
            .exec();
    }

    async deleteById(id: string): Promise<IMessage | null> {
        return await MessageModel.findByIdAndDelete(id).exec();
    }
}
