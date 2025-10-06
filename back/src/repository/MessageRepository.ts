import { MessageNotFoundException } from "../exceptions/message.exception";
import MessageModel, { IMessage } from "../models/Message";
import { FilterQuery, SortOrder } from "mongoose";

export interface MessageSearchParams {
  senderId?: string;
  receiverId?: string;
  text?: string;
  ids?: string[];

  sortBy?: "createdAt" | "updatedAt";
  sortDir?: "asc" | "desc";

  limit?: number;
  offset?: number;
}

export class MessageRepository {
  static async create(messageData: Partial<IMessage>): Promise<IMessage> {
    const message = new MessageModel(messageData);
    return await message.save();
  }

  static async findById(id: string): Promise<IMessage> {
    const message = await MessageModel.findById(id).exec();
    if (!message) {
      throw new MessageNotFoundException(id);
    }
    return message;
  }

  static async findConversation(
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

  static async findMany(
    params: Partial<MessageSearchParams> = {}
  ): Promise<{ messages: IMessage[]; total: number }> {
    const {
      senderId,
      receiverId,
      text,
      ids,
      sortBy = "createdAt",
      sortDir = "desc",
      limit = 20,
      offset = 0,
    } = params;

    const filter: FilterQuery<IMessage> = {};

    if (ids && ids.length > 0) {
      filter._id = { $in: ids };
    }

    if (senderId) {
      filter.sender = senderId;
    }

    if (receiverId) {
      filter.receiver = receiverId;
    }

    if (text) {
      filter.message = { $regex: text, $options: "i" };
    }

    const sort: Record<string, SortOrder> = {
      [sortBy]: sortDir === "desc" ? -1 : 1,
    };

    const [messages, total] = await Promise.all([
      MessageModel.find(filter).sort(sort).skip(offset).limit(limit),
      MessageModel.countDocuments(filter),
    ]);

    return { messages, total };
  }

  static async deleteById(id: string): Promise<IMessage> {
    const deleted = await MessageModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new MessageNotFoundException(id);
    }
    return deleted;
  }
}
