// src/hooks/useAuth.js
// =============================================================================
// HOOK DE AUTENTICACIÓN
// =============================================================================
// Lee el token y el email guardados en localStorage por Login.jsx.
// Re-evalúa automáticamente cuando:
//   - cambia localStorage en otra pestaña (evento 'storage' nativo)
//   - se dispara el evento custom 'logic-auth-change' (mismo tab, después
//     de login/logout programático, para que React no se quede con el valor
//     viejo del snapshot inicial).
//
// API:
//   const { isAuthenticated, token, email, login, logout } = useAuth();
//
// Notas:
//   - Lee localStorage solo en el cliente (SPA pura, no hay SSR).
//   - La fuente de verdad sigue siendo el localStorage — el backend sigue
//     siendo quien valida el token en cada request.
// =============================================================================

import { useState, useEffect, useCallback } from 'react';

const TOKEN_KEY = 'logic_token';
const EMAIL_KEY = 'logic_user_email';
const AUTH_EVENT = 'logic-auth-change';

function readAuth() {
  // En SSR esto fallaría, pero el proyecto es SPA puro (Vite + React Router).
  // Aún así, blindamos por si en el futuro se mete SSR.
  if (typeof window === 'undefined') {
    return { isAuthenticated: false, token: null, email: null };
  }
  const token = localStorage.getItem(TOKEN_KEY);
  const email = localStorage.getItem(EMAIL_KEY);
  return {
    isAuthenticated: Boolean(token),
    token,
    email,
  };
}

export function useAuth() {
  // Lazy init: leemos una sola vez al montar el componente.
  const [state, setState] = useState(readAuth);

  useEffect(() => {
    // Sincroniza el estado de React con el localStorage actual.
    const sync = () => setState(readAuth());

    // 1) Cambio en otra pestaña/ventana
    window.addEventListener('storage', sync);
    // 2) Cambio en esta misma pestaña (login/logout programático)
    window.addEventListener(AUTH_EVENT, sync);

    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener(AUTH_EVENT, sync);
    };
  }, []);

  // Helpers para que Login.jsx y Dashboard.jsx puedan cambiar el estado
  // sin tocar localStorage a mano y olvidarse de disparar el evento.
  const login = useCallback((token, email) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(EMAIL_KEY, email);
    window.dispatchEvent(new Event(AUTH_EVENT));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EMAIL_KEY);
    window.dispatchEvent(new Event(AUTH_EVENT));
  }, []);

  return { ...state, login, logout };
}
