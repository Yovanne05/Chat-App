import { Request, Response } from "express";
import User from "../models/User";
import { UserService } from "../services/UserService";
import { toUserDTO } from "../dto/user.dto";

export const createUser = async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  const userDTO = toUserDTO(user);
  res.status(201).json(userDTO);
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  const usersDTO = users.map(toUserDTO);
  res.status(200).json(usersDTO);
};

export const deleteAllUsers = async (req: Request, res: Response) => {
  await User.deleteMany({});
  res.json("");
};

export const getFriends = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const friends = await UserService.getFriends(userId);
  const friendsDTO = friends?.map(toUserDTO);
  res.status(200).json(friendsDTO);
};

export const addFriendToUser = async (req: Request, res: Response) => {
  const { idUser, friendUsername } = req.params;
  await UserService.addFriend(idUser, friendUsername);
  res.status(200).json("");
};
