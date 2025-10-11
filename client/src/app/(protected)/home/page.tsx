"use client";
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
        </div>
      </section>
    </div>
  );
}
