// src/context/LanguageContext.jsx
import { createContext, useState, useContext } from 'react';
import { getDictionary, resolvePath, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../data';

// 1. Creamos el contexto
const LanguageContext = createContext();

// 2. Provider que envuelve la App
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const idx = SUPPORTED_LANGUAGES.indexOf(prev);
      const nextIdx = (idx + 1) % SUPPORTED_LANGUAGES.length;
      return SUPPORTED_LANGUAGES[nextIdx];
    });
  };

  const setLanguageByCode = (code) => {
    if (SUPPORTED_LANGUAGES.includes(code)) {
      setLanguage(code);
    }
  };

  const dictionary = getDictionary(language);

  // Función 't' para extraer texto con notación de puntos: t('home.suiteTitle')
  // Si no encuentra la clave, devuelve el path tal cual (mejor diagnóstico que undefined)
  const t = (path) => resolvePath(dictionary, path);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguageByCode, t, supportedLanguages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 3. Hook para consumir el contexto
export const useLanguage = () => useContext(LanguageContext);
