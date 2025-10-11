import { Request, Response } from "express";
import { FriendRequestService } from "../services/friend-request.service";

export const sendFriendRequest = async (req: Request, res: Response) => {
  const { requesterId, recipientId } = req.body;
  const request = await FriendRequestService.sendRequest(
    requesterId,
    recipientId
  );
  res.status(201).json(request);
};

export const listFriendRequests = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const requests = await FriendRequestService.getPendingRequestsForUser(userId);
  res.status(200).json(requests);
};

export const acceptFriendRequest = async (req: Request, res: Response) => {
  const { requestId } = req.params;
  const request = await FriendRequestService.acceptRequest(requestId);
  res.status(200).json(request);
};

export const rejectFriendRequest = async (req: Request, res: Response) => {
  const { requestId } = req.params;
  const request = await FriendRequestService.rejectRequest(requestId);
  res.status(200).json(request);
};

export const cancelFriendRequest = async (req: Request, res: Response) => {
  const { requestId } = req.params;
  const { requesterId } = req.body;
  await FriendRequestService.cancelRequest(requestId, requesterId);
  res.status(204).send();
};

export const getFriendshipStatus = async (req: Request, res: Response) => {
  const { userId, targetId } = req.query as {
    userId: string;
    targetId: string;
  };

  const status = await FriendRequestService.getStatusBetweenUsers(
    userId,
    targetId
  );
  res.status(200).json(status);
};
