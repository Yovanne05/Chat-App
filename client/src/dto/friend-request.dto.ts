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
  createdAt: string;
  updatedAt: string;
};
