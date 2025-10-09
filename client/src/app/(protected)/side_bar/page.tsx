"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import SideBar from "./side-bar";

export default function SideBarPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <SideBar />
      <div className="flex flex-1 items-center justify-center p-12">
        <div className="max-w-lg rounded-3xl border border-white/10 bg-white/5 px-10 py-12 text-center shadow-2xl shadow-indigo-500/20 backdrop-blur-2xl">
          <h1 className="text-3xl font-semibold text-white">
            Barre laterale interactive
          </h1>
          <p className="mt-4 text-sm text-slate-300">
            Survolez la barre pour afficher les intitules des sections et decouvrez une navigation moderne et reactive.
          </p>
        </div>
      </div>
    </div>
  );
}
