"use client";

import { useAuth } from "@/components/auth/AuthContext";
import LoginPage from "@/app/login/page";
import SideBar from "./side_bar/page";

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
      <SideBar />
      <main>{children}</main>
    </div>
  );
}
