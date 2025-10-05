import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { toUserDTO } from "../dto/user.dto";

export const create = async (req: Request, res: Response) => {
  const user = await UserService.createUser(req.body);
  const userDTO = toUserDTO(user);
  res.status(201).json(userDTO);
};

export const findAll = async (req: Request, res: Response) => {
  const users = await UserService.findAll();
  const usersDTO = users.map(toUserDTO);
  res.status(200).json(usersDTO);
};

export const deleteMany = async (req: Request, res: Response) => {
  await UserService.deleteAll();
  res.json("");
};

export const findFriends = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const friends = await UserService.findFriends(userId);
  const friendsDTO = friends?.map(toUserDTO);
  res.status(200).json(friendsDTO);
};

export const addFriendToUser = async (req: Request, res: Response) => {
  const { idUser, friendUsername } = req.params;
  await UserService.addFriend(idUser, friendUsername);
  res.status(200).json("");
};
