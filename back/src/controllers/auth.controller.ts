import { RequestHandler } from "express";
import {
  registerUser,
  loginUser,
  getUserByToken,
} from "../services/auth.service";
import { toUserDTO } from "../dto/user.dto";

export const register: RequestHandler = async (req, res, next) => {
  const { username, pseudo, email, password } = req.body;
  const { user, token } = await registerUser(username, pseudo, email, password);

  res.status(201).json({
    user: toUserDTO(user),
    token,
  });
};

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  const { user, token } = await loginUser(email, password);

  res.status(200).json({
    user: toUserDTO(user),
    token,
  });
};

export const getMe: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "Token manquant" });
    return;
  }
  const token = authHeader.split(" ")[1];
  const user = await getUserByToken(token);

  res.status(200).json(toUserDTO(user));
};
