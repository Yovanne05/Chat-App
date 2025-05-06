'use client'

import { useEffect, useState } from 'react'
import { isAuthTokenInitialized } from '@/utils/auth'
import { LogoutButton } from './LogoutButton'

export function AuthStatus() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        setIsAuthenticated(isAuthTokenInitialized())
    }, [])

    if (!isAuthenticated) return null

    return (
        <div className="fixed top-4 right-4 z-50">
            <LogoutButton />
        </div>
    )
}
