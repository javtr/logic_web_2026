// src/hooks/useUserName.js
// =============================================================================
// HOOK PARA OBTENER EL NOMBRE REAL DEL USUARIO
// =============================================================================
// El useAuth solo guarda token + email en localStorage (lo que el Login nos
// pasa). El nombre real ("Juan Pérez") lo devuelve el backend en el endpoint
// /portfolio que ya usa el Dashboard. La navbar no puede depender de que
// el Dashboard se monte primero, asi que este hook hace su propio fetch
// (con cache en localStorage para que la segunda visita sea instantanea).
//
// FLUJO:
//   1. Si NO esta autenticado: limpia el cache y devuelve { name: null }.
//   2. Si esta autenticado y hay cache en localStorage: lo devuelve al
//      instante, sin fetch.
//   3. Si esta autenticado y NO hay cache: fetch a /portfolio, guarda
//      data.nombre en localStorage, lo devuelve.
//
// MISMAS REGLAS QUE useAuth:
//   - AbortController para no pisar el estado si el componente se desmonta.
//   - 401 se ignora silenciosamente (el Dashboard maneja el redirect; la
//     navbar no deberia deslogear al usuario solo porque la API tarda).
//   - Errores de red se silencian: la navbar NO es critica, mejor mostrar
//     el email prefix como fallback que romper la UI.
// =============================================================================

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

const NAME_KEY = 'logic_user_name';
const PORTFOLIO_URL =
  'https://members.logicindicators.com/api/v1/members/portfolio';

function readCachedName() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(NAME_KEY);
}

export function useUserName() {
  const { isAuthenticated, token } = useAuth();
  const [name, setName] = useState(readCachedName);
  const [isLoading, setIsLoading] = useState(false);

  // Cuando el usuario cierra sesion, limpiamos el cache para que la
  // proxima cuenta no vea el nombre de la cuenta anterior.
  useEffect(() => {
    if (!isAuthenticated) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(NAME_KEY);
      }
      setName(null);
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Cuando esta autenticado, traer el nombre si no lo tenemos.
  useEffect(() => {
    if (!isAuthenticated || !token) return;

    // Cache hit: no fetchar, devolver el nombre guardado.
    const cached = readCachedName();
    if (cached) {
      setName(cached);
      return;
    }

    // Cache miss: fetch desde el backend.
    const abortController = new AbortController();
    setIsLoading(true);

    fetch(PORTFOLIO_URL, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      signal: abortController.signal,
    })
      .then((res) => {
        if (res.status === 401) return null; // token expirado, ignorar
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && typeof data.nombre === 'string' && data.nombre.trim()) {
          const trimmed = data.nombre.trim();
          localStorage.setItem(NAME_KEY, trimmed);
          setName(trimmed);
        }
      })
      .catch((err) => {
        // AbortError es esperado al desmontar. Cualquier otro error
        // (red, 500) se ignora silenciosamente: la navbar no es
        // critica, mejor mostrar fallback que romper la UI.
        if (err.name === 'AbortError') return;
        if (import.meta.env.DEV) {
          console.warn('[useUserName] fetch fallo, fallback a email prefix:', err.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => abortController.abort();
  }, [isAuthenticated, token]);

  return { name, isLoading };
}
