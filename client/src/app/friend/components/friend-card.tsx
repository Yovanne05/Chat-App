import { FC } from "react";
import {User} from "@/types/user";

const FriendCard: FC<{ user: User }> = ({ user }) => {
    return (
        <div className="border border-gray-300 rounded-lg p-4 flex items-center mb-4 max-w-sm shadow-md">
            <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{user.pseudo}</h3>
                <p className="text-gray-600">{user.username}</p>
                <p className="text-gray-500">{user.email}</p>
            </div>
        </div>
    );
};

export default FriendCard;
