import { FC } from 'react';
import { AuthResponse } from "@/types/auth";
import { useRegisterForm } from "@/app/login/hooks/useRegisterForm";

interface RegisterFormProps {
    onSuccess: (data: AuthResponse) => void;
    onError?: (error: Error) => void;
}

const RegisterForm: FC<RegisterFormProps> = ({ onSuccess, onError }) => {
    const {
        formData,
        isLoading,
        handleChange,
        handleSubmit,
    } = useRegisterForm({ onSuccess, onError });

    return (
        <div className="flex items-center justify-center px-4">
            <div className="bg-white/5 backdrop-blur-sm p-10 rounded-2xl max-w-md w-full shadow-xl border border-white/10">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                            Nom utilisateur
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-xl bg-secondary-dark text-white border border-secondary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 transition-all"
                            required
                            placeholder="Entrez un nom d'utilisateur"
                        />
                    </div>
                    <div>
                        <label htmlFor="pseudo" className="block text-sm font-medium text-gray-300">
                            Pseudo
                        </label>
                        <input
                            id="pseudo"
                            name="pseudo"
                            type="text"
                            value={formData.pseudo}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-xl bg-secondary-dark text-white border border-secondary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 transition-all"
                            required
                            placeholder="Entrez un pseudo"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-xl bg-secondary-dark text-white border border-secondary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 transition-all"
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
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-xl bg-secondary-dark text-white border border-secondary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 transition-all"
                            required
                            placeholder="Créez un mot de passe"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 rounded-xl bg-secondary text-white text-base font-medium shadow-sm transition-all"
                    >
                        {isLoading ? 'Inscription en cours...' : 'S’inscrire'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
