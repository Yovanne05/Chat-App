import React from "react";

interface LogoProps {
  isHovered: boolean;
}

export default function Logo({ isHovered }: LogoProps) {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Pulse";
  return (
    <div className="flex items-center justify-center h-16 border-b border-white/10">
      <div
        className={`transition-all duration-300 ${
          isHovered ? "scale-100" : "scale-90"
        }`}
      >
        {isHovered ? (
          <h1 className="text-xl font-bold text-white tracking-wider">
            {appName}
          </h1>
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            {appName[0]}
          </div>
        )}
      </div>
    </div>
  );
}
