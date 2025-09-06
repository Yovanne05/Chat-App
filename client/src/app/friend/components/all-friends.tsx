import { FC } from "react";
import {UserModel} from "@/models/user.model";

const UserFriends: FC<{ users: UserModel[] }> = ({ users }) => {
    if (users.length === 0) {
        return <div>Aucun ami trouvé</div>;
    }

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Liste des amis</h1>
            <ul className="space-y-2">
                {users.map((user) => (
                    <li key={user._id} className="p-2 border rounded">
                        <p className="font-medium">{user.username}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserFriends;
