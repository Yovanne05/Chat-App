"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/userService";
import type { User } from "@/types/user";

export default function ProfilComponent() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getCurrentUser().then(setUser).catch(console.error);
    }, []);

    if (!user) return <p className="text-gray-500">Loading...</p>;

    return (
        <section className="max-w-md mx-auto mt-10 p-6">
            <div className="flex items-center space-x-4">
                <div>
                    <h2 className="text-2xl font-semibold">{user.username}</h2>
                    <p className="text-gray-500">@{user.pseudo}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
            </div>
        </section>
    );
}
