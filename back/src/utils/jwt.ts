import jwt, { SignOptions, JwtPayload, Secret } from "jsonwebtoken";
import type { StringValue } from "ms";

const JWT_SECRET = process.env.JWT_SECRET as Secret;
const JWT_EXPIRES = (process.env.JWT_EXPIRES || "8h") as StringValue;

export const generateToken = (payload: object): string => {
  const options: SignOptions = { expiresIn: JWT_EXPIRES };
  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): JwtPayload & { id: string } => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload & { id: string };
};