"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { removeAuthToken, setAuthToken, isAuthTokenInitialized } from '@/utils/auth';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(isAuthTokenInitialized());
    }, []);

    const login = (token: string) => {
        setAuthToken(token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        removeAuthToken();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};