import {
  UserNotFoundException,
  FriendshipActionException,
} from "../exceptions/user.exceptions";
import User, { IUser } from "../models/User";
import { Types } from "mongoose";

export class UserRepository {
  static async create(data: Partial<IUser>): Promise<IUser> {
    return await User.create(data);
  }

  static async findAll(): Promise<IUser[]> {
    return await User.find();
  }

  static async deleteAll(): Promise<void> {
    await User.deleteMany({});
  }

  static async findByUsername(username: string): Promise<IUser> {
    const user = await User.findOne({ username });
    if (!user) throw new UserNotFoundException(username);
    return user;
  }

  static async findFriends(id: string): Promise<IUser[]> {
    const user = await User.findById(id).populate("friends");
    if (!user) throw new UserNotFoundException(id);
    return user.friends as IUser[];
  }

  static async addFriend(
    idUser: string,
    friendUsername: string
  ): Promise<boolean> {
    const user = await User.findById(idUser);
    const newFriend = await this.findByUsername(friendUsername);

    if (!user || !newFriend) {
      throw new UserNotFoundException(user ? friendUsername : idUser);
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

    if (!updated) {
      throw new FriendshipActionException("Les utilisateurs sont déjà amis.");
    }

    return updated;
  }

  static async removeFriend(
    idUser: string,
    idFriend: string
  ): Promise<boolean> {
    const user = await User.findById(idUser);
    const friend = await User.findById(idFriend);

    if (!user || !friend) {
      throw new UserNotFoundException(user ? idFriend : idUser);
    }

    const initialUserLength = user.friends.length;
    const initialFriendLength = friend.friends.length;

    user.friends = user.friends.filter(
      (f: Types.ObjectId) => f.toString() !== idFriend
    );
    friend.friends = friend.friends.filter(
      (f: Types.ObjectId) => f.toString() !== idUser
    );

    await user.save();
    await friend.save();

    if (
      user.friends.length === initialUserLength &&
      friend.friends.length === initialFriendLength
    ) {
      throw new FriendshipActionException("Ces utilisateurs ne sont pas amis.");
    }

    return true;
  }
}
