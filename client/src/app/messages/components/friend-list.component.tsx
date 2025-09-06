"use client"

import {useEffect, useState} from "react";
import type {UserModel} from "@/models/user.model";
import {UserService} from "@/services/userService";

export default function FriendListComponent() {
    const [friends, setFriends] = useState<UserModel[] | null>(null);
    const [user, setUser] = useState<UserModel | null>(null);


    useEffect(() => {
        UserService.getCurrentUser().then(setUser).catch(console.error);
    }, []);

    useEffect(() => {
        if (!user?.id) return;
        UserService.getFriendsById(user.id)
            .then(setFriends)
            .catch(console.error);
    }, [user]);
    return (
        <ul>
            {!friends ? (
                <p className="text-gray-500">Chargement des amis...</p>
            ) : friends.length === 0 ? (
                <p className="text-gray-400">Aucun ami trouvé.</p>
            ) : (
                friends.map((friend) => (

                    <li key={friend.id} className="p-2 border-b">
                        {friend.username} <span className="text-gray-500">@{friend.pseudo}</span>
                    </li>
                ))
            )}
        </ul>
    );

}