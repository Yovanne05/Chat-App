import { UserDTO } from "@/dto/user.dto";
import { toUser } from "@/mappers/user.mappers";
import { UserModel } from "@/models/user.model";
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
  private static apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
    const url = queryString
      ? `${this.apiUrl}/users?${queryString}`
      : `${this.apiUrl}/users`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch users");

    const { users, total } = await response.json();
    const userModels = users.map((u: UserDTO) => toUser(u));

    return { users: userModels, total };
  }

  public static async findFriends(userId: string): Promise<UserModel[]> {
    const response = await fetch(`${this.apiUrl}/users/${userId}/friends`);
    if (!response.ok) throw new Error("Failed to fetch friends");

    const data: UserDTO[] = await response.json();
    return data.map(toUser);
  }
}
