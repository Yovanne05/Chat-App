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
            className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-dark transition"
            aria-label="Se déconnecter"
        >
            Se déconnecter
        </button>
    )
}