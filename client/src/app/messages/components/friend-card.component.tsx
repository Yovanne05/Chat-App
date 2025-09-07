"use client";

import { useRouter } from "next/navigation";
import { UserModel } from "@/models/user.model";

export default function FriendCardComponent({ friend }: { friend: UserModel }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/messages/${friend.id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="flex justify-center gap-3 p-4 transition cursor-pointer hover:bg-primary-dark w-full"
        >
            <div className="flex flex-col gap-1">
                <span className="font-semibold text-base text-white">
                    {friend.username}
                </span>
            </div>
        </div>
    );
}
