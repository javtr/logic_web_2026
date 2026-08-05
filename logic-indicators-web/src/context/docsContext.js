// src/context/docsContext.js
// =============================================================================
// CONTEXTO DE DOCUMENTACIÓN — solo el contexto y el hook
// =============================================================================
// Separado del Provider (DocsProvider.jsx) para que Vite Fast Refresh pueda
// recargar el Provider sin perder el estado de los consumidores del hook.
// Si el contexto y el hook viven en el mismo archivo que el Provider,
// Fast Refresh hace un full reload en lugar de preservar state.
// =============================================================================
import { createContext, useContext } from 'react';

export const DocsContext = createContext(null);

/**
 * Hook para consumir el contexto de documentación.
 * Lanza error si se usa fuera de un DocsProvider (mejor fail-loud que
 * un null pointer silencioso en producción).
 */
export const useDocs = () => {
  const ctx = useContext(DocsContext);
  if (!ctx) {
    throw new Error('useDocs() debe usarse dentro de un <DocsProvider>');
  }
  return ctx;
};
