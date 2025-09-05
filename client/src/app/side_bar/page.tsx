"use client";

import CardList from "./components/card-list.component";
import { cardList } from "./data/card-list.data";

export default function SideBar() {
  return (
    <div className="border rounded-lg shadow-md p-4 w-64">
      <CardList CardProps={cardList} />
    </div>
  );
}
