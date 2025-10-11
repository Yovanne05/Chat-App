import mongoose from "mongoose";
import { FriendRequestRepository } from "../repository/friend-request.repository";
import { UserRepository } from "../repository/user.repository";
import { FriendRequestActionException } from "../exceptions/friend-request.exception";
import { FriendRequestDTO, toFriendRequestDTO } from "../dto/friend-request.dto";

export class FriendRequestService {
  static async sendRequest(
    requesterId: string,
    recipientId: string
  ): Promise<FriendRequestDTO> {
    const [requester, recipient] = await Promise.all([
      UserRepository.findById(requesterId),
      UserRepository.findById(recipientId),
    ]);

    if (!requester || !recipient) {
      throw new FriendRequestActionException(
        "Impossible d'envoyer une invitation: utilisateur introuvable."
      );
    }

    const alreadyFriends = await UserRepository.areFriends(
      requesterId,
      recipientId
    );

    if (alreadyFriends) {
      throw new FriendRequestActionException(
        "Vous êtes déjà amis avec cet utilisateur."
      );
    }

    const request = await FriendRequestRepository.create(
      requesterId,
      recipientId
    );

    const populated = await request.populate(["requester", "recipient"]);

    return toFriendRequestDTO(populated as any);
  }

  static async getPendingRequestsForUser(
    userId: string
  ): Promise<{ incoming: FriendRequestDTO[]; outgoing: FriendRequestDTO[] }> {
    const [incomingDocs, outgoingDocs] = await Promise.all([
      FriendRequestRepository.findPendingByUser(userId, "incoming"),
      FriendRequestRepository.findPendingByUser(userId, "outgoing"),
    ]);

    return {
      incoming: incomingDocs.map((doc) =>
        toFriendRequestDTO(doc as any)
      ),
      outgoing: outgoingDocs.map((doc) =>
        toFriendRequestDTO(doc as any)
      ),
    };
  }

  static async acceptRequest(requestId: string): Promise<FriendRequestDTO> {
    const request = await FriendRequestRepository.findById(requestId);

    if (request.status !== "pending") {
      throw new FriendRequestActionException(
        "La demande a déjà été traitée."
      );
    }

    await UserRepository.addFriend(
      (request.requester as mongoose.Types.ObjectId).toString(),
      (request.recipient as mongoose.Types.ObjectId).toString()
    );

    const updated = await FriendRequestRepository.updateStatus(
      requestId,
      "accepted"
    );

    const populated = await updated.populate(["requester", "recipient"]);

    return toFriendRequestDTO(populated as any);
  }

  static async rejectRequest(requestId: string): Promise<FriendRequestDTO> {
    const request = await FriendRequestRepository.findById(requestId);

    if (request.status !== "pending") {
      throw new FriendRequestActionException(
        "La demande a déjà été traitée."
      );
    }

    const updated = await FriendRequestRepository.updateStatus(
      requestId,
      "rejected"
    );

    const populated = await updated.populate(["requester", "recipient"]);
    return toFriendRequestDTO(populated as any);
  }

  static async cancelRequest(
    requestId: string,
    requesterId: string
  ): Promise<void> {
    const request = await FriendRequestRepository.findById(requestId);
    if (
      (request.requester as mongoose.Types.ObjectId).toString() !== requesterId
    ) {
      throw new FriendRequestActionException(
        "Vous ne pouvez annuler que vos propres invitations."
      );
    }

    if (request.status !== "pending") {
      throw new FriendRequestActionException(
        "La demande a déjà été traitée."
      );
    }

    await FriendRequestRepository.delete(requestId);
  }

  static async getStatusBetweenUsers(
    userId: string,
    targetId: string
  ): Promise<
    | { status: "friends" }
    | { status: "none" }
    | { status: "incoming" | "outgoing"; request: FriendRequestDTO }
  > {
    const [user, target] = await Promise.all([
      UserRepository.findById(userId),
      UserRepository.findById(targetId),
    ]);

    if (!user || !target) {
      throw new FriendRequestActionException(
        "Utilisateur introuvable pour déterminer le statut."
      );
    }

    const friends = await UserRepository.areFriends(userId, targetId);
    if (friends) {
      return { status: "friends" };
    }

    const pending = await FriendRequestRepository.findPendingBetween(
      userId,
      targetId
    );

    if (!pending) {
      return { status: "none" };
    }

    const populated = await pending.populate(["requester", "recipient"]);
    const dto = toFriendRequestDTO(populated as any);

    if (dto.requester.id === userId) {
      return { status: "outgoing", request: dto };
    }

    return { status: "incoming", request: dto };
  }
}
