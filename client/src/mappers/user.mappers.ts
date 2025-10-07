import {UserModel} from "@/models/user.model";
import {UserDTO} from "@/dto/user.dto";

export const toUserDTO = (user: UserModel): UserDTO => ({
    id: user.id,
    username: user.username,
    pseudo: user.pseudo,
    email: user.email,
    friends: user.friends.map(friend => friend.id),
});

export const toUser = (dto: UserDTO): UserModel => {
    return {
        id: dto.id,
        username: dto.username,
        pseudo: dto.pseudo,
        email: dto.email,
        friends: dto.friends.map(fid => ({ id: fid }))
    };
};