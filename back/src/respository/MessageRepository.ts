import { MessageNotFoundException } from "../exceptions/message.exception";
import MessageModel, { IMessage } from "../models/Message";


export class MessageRepository {
  async create(messageData: Partial<IMessage>): Promise<IMessage> {
    const message = new MessageModel(messageData);
    return await message.save();
  }

  async findById(id: string): Promise<IMessage> {
    const message = await MessageModel.findById(id).exec();
    if (!message) {
      throw new MessageNotFoundException(id);
    }
    return message;
  }

  async findConversation(
    userId1: string,
    userId2: string
  ): Promise<IMessage[]> {
    const conversation = await MessageModel.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 },
      ],
    })
      .sort({ createdAt: 1 })
      .exec();

    if (!conversation || conversation.length === 0) {
      throw new MessageNotFoundException(`${userId1}-${userId2}`);
    }

    return conversation;
  }

  async deleteById(id: string): Promise<IMessage> {
    const deleted = await MessageModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new MessageNotFoundException(id);
    }
    return deleted;
  }
}
