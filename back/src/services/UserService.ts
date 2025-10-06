import { IUser } from "../models/User";
import { UserRepository, UserSearchParams } from "../repository/UserRepository";
import { toUserDTO, UserDTO } from "../dto/user.dto";

export class UserService {
  static async createUser(data: Partial<IUser>): Promise<UserDTO> {
    const user = await UserRepository.create(data);
    return toUserDTO(user);
  }

  static async findMany(
    params: Partial<UserSearchParams> = {}
  ): Promise<{ users: UserDTO[]; total: number }> {
    const { users, total } = await UserRepository.findMany(params);
    const usersDto = users.map(toUserDTO);
    return { users: usersDto, total };
  }

  static async deleteAll(): Promise<void> {
    await UserRepository.deleteAll();
  }

  static async findFriends(userId: string): Promise<UserDTO[]> {
    const friends = await UserRepository.findFriends(userId);
    return friends.map(toUserDTO);
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
