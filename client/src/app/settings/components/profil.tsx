"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/userService";
import type { User } from "@/types/user";

export default function ProfilComponent() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getCurrentUser().then(setUser).catch(console.error);
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <section>
            <p>{user.username}</p>
        </section>
    );
}
