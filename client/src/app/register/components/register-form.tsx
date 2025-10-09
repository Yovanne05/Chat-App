import { FC } from "react";
import { useRegisterForm } from "@/app/login/hooks/useRegisterForm";
import { UserModel } from "@/models/user.model";

interface RegisterFormProps {
  onSuccess: (data: UserModel) => void;
  onError?: (error: Error) => void;
}

const RegisterForm: FC<RegisterFormProps> = ({ onSuccess, onError }) => {
  const { formData, isLoading, handleChange, handleSubmit } = useRegisterForm({
    onSuccess,
    onError,
  });

  return (
    <div className="flex w-full items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-12 shadow-2xl shadow-indigo-500/20 backdrop-blur-xl">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-semibold uppercase tracking-wide text-slate-200"
            >
              Nom utilisateur
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="block w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-500 transition-all duration-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
              required
              placeholder="Entrez un nom d'utilisateur"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="pseudo"
              className="text-sm font-semibold uppercase tracking-wide text-slate-200"
            >
              Pseudo
            </label>
            <input
              id="pseudo"
              name="pseudo"
              type="text"
              value={formData.pseudo}
              onChange={handleChange}
              className="block w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-500 transition-all duration-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
              required
              placeholder="Entrez un pseudo"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold uppercase tracking-wide text-slate-200"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-500 transition-all duration-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
              required
              placeholder="Entrez votre email"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold uppercase tracking-wide text-slate-200"
            >
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-500 transition-all duration-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
              required
              placeholder="Creez un mot de passe"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:scale-[1.01] hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Inscription en cours..." : "S'inscrire"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
