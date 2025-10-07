"use client";

import { useState } from "react";
import { CardProps } from "../types/card.type";

export default function Card({ title, route, icon: Icon, collapsed }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li className="relative w-full mb-1">
      <a
        href={route}
        className={`flex items-center px-3 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden ${
          collapsed ? "justify-center" : "justify-start"
        } hover:bg-white/10 hover:shadow-lg`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Effet de fond au survol */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300" />

        {/* Icône */}
        <div
          className={`relative z-10 flex items-center justify-center transition-all duration-300 ${
            isHovered && !collapsed ? "scale-110" : "scale-100"
          }`}
        >
          <Icon className="w-5 h-5 text-white" strokeWidth={2} />
        </div>

        {/* Titre */}
        <span
          className={`relative z-10 text-white font-medium whitespace-nowrap transition-all duration-300 ${
            collapsed ? "opacity-0 w-0 ml-0" : "opacity-100 w-auto ml-4"
          }`}
        >
          {title}
        </span>

        {/* Tooltip en mode réduit */}
        {collapsed && (
          <div
            className={`absolute left-full ml-6 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl whitespace-nowrap transition-all duration-200 pointer-events-none ${
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
            }`}
          >
            {title}
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900" />
          </div>
        )}
      </a>
    </li>
  );
}
