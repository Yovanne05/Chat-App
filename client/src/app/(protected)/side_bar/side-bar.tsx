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

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <aside
      className={`relative flex h-full min-h-screen flex-col overflow-hidden border-r border-white/10 bg-slate-900/60 backdrop-blur-2xl transition-[width] duration-300 ${
        isHovered ? "w-72" : "w-24"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Logo isHovered={isHovered} />

      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <CardList CardProps={cardList} collapsed={!isHovered} />
      </nav>

      <UserLogo isHovered={isHovered} username={user!.username} />
    </aside>
  );
}
