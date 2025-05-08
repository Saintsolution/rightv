import React, { useState, FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const redirectTo = (path: string) => {
    window.location.hash = path;
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const user = await login(email, password);

      if (!user?.confirmed_at && !user?.email_confirmed_at) {
        setErrorMessage(
          'Você precisa confirmar seu e-mail antes de fazer login.'
        );
        return;
      }

      const normalizedEmail = email.trim().toLowerCase();
      if (normalizedEmail === 'fccmauro@gmail.com') {
        redirectTo('#admin');
      } else {
        redirectTo('#player');
      }
    } catch (error: any) {
      setErrorMessage(
        error.message === 'Invalid login credentials'
          ? 'Email ou senha inválidos. Tente novamente.'
          : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green px-4">
      <img
        src="/PATRIALIB.png"
        alt="RightTV Logo"
        className="w-32 h-auto mb-6"
      />

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">RightTV - Login</h2>

        {errorMessage && (
          <div
            role="alert"
            className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg"
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p className="mb-2">
            Não tem conta?{' '}
            <a href="#register" className="text-blue-500 hover:text-blue-700">
              Registrar
            </a>
          </p>
          <p>
            <a
              href="#reset-password"
              className="text-blue-500 hover:text-blue-700"
            >
              Esqueceu a senha?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
