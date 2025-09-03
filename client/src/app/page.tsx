"use client"

import {useAuth} from "@/components/auth/AuthContext";
import LoginPage from '@/app/login/page';
import UsersPage from '@/app/friend/page';

export default function Home() {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <UsersPage /> : <LoginPage />;
}