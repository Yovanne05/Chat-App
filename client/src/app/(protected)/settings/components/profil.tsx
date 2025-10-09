"use client";

import { useMemo } from "react";
import { LuMail, LuUser } from "react-icons/lu";
import { useAuth } from "@/context/AuthContext";

export default function ProfilComponent() {
  const { user } = useAuth();

  const stats = useMemo(
    () => [
      {
        label: "Contacts",
        value: user?.friends?.length ?? 0,
      },
      {
        label: "Pseudo",
        value: user?.pseudo ?? "--",
      },
    ],
    [user],
  );

  if (!user) {
    return (
      <div className="flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-10 py-12 text-sm text-slate-300 backdrop-blur-xl">
        Chargement du profil...
      </div>
    );
  }

  const initial = user.username ? user.username.charAt(0).toUpperCase() : "?";

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-xl shadow-indigo-500/10 backdrop-blur-xl">
      <header className="flex flex-col items-center gap-5 text-center md:flex-row md:items-start md:text-left">
        <div className="relative grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 text-2xl font-semibold text-white shadow-lg shadow-indigo-500/30">
          {initial}
          <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border border-slate-900/80 bg-emerald-400 shadow shadow-emerald-500/30" />
        </div>
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-100">
            Profil
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">{user.username}</h2>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
              <LuUser className="h-4 w-4" /> @{user.pseudo}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
              <LuMail className="h-4 w-4" /> {user.email}
            </span>
          </div>
        </div>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-center text-sm text-slate-200 shadow-inner shadow-slate-950/40"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              {stat.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
