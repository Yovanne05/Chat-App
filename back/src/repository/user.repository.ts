import User, { IUser } from "../models/user.model";
import { UserNotFoundException } from "../exceptions/user.exceptions";
import { FilterQuery, SortOrder } from "mongoose";

export interface UserSearchParams {
  username?: string;
  email?: string;
  ids?: string[];

  sortBy?: "username" | "email" | "createdAt" | "updatedAt";
  sortDir?: "asc" | "desc";

  limit?: number;
  offset?: number;
}

export class UserRepository {
  static async create(data: Partial<IUser>): Promise<IUser> {
    return await User.create(data);
  }

  static async deleteAll(): Promise<void> {
    await User.deleteMany({});
  }

  static async findByUsername(username: string): Promise<IUser> {
    const user = await User.findOne({ username });
    if (!user) throw new UserNotFoundException(username);
    return user;
  }

  static async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  static async areFriends(idUser: string, idFriend: string): Promise<boolean> {
    const user = await User.findById(idUser).select("friends");

    if (!user) {
      throw new UserNotFoundException(idUser);
    }

    return user.friends.some(
      (friend: { toString: () => string; }) => friend.toString() === idFriend.toString()
    );
  }

  static async findFriends(id: string): Promise<IUser[]> {
    const user = await User.findById(id).populate("friends");
    if (!user) throw new UserNotFoundException(id);
    return user.friends as IUser[];
  }

  static async findMany(params: Partial<UserSearchParams> = {}): Promise<{ users: IUser[]; total: number }> {
    const {
      username,
      email,
      ids,
      sortBy = "createdAt",
      sortDir = "desc",
      limit = 20,
      offset = 0,
    } = params;

    const filter: FilterQuery<IUser> = {};

    if (ids && ids.length > 0) {
      filter._id = { $in: ids };
    }

    if (username) {
      filter.username = { $regex: username, $options: "i" };
    }

    if (email) {
      filter.email = { $regex: email, $options: "i" };
    }

    const sort: Record<string, SortOrder> = {
      [sortBy]: sortDir === "desc" ? -1 : 1,
    };

    const [users, total] = await Promise.all([
      User.find(filter).sort(sort).skip(offset).limit(limit),
      User.countDocuments(filter),
    ]);

    return { users, total };
  }

  static async addFriend(idUser: string, friendId: string): Promise<boolean> {
    const user = await User.findById(idUser);
    const newFriend = await User.findById(friendId);

    if (!user || !newFriend) {
      throw new UserNotFoundException(user ? friendId : idUser);
    }

    let updated = false;

    if (!user.friends.includes(newFriend._id)) {
      user.friends.push(newFriend._id);
      await user.save();
      updated = true;
    }

    if (!newFriend.friends.includes(user._id)) {
      newFriend.friends.push(user._id);
      await newFriend.save();
      updated = true;
    }

    return updated;
  }

  static async removeFriend(idUser: string, idFriend: string): Promise<boolean> {
    const user = await User.findById(idUser);
    const friend = await User.findById(idFriend);

    if (!user || !friend) {
      throw new UserNotFoundException(user ? idFriend : idUser);
    }

    const initialUserLength = user.friends.length;
    const initialFriendLength = friend.friends.length;

    user.friends = user.friends.filter((f: { toString: () => string; }) => f.toString() !== idFriend);
    friend.friends = friend.friends.filter((f: { toString: () => string; }) => f.toString() !== idUser);

    await user.save();
    await friend.save();

    const userChanged = user.friends.length < initialUserLength;
    const friendChanged = friend.friends.length < initialFriendLength;

    return userChanged || friendChanged;
  }
}
