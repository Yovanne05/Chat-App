import { FriendRequestDTO } from "@/dto/friend-request.dto";
import { toFriendRequestModel } from "@/mappers/friend-request.mappers";
import { FriendRequestModel } from "@/models/friend-request.model";
import { api } from "@/services/api";

type FriendRequestListDTO = {
  incoming: FriendRequestDTO[];
  outgoing: FriendRequestDTO[];
};

export type FriendshipStatusModel =
  | { status: "friends" }
  | { status: "none" }
  | { status: "incoming" | "outgoing"; request: FriendRequestModel };

export class FriendRequestService {
  static async send(
    requesterId: string,
    recipientId: string
  ): Promise<FriendRequestModel> {
    const dto = await api.post<FriendRequestDTO>("/friend-requests", {
      requesterId,
      recipientId,
    });
    return toFriendRequestModel(dto);
  }

  static async getPending(
    userId: string
  ): Promise<{ incoming: FriendRequestModel[]; outgoing: FriendRequestModel[] }> {
    const dto = await api.get<FriendRequestListDTO>(
      `/friend-requests/${userId}`
    );
    return {
      incoming: dto.incoming.map(toFriendRequestModel),
      outgoing: dto.outgoing.map(toFriendRequestModel),
    };
  }

  static async accept(requestId: string): Promise<FriendRequestModel> {
    const dto = await api.patch<FriendRequestDTO>(
      `/friend-requests/${requestId}/accept`
    );
    return toFriendRequestModel(dto);
  }

  static async reject(requestId: string): Promise<FriendRequestModel> {
    const dto = await api.patch<FriendRequestDTO>(
      `/friend-requests/${requestId}/reject`
    );
    return toFriendRequestModel(dto);
  }

  static async getStatus(
    userId: string,
    targetId: string
  ): Promise<FriendshipStatusModel> {
    const params = new URLSearchParams({
      userId,
      targetId,
    });

    const response = await api.get<
      | { status: "friends" | "none" }
      | { status: "incoming" | "outgoing"; request: FriendRequestDTO }
    >(`/friend-requests/status?${params.toString()}`);

    if (response.status === "incoming" || response.status === "outgoing") {
      return {
        status: response.status,
        request: toFriendRequestModel(response.request),
      };
    }

    return response;
  }
}
