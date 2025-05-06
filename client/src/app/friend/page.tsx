"use client"

import React, { Suspense, useEffect, useState } from 'react';
import {getCurrentUser, getFriendsById} from "@/services/userService";
import UserFriends from "@/app/friend/components/all-friends";
import {User} from "@/types/user"


export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                console.log(currentUser.friends);
                const data = await getFriendsById(currentUser._id);
                setUsers(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (isLoading) {
        return <div>Chargement...</div>;
    }
    return (
        <main className="container mx-auto p-4">
            <Suspense fallback={<div>Chargement...</div>}>
                <UserFriends users={users}/>
            </Suspense>
        </main>
    );
}
