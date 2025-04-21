"use client"

import { useState } from 'react';
import {useRouter} from "next/navigation";
import LoginForm from "@/app/login/components/login-form";
import RegisterForm from "@/app/login/components/register-form";
import {AuthResponse} from "@/types/auth";
import {setAuthToken} from "@/utils/auth";

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    const handleAuthSuccess = (data: AuthResponse) => {
        setAuthToken(data.token);
        router.push('/');
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        {isLogin ? 'Connexion' : 'Inscription'}
                    </h2>
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
                <div className="text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm text-blue-600 hover:text-blue-800"
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
