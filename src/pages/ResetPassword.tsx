import { useState, FormEvent } from 'react';
import { supabase } from '../supabaseClient';

export function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset',
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage(
        'Instruções para redefinir a senha foram enviadas por e-mail.'
      );
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
        <h2 className="text-2xl font-bold mb-6 text-center">Recuperar Senha</h2>

        {message && <div className="text-green-600 mb-4">{message}</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Enviar link de recuperação
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          <a href="#login" className="text-blue-500 hover:underline">
            Voltar ao login
          </a>
        </p>
      </div>
    </div>
  );
}
