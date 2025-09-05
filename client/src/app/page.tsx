"use client";

import { useAuth } from "@/components/auth/AuthContext";
import LoginPage from "@/app/login/page";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="flex">
      <main>{children}</main>
    </div>
  );
}
