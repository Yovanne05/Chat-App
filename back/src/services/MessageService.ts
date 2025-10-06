import {
  MessageRepository,
  MessageSearchParams,
} from "../repository/MessageRepository";
import mongoose from "mongoose";
import { toMessageDTO, MessageDTO } from "../dto/message.dto";

export class MessageService {
  async findMany(
    params: Partial<MessageSearchParams> = {}
  ): Promise<{ messages: MessageDTO[]; total: number }> {
    const { messages, total } = await MessageRepository.findMany(params);
    const messagesDto = messages.map(toMessageDTO);
    return { messages: messagesDto, total };
  }

  async sendMessage(
    senderId: string,
    receiverId: string,
    message: string
  ): Promise<MessageDTO> {
    const msg = await MessageRepository.create({
      sender: new mongoose.Types.ObjectId(senderId),
      receiver: new mongoose.Types.ObjectId(receiverId),
      message,
    });
    return toMessageDTO(msg);
  }

  async getMessageById(id: string): Promise<MessageDTO> {
    const msg = await MessageRepository.findById(id);
    return toMessageDTO(msg);
  }

  async getConversation(
    userId1: string,
    userId2: string
  ): Promise<MessageDTO[]> {
    const messages = await MessageRepository.findConversation(userId1, userId2);
    return messages.map(toMessageDTO);
  }

  async deleteMessage(id: string): Promise<boolean> {
    const deleted = await MessageRepository.deleteById(id);
    return !!deleted;
  }
}
