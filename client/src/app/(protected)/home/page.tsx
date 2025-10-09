"use client";

import Link from "next/link";
import { LuMessageSquare, LuSettings, LuUsers } from "react-icons/lu";

const highlights = [
  {
    title: "Discussions instantanees",
    description:
      "Echangez en temps reel avec toutes vos equipes depuis une interface claire et reactive.",
    icon: LuMessageSquare,
    href: "/messages",
  },
  {
    title: "Gestion simplifiee",
    description:
      "Personnalisez vos preferences et gardez le controle sur la securite de votre compte.",
    icon: LuSettings,
    href: "/settings",
  },
  {
    title: "Contacts organises",
    description:
      "Retrouvez vos amis et collaborateurs en un clin d'oeil, et lancez vos conversations en un clic.",
    icon: LuUsers,
    href: "/messages",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="rounded-[32px] border border-white/10 bg-white/5 px-10 py-12 shadow-2xl shadow-indigo-500/20 backdrop-blur-2xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-100">
              Tableau de bord
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-5xl">
              Bienvenue sur votre espace Pulse.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-slate-300">
              Retrouvez vos conversations, accedez aux parametres essentiels et suivez votre activite en un clin d{"'"}oeil. Tout est pense pour rester simple, lumineux et moderne.
            </p>
          </div>
          <Link
            href="/messages"
            className="inline-flex items-center justify-center rounded-full border border-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl"
          >
            Ouvrir les messages
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {highlights.map(({ title, description, icon: Icon, href }) => (
          <Link
            key={title}
            href={href}
            className="group flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-indigo-500/10 transition-all duration-200 hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-white/10"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/5 bg-white/10 text-indigo-200 transition-colors duration-200 group-hover:bg-indigo-500/20 group-hover:text-white">
              <Icon className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="text-sm text-slate-300">{description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
