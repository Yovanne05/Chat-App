import Link from "next/link";

interface UserLogoProps {
  isHovered: boolean;
  username: string;
}

export default function UserLogo({ isHovered, username }: UserLogoProps) {
  const initial = username ? username[0]?.toUpperCase() : "?";

  return (
    <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-slate-900/70 px-4 py-5 backdrop-blur-lg">
      <div
        className={`flex items-center gap-3 ${
          isHovered ? "justify-between" : "justify-start"
        }`}
      >
        <div className="relative flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 text-lg font-semibold text-white shadow-md shadow-indigo-500/30">
            {initial}
          </div>
          <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border border-slate-900/80 bg-emerald-400 shadow shadow-emerald-500/30" />
          {isHovered && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">{username}</span>
              <span className="text-xs font-medium uppercase tracking-wide text-emerald-300">
                En ligne
              </span>
            </div>
          )}
        </div>

        {isHovered && 
        
        (
          <Link href="/settings">
            <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-50 transition-all duration-200 hover:bg-white/10 hover:text-white">
              Profil
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
