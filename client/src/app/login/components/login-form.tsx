import { FC } from 'react';
import { useLoginForm } from "@/app/login/hooks/useLoginForm";

interface LoginFormProps {
    onError?: (error: Error) => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onError }) => {
    const {
        email,
        password,
        isLoading,
        setEmail,
        setPassword,
        handleSubmit,
    } = useLoginForm({ onError });

    return (
        <div className="flex w-full items-center justify-center px-4">
            <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-12 shadow-xl shadow-indigo-500/20 backdrop-blur-xl">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-semibold uppercase tracking-wide text-slate-200">
                            Email
                        </label>
                        <input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 transition-all duration-200"
                            required
                            placeholder="Entrez votre email"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-semibold uppercase tracking-wide text-slate-200">
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 transition-all duration-200"
                            required
                            placeholder="Entrez votre mot de passe"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:scale-[1.01] hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
