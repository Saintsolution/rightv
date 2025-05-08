// src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './AppRouter';
import { AuthProvider } from './contexts/AuthContext';
import './style.css'; // importa o CSS corretamente

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Elemento com id 'root' não encontrado!");
}

const root = createRoot(rootElement);
root.render(
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
);
