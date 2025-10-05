import User from "../models/User";
import { IUser } from "../models/User";
import { Types } from "mongoose";

export class UserRepository {
    
  static async findByUsername(username: string): Promise<IUser | null> {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    console.error("Error in findByUsername:", error);
    return null;
  }
}

  static async findFriendsById(id: string): Promise<IUser[] | null> {
    try {
      const user = await User.findById(id).populate("friends");
      if (!user) return null;
      return user.friends as IUser[];
    } catch (error) {
      console.error("Error in findFriendsById:", error);
      return null;
    }
  }

  static async addFriend(
    idUser: string,
    friendUsername: string
  ): Promise<boolean> {
    try {
      const user = await User.findById(idUser);
      const newFriend = await UserRepository.findByUsername(friendUsername);

      if (!user || !newFriend) return false;

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
    } catch (error) {
      console.error("Error in addFriend:", error);
      return false;
    }
  }

  static async removeFriend(
    idUser: string,
    idFriend: string
  ): Promise<boolean> {
    try {
      const user = await User.findById(idUser);
      const friend = await User.findById(idFriend);

      if (!user || !friend) return false;

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

      return (
        user.friends.length !== initialUserLength ||
        friend.friends.length !== initialFriendLength
      );
    } catch (error) {
      console.error("Error in removeFriend:", error);
      return false;
    }
  }
}
