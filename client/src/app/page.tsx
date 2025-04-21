"use client"

import { useEffect, useState } from 'react';
import { getAuthToken } from '@/utils/auth';
import LoginPage from '@/app/login/page';
import UsersPage from '@/app/friend/page';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = getAuthToken();
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    return <div>Chargement...</div>;
  }

  return isAuthenticated ? <UsersPage /> : <LoginPage />;
}
