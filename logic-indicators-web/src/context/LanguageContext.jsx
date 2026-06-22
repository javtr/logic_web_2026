// src/context/LanguageContext.jsx
import { createContext, useState, useContext } from 'react';
import { translations } from '../language/translations';

// 1. Creamos el contexto
const LanguageContext = createContext();

// 2. Creamos el Provider que envolverá nuestra App
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Inglés por defecto

  // Función para cambiar el idioma
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'es' : 'en'));
  };

  // Función 't' para extraer el texto exacto del diccionario usando notación de puntos (ej: t('nav.login'))
  const t = (path) => {
    return path.split('.').reduce((obj, key) => (obj && obj[key] ? obj[key] : path), translations[language]);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 3. Hook personalizado para consumir el contexto fácilmente
export const useLanguage = () => useContext(LanguageContext);