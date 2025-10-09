"use client";

import { useRouter } from "next/navigation";
import { LuSparkles, LuShieldCheck } from "react-icons/lu";
import RegisterForm from "@/app/register/components/register-form";

export default function RegisterPage() {
  const router = useRouter();

  const handleAuthSuccess = () => {
    router.push("/home");
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center px-6 py-12">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,_rgba(168,85,247,0.35),_transparent_55%),radial-gradient(circle_at_85%_15%,_rgba(56,189,248,0.25),_transparent_60%)]" />

      <div className="relative z-10 grid w-full max-w-6xl gap-12 rounded-[32px] border border-white/10 bg-slate-950/65 p-12 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.85)] backdrop-blur-2xl md:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-purple-200">
              Commencez maintenant
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-5xl">
              Creez votre espace et profitez d{"'"}une messagerie taillee pour vos equipes.
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-300">
              Une plateforme moderne, elegante et securisee. Invitez vos contacts, organisez vos discussions et gardez le controle sans effort.
            </p>
          </div>

          <div className="mt-16 grid gap-4">
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-200">
              <LuSparkles className="h-5 w-5 text-indigo-300" />
              <div>
                <p className="font-semibold text-white">Experience raffinee</p>
                <p className="text-xs text-slate-300">
                  Interfaces minimalistes, animations douces et navigation intuitive.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-200">
              <LuShieldCheck className="h-5 w-5 text-emerald-300" />
              <div>
                <p className="font-semibold text-white">
                  Vos donnees restent privees
                </p>
                <p className="text-xs text-slate-300">
                  Authentification securisee, chiffrement de bout en bout et gestion simple des sessions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="mb-6 text-center text-2xl font-semibold text-white">
            Inscription
          </h2>
          <RegisterForm
            onSuccess={handleAuthSuccess}
            onError={(error) => alert(error.message)}
          />
          <div className="mt-6 text-center text-sm text-slate-300">
            <button
              onClick={() => router.push("/login")}
              className="inline-flex items-center justify-center rounded-full border border-transparent bg-white/10 px-6 py-2 font-semibold text-indigo-200 transition-all duration-200 hover:bg-white/20 hover:text-white"
            >
              Deja un compte ? Connectez-vous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
