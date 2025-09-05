"use client"
import dynamic from 'next/dynamic';
import {useUserData} from "@/app/login/hooks/useUserData";

const LoginPage = dynamic(() => import('@/app/login/page'));
const UsersPage = dynamic(() => import('@/app/home/page'));

export default function AuthGate() {
    const { user, isLoading } = useUserData();

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    return user ? <UsersPage /> : <LoginPage />;
}
