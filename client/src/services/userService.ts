import { UserDTO } from "@/dto/user.dto";
import { toUser } from "@/mappers/user.mappers";
import { UserModel } from "@/models/user.model";

export class UserService {
  private static apiUrl = process.env.NEXT_PUBLIC_API_URL;

  public static async getUsers(): Promise<{
    users: UserModel[];
    total: number;
  }> {
    const response = await fetch(`${this.apiUrl}/users`);
    if (!response.ok) throw new Error("Failed to fetch users");

    const { users, total } = await response.json();
    const userModels = users.map((u: UserDTO) => toUser(u));
    return { users: userModels, total };
  }

  public static async getFriendsById(userId: string): Promise<UserModel[]> {
    const response = await fetch(`${this.apiUrl}/users/${userId}/friends`);
    if (!response.ok) throw new Error("Failed to fetch friends");

    const data: UserDTO[] = await response.json();
    return data.map(toUser);
  }

  public static async getCurrentUser(): Promise<UserModel> {
    const response = await fetch(`${this.apiUrl}/auth/me`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok)
      throw new Error("Échec de la récupération de l'utilisateur");
    const data: UserDTO = await response.json();
    return toUser(data);
  }
}
