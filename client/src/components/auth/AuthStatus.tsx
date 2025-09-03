'use client'

import {useAuth} from "@/components/auth/AuthContext";
import { LogoutButton } from './LogoutButton'

export function AuthStatus() {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) return null

    return (
        <div className="fixed top-4 right-4 z-50">
            <LogoutButton />
        </div>
    )
}