import FriendRequestModel, {
  IFriendRequest,
  FriendRequestStatus,
} from "../models/friend-request.model";
import mongoose from "mongoose";
import {
  FriendRequestActionException,
  FriendRequestNotFoundException,
} from "../exceptions/friend-request.exception";

type Direction = "incoming" | "outgoing";

export class FriendRequestRepository {
  static async create(
    requesterId: string,
    recipientId: string
  ): Promise<IFriendRequest> {
    if (requesterId === recipientId) {
      throw new FriendRequestActionException(
        "Impossible d'envoyer une invitation à soi-même."
      );
    }

    const existing = await FriendRequestModel.findOne({
      requester: requesterId,
      recipient: recipientId,
      status: "pending",
    });

    if (existing) {
      throw new FriendRequestActionException(
        "Une invitation est déjà en attente pour cet utilisateur."
      );
    }

    const reversed = await FriendRequestModel.findOne({
      requester: recipientId,
      recipient: requesterId,
      status: "pending",
    });

    if (reversed) {
      throw new FriendRequestActionException(
        "Cet utilisateur vous a déjà envoyé une invitation."
      );
    }

    const request = new FriendRequestModel({
      requester: new mongoose.Types.ObjectId(requesterId),
      recipient: new mongoose.Types.ObjectId(recipientId),
    });

    return await request.save();
  }

  static async findById(id: string): Promise<IFriendRequest> {
    const request = await FriendRequestModel.findById(id);
    if (!request) {
      throw new FriendRequestNotFoundException(id);
    }
    return request;
  }

  static async findPendingBetween(
    userId1: string,
    userId2: string
  ): Promise<IFriendRequest | null> {
    return FriendRequestModel.findOne({
      status: "pending",
      $or: [
        { requester: userId1, recipient: userId2 },
        { requester: userId2, recipient: userId1 },
      ],
    });
  }

  static async findPendingByUser(
    userId: string,
    direction?: Direction
  ): Promise<IFriendRequest[]> {
    const filter: Record<string, unknown> = {
      status: "pending",
    };

    if (!direction || direction === "incoming") {
      filter.recipient = userId;
    }

    if (direction === "outgoing") {
      filter.requester = userId;
    }

    if (!direction) {
      return FriendRequestModel.find({
        status: "pending",
        $or: [{ recipient: userId }, { requester: userId }],
      })
        .sort({ createdAt: -1 })
        .populate("requester")
        .populate("recipient");
    }

    return FriendRequestModel.find(filter)
      .sort({ createdAt: -1 })
      .populate("requester")
      .populate("recipient");
  }

  static async updateStatus(
    requestId: string,
    status: FriendRequestStatus
  ): Promise<IFriendRequest> {
    const request = await FriendRequestModel.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );
    if (!request) {
      throw new FriendRequestNotFoundException(requestId);
    }
    return request;
  }

  static async delete(requestId: string): Promise<void> {
    const result = await FriendRequestModel.findByIdAndDelete(requestId);
    if (!result) {
      throw new FriendRequestNotFoundException(requestId);
    }
  }
}
