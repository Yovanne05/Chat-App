"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LuCheck } from "react-icons/lu";
import LoginForm from "@/app/login/components/login-form";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center px-6 py-12">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.3),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.18),_transparent_45%)]" />

      <div className="relative z-10 grid w-full max-w-6xl gap-10 rounded-[32px] border border-white/10 bg-slate-950/60 p-12 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.8)] backdrop-blur-2xl md:grid-cols-[1.15fr_1fr]">
        <div className="flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-200">
              Bienvenue
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-5xl">
              Connectez-vous et reprenez vos conversations en toute simplicite.
            </h1>
            <p className="mt-4 max-w-lg text-base text-slate-300">
              Une experience fluide et lumineuse pour rester proche de vos amis et collaborateurs, ou que vous soyez.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-4 text-sm text-slate-300 sm:grid-cols-2">
            {[
              "Interface claire et ultra rapide",
              "Conversations synchronisees en temps reel",
              "Theme moderne adapte a toutes les tailles d'ecran",
              "Securite renforcee et controle simple du compte",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <LuCheck className="h-5 w-5 text-emerald-300" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="mb-6 text-center text-2xl font-semibold text-white">
            Connexion
          </h2>
          <LoginForm onError={(error) => alert(error.message)} />
          <div className="mt-6 text-center text-sm text-slate-300">
            <button
              onClick={() => router.push("/register")}
              className="inline-flex items-center justify-center rounded-full border border-transparent bg-white/10 px-6 py-2 font-semibold text-indigo-200 transition-all duration-200 hover:bg-white/20 hover:text-white"
            >
              Pas encore de compte ? Inscrivez-vous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
