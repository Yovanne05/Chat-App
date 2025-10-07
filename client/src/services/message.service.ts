import { MessageDTO } from "@/dto/message.dto";
import { api } from "@/services/api";

export class MessageService {
  public static async getConversation(
    userId: string,
    friendId: string
  ): Promise<MessageDTO[]> {
    return api.get<MessageDTO[]>(
      `/messages/conversation/${userId}/${friendId}`
    );
  }

  public static async sendMessage(
    receiverId: string,
    content: string
  ): Promise<void> {
    return api.post(`/messages`, {
      receiverId,
      content,
    });
  }
}
