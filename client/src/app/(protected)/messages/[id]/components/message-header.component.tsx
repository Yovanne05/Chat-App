import { LuDot } from "react-icons/lu";
import { UserModel } from "@/models/user.model";

interface MessageHeaderProps {
  friend: UserModel;
  isConnected: boolean;
}

export const MessageHeader = ({ friend, isConnected }: MessageHeaderProps) => {
  const initial = friend.username ? friend.username.charAt(0).toUpperCase() : "?";

  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-5 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 text-lg font-semibold text-white shadow-md shadow-indigo-500/30">
          {initial}
          <span
            className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border border-slate-900/70 ${
              isConnected ? "bg-emerald-400" : "bg-slate-500"
            }`}
          />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-white">{friend.username}</h1>
          <p className="flex items-center text-xs uppercase tracking-wide text-slate-300">
            <LuDot className={`h-5 w-5 ${isConnected ? "text-emerald-400" : "text-slate-500"}`} />
            {isConnected ? "En ligne" : "Hors ligne"}
          </p>
        </div>
      </div>

      <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-indigo-100">
        Conversation securisee
      </div>
    </header>
  );
};
