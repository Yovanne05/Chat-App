"use client";

import CardList from "./components/card-list.component";
import { cardList } from "./data/card-list.data";
import { useAuth } from "@/components/auth/AuthContext";
import { useState } from "react";

export default function SideBarPage() {
    const { isAuthenticated } = useAuth();
    const [isHovered, setIsHovered] = useState(false);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div
            className={`p-4 bg-primary transition-all duration-300 ease-in-out overflow-hidden ${
                isHovered ? "w-64" : "w-16"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardList CardProps={cardList} collapsed={!isHovered} />
        </div>
    );
}