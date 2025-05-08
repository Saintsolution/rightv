import { useAuth } from '../contexts/AuthContext';
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-10">Carregando...</div>;
  }

  if (!user) {
    window.location.hash = '#login';
    return null;
  }

  return <>{children}</>;
}
