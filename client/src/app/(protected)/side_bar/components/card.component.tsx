"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { CardProps } from "../types/card.type";

export default function Card({ title, route, icon: Icon, collapsed }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  const isActive = useMemo(() => {
    if (route === "/") return pathname === "/";
    return pathname === route || pathname.startsWith(`${route}/`);
  }, [pathname, route]);

  return (
    <li className="relative w-full">
      <Link
        href={route}
        aria-label={collapsed ? title : undefined}
        className={`group relative flex items-center overflow-hidden rounded-xl border border-transparent px-3 py-3 transition-all duration-300 ${
          isActive
            ? "bg-white/10 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-400/40"
            : "hover:bg-white/5 hover:shadow-lg hover:shadow-indigo-500/10"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`relative z-10 grid h-10 w-10 place-items-center rounded-xl border border-white/5 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent transition-all duration-300 ${
            isActive ? "ring-1 ring-indigo-400/40" : ""
          }`}
        >
          <Icon
            className={`h-5 w-5 transition-all duration-300 ${
              isActive ? "text-white" : "text-slate-200 group-hover:text-white"
            } ${isHovered && !collapsed ? "scale-105" : "scale-100"}`}
            strokeWidth={2}
          />
        </div>

        <span
          className={`relative z-10 ml-4 text-sm font-medium tracking-wide text-slate-200 transition-all duration-300 ${
            collapsed ? "pointer-events-none hidden opacity-0" : "opacity-100"
          } ${isActive ? "text-white" : ""}`}
        >
          {title}
        </span>

        {collapsed && (
          <div
            className={`absolute left-full ml-4 flex items-center rounded-xl border border-white/10 bg-slate-900/85 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-100 shadow-lg shadow-indigo-500/20 backdrop-blur-md transition-all duration-200 ${
              isHovered ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
            }`}
            role="tooltip"
          >
            {title}
          </div>
        )}
      </Link>
    </li>
  );
}
