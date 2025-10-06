import { MessageDTO } from "@/dto/message.dto";
import { apiClient } from "@/services/apiClient";

export class MessageService {
  public static async getConversation(
    userId: string,
    friendId: string
  ): Promise<MessageDTO[]> {
    return apiClient.get<MessageDTO[]>(
      `/messages/conversation/${userId}/${friendId}`
    );
  }

  public static async sendMessage(
    receiverId: string,
    content: string
  ): Promise<void> {
    return apiClient.post(`/messages`, {
      receiverId,
      content,
    });
  }
}
