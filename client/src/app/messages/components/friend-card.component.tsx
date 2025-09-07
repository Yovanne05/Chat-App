import { UserModel } from "@/models/user.model";

export default function FriendCardComponent({ friend }: { friend: UserModel }) {
    return (
        <div
            className="flex items-center gap-3 p-3 rounded-2xl transition"
        >
            <div className="flex flex-col">
                <span className="font-semibold text-sm text-white">{friend.username}</span>
            </div>
        </div>
    );
}
