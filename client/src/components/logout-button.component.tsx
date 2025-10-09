"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function LogoutButton({
  className = "",
}: {
  className?: string;
}) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const baseClasses =
    "inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/40 transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 focus:ring-offset-slate-950";

  return (
    <button
      onClick={handleLogout}
      className={`${baseClasses} ${className}`.trim()}
      aria-label="Se deconnecter"
      type="button"
    >
      Se deconnecter
    </button>
  );
}
