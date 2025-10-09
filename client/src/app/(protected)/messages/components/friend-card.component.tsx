"use client";

import { useRouter } from "next/navigation";
import { LuArrowUpRight } from "react-icons/lu";
import { UserModel } from "@/models/user.model";

export default function FriendCardComponent({ friend }: { friend: UserModel }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/messages/${friend.id}`);
  };

  const initial = friend.username ? friend.username[0]?.toUpperCase() : "?";

  return (
    <button
      onClick={handleClick}
      className="group flex w-full items-center justify-between rounded-2xl border border-white/10 bg-slate-900/40 px-5 py-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-slate-900/60 hover:shadow-lg hover:shadow-indigo-500/20"
    >
      <div className="flex items-center gap-4">
        <div className="relative grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 text-lg font-semibold text-white shadow-md shadow-indigo-500/30">
          {initial}
          <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border border-slate-900/70 bg-emerald-400 shadow shadow-emerald-500/40" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-white">
            {friend.username}
          </span>
          <span className="text-xs uppercase tracking-wide text-slate-400">
            Discussion privee
          </span>
        </div>
      </div>
      <LuArrowUpRight className="h-5 w-5 text-slate-400 transition-colors duration-200 group-hover:text-white" />
    </button>
  );
}
