'use client'

import { useRouter } from 'next/navigation'
import {useAuth} from "@/components/auth/AuthContext";

export function LogoutButton({ className = '' }: { className?: string }) {
    const router = useRouter()
    const { logout } = useAuth()

    const handleLogout = () => {
        logout()
        router.push('/login')
    }

    return (
        <button
            onClick={handleLogout}
            className={`px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition ${className}`}
            aria-label="Se déconnecter"
        >
            Se déconnecter
        </button>
    )
}