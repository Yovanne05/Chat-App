import React from "react";

interface LogoProps {
  isHovered: boolean;
}

export default function Logo({ isHovered }: LogoProps) {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Pulse";
  return (
    <div className="flex h-20 items-center justify-center border-b border-white/10 px-4">
      {isHovered ? (
        <div className="flex w-full items-center justify-between">
          <h1 className="text-lg font-semibold tracking-wide text-white">
            {appName}
          </h1>
          <span className="rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-500/40 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-indigo-100">
            Beta
          </span>
        </div>
      ) : (
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 text-lg font-semibold text-white shadow-lg shadow-indigo-500/30">
          {appName[0]}
        </div>
      )}
    </div>
  );
}
