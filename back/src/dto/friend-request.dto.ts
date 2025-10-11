import { IFriendRequest } from "../models/friend-request.model";
import mongoose from "mongoose";
import { IUser } from "../models/user.model";

export type FriendRequestUserDTO = {
  id: string;
  username: string;
  pseudo: string;
  email: string;
};

export type FriendRequestDTO = {
  id: string;
  status: string;
  requester: FriendRequestUserDTO;
  recipient: FriendRequestUserDTO;
  createdAt: Date;
  updatedAt: Date;
};

const toUserLiteDTO = (user: IUser): FriendRequestUserDTO => ({
  id: (user._id as mongoose.Types.ObjectId).toString(),
  username: user.username,
  pseudo: user.pseudo,
  email: user.email,
});

export const toFriendRequestDTO = (
  request: IFriendRequest & { requester: IUser; recipient: IUser }
): FriendRequestDTO => {
  return {
    id: (request._id as mongoose.Types.ObjectId).toString(),
    status: request.status,
    requester: toUserLiteDTO(request.requester),
    recipient: toUserLiteDTO(request.recipient),
    createdAt: request.createdAt,
    updatedAt: request.updatedAt,
  };
};
