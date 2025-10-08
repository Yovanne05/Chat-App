"use client";

import { useRouter } from "next/navigation";
import RegisterForm from "@/app/register/components/register-form";

export default function RegisterPage() {
    const router = useRouter();

    const handleAuthSuccess = () => {
        router.push("/home");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full p-4">
            <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md space-y-8 p-8 rounded-2xl shadow-xl">
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold text-secondary">
                        INSCRIPTION
                    </h2>
                </div>

                <RegisterForm
                    onSuccess={handleAuthSuccess}
                    onError={(error) => alert(error.message)}
                />

                <div className="text-center text-white">
                    <button
                        onClick={() => router.push("/login")}
                        className="text-sm text-secondary focus:outline-none hover:underline transition"
                    >
                        Déjà un compte ? Se connecter
                    </button>
                </div>
            </div>
        </div>
    );
}
