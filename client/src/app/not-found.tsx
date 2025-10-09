import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center px-6 py-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_30%,_rgba(99,102,241,0.25),_transparent_55%),radial-gradient(circle_at_75%_20%,_rgba(14,165,233,0.18),_transparent_60%)]" />
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-6 rounded-[32px] border border-white/10 bg-white/5 px-12 py-14 text-center shadow-2xl shadow-indigo-500/20 backdrop-blur-2xl">
        <span className="text-sm font-semibold uppercase tracking-[0.4em] text-indigo-200">
          Erreur
        </span>
        <h1 className="text-7xl font-semibold text-white">404</h1>
        <p className="max-w-xl text-sm text-slate-300">
          Oups... la page que vous cherchez n{"'"}existe pas ou a peut-etre ete deplacee. Revenez a l{"'"}accueil pour poursuivre votre navigation.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl"
        >
          Retour a l{"'"}accueil
        </Link>
      </div>
    </div>
  );
}
