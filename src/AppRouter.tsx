
import { useEffect, useState } from 'react';
import { Player } from './pages/player';
import { Admin } from './pages/admin';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { History } from './pages/history';
import { Header } from './components/header';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';
import { ResetPassword } from './pages/ResetPassword';

export function AppRouter() {
  const { user, loading } = useAuth();
  const [path, setPath] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setPath(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (loading) return <p className="text-center p-8">Carregando...</p>;

  let content = null;
  switch (path) {
    case '#register':
      content = <Register />;
      break;
    case '#player':
      content = (
        <ProtectedRoute>
          <Player />
        </ProtectedRoute>
      );
      break;
    case '#admin':
      content = (
        <ProtectedRoute>
          {user?.email === 'fccmauro@gmail.com' ? <Admin /> : <Player />}
        </ProtectedRoute>
      );
      break;
    case '#history':
      content = (
        <ProtectedRoute>
          <History />
        </ProtectedRoute>
      );
      break;
    case '#reset-password':
      content = <ResetPassword />;
      break;
    case '#login':
    default:
      content = user ? <Player /> : <Login />;
      break;
  }

  return (
    <>
      {user && !['#login', '#register', '#reset-password'].includes(path) && <Header />}
      {content}
    </>
  );
}