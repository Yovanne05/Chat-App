import { FC } from 'react';
import { AuthResponse } from "@/types/auth";
import { useLoginForm } from "@/app/login/hooks/useLoginForm";

interface LoginFormProps {
    onSuccess: (data: AuthResponse) => void;
    onError?: (error: Error) => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onSuccess, onError }) => {
    const {
        email,
        password,
        isLoading,
        setEmail,
        setPassword,
        handleSubmit,
    } = useLoginForm({ onSuccess, onError });

    return (
        <div className="flex items-center justify-center px-4">
            <div className="bg-white/5 backdrop-blur-sm p-10 rounded-2xl max-w-md w-full shadow-xl border border-white/10">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 block w-full rounded-xl bg-secondary-dark text-white border border-secondary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary-500 p-3 transition-all"
                            required
                            placeholder="Entrez votre email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 block w-full rounded-xl bg-secondary-dark text-white border border-secondary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary-500 p-3 transition-all"
                            required
                            placeholder="Entrez votre mot de passe"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 rounded-xl bg-secondary text-white text-base font-medium shadow-sm transition-all"
                    >
                        {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
