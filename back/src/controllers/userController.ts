import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export const create = async (req: Request, res: Response) => {
  const userDTO = await UserService.createUser(req.body);
  res.status(201).json(userDTO);
};

export const findMany = async (req: Request, res: Response) => {
  const params = {
    username: req.query.username as string,
    email: req.query.email as string,
    ids: req.query.ids ? (req.query.ids as string).split(",") : undefined,
    sortBy: req.query.sortBy as
      | "username"
      | "email"
      | "createdAt"
      | "updatedAt",
    sortDir: req.query.sortDir as "asc" | "desc",
    limit: req.query.limit
      ? parseInt(req.query.limit as string, 10)
      : undefined,
    offset: req.query.offset
      ? parseInt(req.query.offset as string, 10)
      : undefined,
  };

  const { users, total } = await UserService.findMany(params);
  res.status(200).json({ users, total });
};

export const deleteMany = async (req: Request, res: Response) => {
  await UserService.deleteAll();
  res.json("");
};

export const findFriends = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const friendsDTO = await UserService.findFriends(userId);
  res.status(200).json(friendsDTO);
};

export const addFriendToUser = async (req: Request, res: Response) => {
  const { idUser, friendUsername } = req.params;
  await UserService.addFriend(idUser, friendUsername);
  res.status(200).json("");
};
