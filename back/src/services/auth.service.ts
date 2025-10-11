import bcrypt from "bcryptjs";
import User, { IUser } from "../models/user.model";
import { generateToken } from "../utils/jwt";

export const registerUser = async (
  username: string,
  pseudo: string,
  email: string,
  password: string
) => {
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) throw new Error("Email ou username déjà utilisé");

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    username,
    pseudo,
    email,
    password: hashedPassword,
    friends: [],
  });

  const token = generateToken({ id: user._id });
  return { user, token };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Utilisateur non trouvé");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Identifiants invalides");

  const token = generateToken({ id: user._id });
  return { user, token };
};

export const getUserByToken = async (token: string) => {
  const { verifyToken } = await import("../utils/jwt");
  const decoded = verifyToken(token);
  const user = await User.findById(decoded.id).select("-password");
  if (!user) throw new Error("Utilisateur introuvable");
  return user;
};
