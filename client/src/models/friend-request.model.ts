export type FriendRequestStatus = "pending" | "accepted" | "rejected";

export type FriendRequestUserModel = {
  id: string;
  username: string;
  pseudo: string;
  email: string;
};

export type FriendRequestModel = {
  id: string;
  status: FriendRequestStatus;
  requester: FriendRequestUserModel;
  recipient: FriendRequestUserModel;
  createdAt: string;
  updatedAt: string;
};
