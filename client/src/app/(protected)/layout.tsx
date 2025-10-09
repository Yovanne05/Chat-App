"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SideBar from "./side_bar/side-bar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950/80">
        <div className="h-14 w-14 animate-spin rounded-full border-2 border-indigo-500/30 border-t-indigo-400"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SideBar />
      <main className="relative flex-1 overflow-y-auto bg-gradient-to-br from-slate-950/60 via-slate-900/50 to-slate-950/70 px-10 py-10">
        <div className="mx-auto flex h-full w-full max-w-6xl flex-col">
          {children}
        </div>
      </main>
    </div>
  );
}
