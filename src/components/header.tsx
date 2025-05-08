// src/components/Header.tsx
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-400 shadow-md py-4 px-6 flex flex-col md:flex-row items-center justify-between">
      <a href="#player">
        <img
          src="/PATRIALIB.png"
          alt="RightTV Logo"
          className="h-20 w-auto mb-2 md:mb-0"
        />
      </a>

      <div className="flex items-center space-x-6">
        <nav className="flex space-x-4 text-sm md:text-base font-medium">
          <a
            href="#player"
            className="text-gray-700 hover:text-yellow-300 transition"
          >
            Início
          </a>
          <a
            href="#history"
            className="text-gray-700 hover:text-yellow-300 transition"
          >
            Histórico
          </a>
          <a
            href="#admin"
            className="text-gray-700 hover:text-yellow-300 transition"
          >
            Admin
          </a>
        </nav>

        {user && (
          <button
            onClick={logout}
            className="ml-4 text-red-600 hover:text-yellow-300 text-sm md:text-base transition"
          >
            Sair
          </button>
        )}
      </div>
    </header>
  );
}
