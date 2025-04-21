import { FC, useState } from 'react';
import { AuthResponse } from "@/types/auth";
import { login } from "@/services/authService";

interface LoginFormProps {
    onSuccess: (data: AuthResponse) => void;
    onError?: (error: Error) => void;
}

const LoginForm: FC<LoginFormProps> = ({ onSuccess, onError }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await login({ email, password });
            onSuccess(response);
        } catch (error) {
            onError?.(error as Error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center bg-black bg-cover bg-no-repeat border">
            <div className="bg-black bg-opacity-70 p-8 rounded-xl max-w-md w-full shadow-lg">
                <h2 className="text-4xl font-bold text-white text-center mb-8">Se connecter</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full rounded-md bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 p-4"
                            required
                            placeholder="Entrez votre email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Mot de passe</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 p-4"
                            required
                            placeholder="Entrez votre mot de passe"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 rounded-md bg-red-600 text-white text-lg font-medium transition-all duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-red-400"
                    >
                        {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
