"use client"

import { useState } from 'react';
import { useRouter } from "next/navigation";
import LoginForm from "@/app/login/components/login-form";
import RegisterForm from "@/app/login/components/register-form";
import { AuthResponse } from "@/types/auth";
import { setAuthToken } from "@/utils/auth";

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    const handleAuthSuccess = (data: AuthResponse) => {
        setAuthToken(data.token);
        router.push('/');
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-black bg-cover bg-no-repeat"
              style={{ backgroundImage: "url('https://your-background-image-url.com')" }}>
            <div className="w-full max-w-2xl space-y-8 bg-black bg-opacity-60 p-8 rounded-lg shadow-lg">
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold text-white">{isLogin ? 'Connexion' : 'Inscription'}</h2>
                </div>
                {isLogin ? (
                    <LoginForm
                        onSuccess={handleAuthSuccess}
                        onError={(error) => alert(error.message)}
                    />
                ) : (
                    <RegisterForm
                        onSuccess={handleAuthSuccess}
                        onError={(error) => alert(error.message)}
                    />
                )}
                <div className="text-center text-white">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                        {isLogin
                            ? 'Pas de compte ? S\'inscrire'
                            : 'Déjà un compte ? Se connecter'}
                    </button>
                </div>
            </div>
        </main>
    );
}
