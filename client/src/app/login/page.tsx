"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import LoginForm from "@/app/login/components/login-form";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-4">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md space-y-8 p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-secondary">CONNEXION</h2>
        </div>

        <LoginForm onError={(error) => alert(error.message)} />

        <div className="text-center text-white">
          <button
            onClick={() => router.push("/register")}
            className="text-sm text-secondary focus:outline-none hover:underline transition"
          >
            Pas encore de compte ? S{"'"}inscrire
          </button>
        </div>
      </div>
    </div>
  );
}
