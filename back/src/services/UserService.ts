import { IUser } from "../models/User";
import { UserRepository } from "../respository/UserRepository";

export class UserService {
  static async createUser(data: Partial<IUser>): Promise<IUser> {
    return await UserRepository.create(data);
  }

  static async findAll(): Promise<IUser[]> {
    return await UserRepository.findAll();
  }

  static async deleteAll(): Promise<void> {
    await UserRepository.deleteAll();
  }

  static async findFriends(userId: string): Promise<IUser[]> {
    return await UserRepository.findFriends(userId);
  }

  static async addFriend(
    userId: string,
    friendUsername: string
  ): Promise<boolean> {
    return await UserRepository.addFriend(userId, friendUsername);
  }

  static async removeFriend(
    userId: string,
    friendId: string
  ): Promise<boolean> {
    return await UserRepository.removeFriend(userId, friendId);
  }
}
