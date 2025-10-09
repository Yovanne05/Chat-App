import { UserDTO } from "@/dto/user.dto";
import { toUser } from "@/mappers/user.mappers";
import { UserModel } from "@/models/user.model";
import { api } from "@/services/api";
export interface UserSearchParams {
  username?: string;
  email?: string;
  ids?: string[];

  sortBy?: "username" | "email" | "createdAt" | "updatedAt";
  sortDir?: "asc" | "desc";

  limit?: number;
  offset?: number;
}

export class UserService {
  public static async findMany(
    params: Partial<UserSearchParams> = {}
  ): Promise<{ users: UserModel[]; total: number }> {
    const queryParams = new URLSearchParams();

    if (params.username) queryParams.append("username", params.username);
    if (params.email) queryParams.append("email", params.email);
    if (params.ids && params.ids.length > 0)
      queryParams.append("ids", params.ids.join(","));
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortDir) queryParams.append("sortDir", params.sortDir);
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.offset) queryParams.append("offset", params.offset.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/users?${queryString}` : "/users";

    const { users, total } = await api.get<{
      users: UserDTO[];
      total: number;
    }>(endpoint);
    const userModels = users.map((u: UserDTO) => toUser(u));

    return { users: userModels, total };
  }

  public static async findFriends(userId: string): Promise<UserModel[]> {
    const data = await api.get<UserDTO[]>(`/users/${userId}/friends`);
    return data.map(toUser);
  }
}
