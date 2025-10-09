"use client";

import Logo from "@/components/logo.component";
import UserLogo from "@/components/user-logo.component";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import CardList from "./components/card-list.component";
import { cardList } from "./data/card-list.data";


export default function SideBar() {
  const [isHovered, setIsHovered] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (!isAuthenticated) return null;

  return (
    <div
      className={`relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl transition-all duration-300 ease-in-out ${
        isHovered ? "w-64" : "w-20"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Logo isHovered={isHovered} />

      <nav className="py-6 px-3">
        <CardList CardProps={cardList} collapsed={!isHovered} />
      </nav>

      <UserLogo isHovered={isHovered} username={user!.username} />
    </div>
  );
}