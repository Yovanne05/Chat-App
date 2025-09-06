import Link from "next/link";
import { CardProps } from "../types/card.type";

export default function Card({ title, route, icon: Icon }: CardProps) {
  return (
    <li>
      <Link
        href={route}
        className="flex items-center p-3 hover:bg-primary-dark rounded-lg"
      >
        <Icon className="text-3xl" />
        <span className="ml-3 text-base font-medium">{title}</span>
      </Link>
    </li>
  );
}