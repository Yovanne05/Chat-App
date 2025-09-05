"use client";

import CardList from "./components/card-list.component";
import { cardList } from "./data/card-list.data";
import { useAuth } from "@/components/auth/AuthContext";

export default function SideBar() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="border rounded-lg shadow-md p-4 w-64">
      <CardList CardProps={cardList} />
    </div>
  );
}
