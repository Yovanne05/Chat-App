"use client"

import React, { Suspense, useEffect, useState } from 'react';
import {User} from "@/types/user";
import {useRouter} from "next/navigation";
import {getFriendsById} from "@/services/userService";
import {removeAuthToken} from "@/utils/auth";
import UserFriends from "@/app/friend/components/all-friends";


export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFriendsById("68054351529fc085e9ad344b");
                setUsers(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        removeAuthToken();
        router.push('/login');
    };

    if (isLoading) {
        return <div>Chargement...</div>;
    }
    return (
        <main className="container mx-auto p-4">
            <Suspense fallback={<div>Chargement...</div>}>
                <UserFriends users={users}/>

                <button
                    onClick={handleLogout}
                    className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Se déconnecter
                </button>
            </Suspense>
        </main>
    );
}
