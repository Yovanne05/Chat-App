import {
  FriendRequestDTO,
  FriendRequestUserDTO,
} from "@/dto/friend-request.dto";
import {
  FriendRequestModel,
  FriendRequestUserModel,
} from "@/models/friend-request.model";

const toUserModel = (dto: FriendRequestUserDTO): FriendRequestUserModel => ({
  id: dto.id,
  username: dto.username,
  pseudo: dto.pseudo,
  email: dto.email,
});

export const toFriendRequestModel = (
  dto: FriendRequestDTO
): FriendRequestModel => ({
  id: dto.id,
  status: dto.status as FriendRequestModel["status"],
  requester: toUserModel(dto.requester),
  recipient: toUserModel(dto.recipient),
  createdAt: dto.createdAt,
  updatedAt: dto.updatedAt,
});
