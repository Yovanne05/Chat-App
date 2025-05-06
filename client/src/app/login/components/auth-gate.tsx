"use client"
import dynamic from 'next/dynamic';
import {useAuth} from "@/app/login/hooks/useAuth";


const LoginPage = dynamic(() => import('@/app/login/page'));
const UsersPage = dynamic(() => import('@/app/friend/page'));

export default function AuthGate() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    return user ? <UsersPage /> : <LoginPage />;
}
