"use client";

import { useEffect, useState } from "react";
import type { UserModel } from "@/models/user.model";
import { getMe } from "@/services/auth.service";

export default function ProfilComponent() {
    const [user, setUser] = useState<UserModel | null>(null);

    useEffect(() => {
        getMe().then(setUser).catch(console.error);
    }, []);

    if (!user) return <p className="text-gray-500 text-center">Loading...</p>;

    return (
        <div className="flex flex-col justify-center">
            <section className="max-w-md mx-auto p-6">
                <div className="flex items-center space-x-4">
                    <div>
                        <h2 className="text-2xl font-semibold">{user.username}</h2>
                        <p className="text-gray-500">@{user.pseudo}</p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
