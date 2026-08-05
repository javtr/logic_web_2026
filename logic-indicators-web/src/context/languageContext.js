// src/context/languageContext.js
// =============================================================================
// CONTEXTO DE IDIOMA — solo el contexto y el hook
// =============================================================================
// Separado del Provider (LanguageProvider.jsx) para que Vite Fast Refresh
// pueda recargar el Provider sin perder el estado de los consumidores
// del hook. Si el contexto y el hook viven en el mismo archivo que el
// Provider, Fast Refresh hace un full reload en lugar de preservar state.
// =============================================================================
import { createContext, useContext } from 'react';

export const LanguageContext = createContext();

// Hook para consumir el contexto. Lo usan todos los componentes que
// necesitan t() o language.
export const useLanguage = () => useContext(LanguageContext);
