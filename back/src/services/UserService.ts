import { IUser } from "../models/User";
import { UserRepository } from "../respository/UserRepository";

export class UserService {
    static async getFriends(userId: string): Promise<IUser[] | null> {
        return await UserRepository.findFriendsById(userId);
    }

    static async addFriend(userId: string, friendId: string): Promise<boolean> {
        return await UserRepository.addFriend(userId, friendId);
    }

    static async removeFriend(userId: string, friendId: string): Promise<boolean> {
        return await UserRepository.removeFriend(userId, friendId);
    }
}
