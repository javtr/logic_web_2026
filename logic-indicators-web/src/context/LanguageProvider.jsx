// src/context/LanguageProvider.jsx
// =============================================================================
// LANGUAGE PROVIDER — solo el componente Provider
// =============================================================================
// Resolucion del idioma inicial (prioridad de 3 niveles):
//   1) localStorage['logic-preferred-language'] (decision explicita del usuario)
//   2) navigator.language (auto-deteccion: si es* -> 'es', sino siguiente tier)
//   3) fallback 'en'
//
// La deteccion se hace via lazy init de useState, asi esta lista en el
// primer render sin "flash" de idioma equivocado.
//
// Persistencia: cada cambio de idioma (setLanguageByCode / toggleLanguage)
// guarda en localStorage. Asi si se agrega otro switcher en el futuro, la
// persistencia es transparente.
//
// Try/catch alrededor de localStorage: si esta deshabilitado (modo
// incognito, extensiones agresivas), la app sigue funcionando, solo no
// persiste entre sesiones.
// =============================================================================
import { useState } from 'react';
import { getDictionary, resolvePath, SUPPORTED_LANGUAGES } from '../data';
import { LanguageContext } from './languageContext';

// Clave de localStorage. Namespace con "logic-" para evitar choques
// con otras apps en el mismo dominio (no es probable, pero buena practica).
const LANGUAGE_STORAGE_KEY = 'logic-preferred-language';

// Hardcoded 'en' como fallback final del tier 3 (no DEFAULT_LANGUAGE).
// Razon: el usuario quiere "browser es -> es, todo lo demas -> en".
// Si en el futuro se agrega DEFAULT_LANGUAGE=fr y se quiere fallback=fr,
// esto se vuelve a tocar.
const NON_SPANISH_FALLBACK = 'en';

// Resuelve el idioma inicial con prioridad de 3 niveles.
function getInitialLanguage() {
  // Tier 1: localStorage. Validamos contra SUPPORTED_LANGUAGES por si
  // quedo basura de antes o alguien lo edito a mano.
  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
        return stored;
      }
    } catch {
      // localStorage deshabilitado -> caemos al siguiente tier.
    }
  }

  // Tier 2: navegador. startsWith('es') cubre es, es-AR, es-MX, es-CO, etc.
  if (typeof navigator !== 'undefined' && navigator.language) {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('es')) return 'es';
  }

  // Tier 3: fallback final.
  return NON_SPANISH_FALLBACK;
}

// Wrapper para guardar en localStorage. Try/catch por si esta deshabilitado.
function persistLanguage(lang) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch {
    // Silencioso. El idioma sigue funcionando en memoria, solo no persiste.
  }
}

export const LanguageProvider = ({ children }) => {
  // Lazy init: getInitialLanguage() corre solo en el mount.
  const [language, setLanguage] = useState(() => getInitialLanguage());

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const idx = SUPPORTED_LANGUAGES.indexOf(prev);
      const nextIdx = (idx + 1) % SUPPORTED_LANGUAGES.length;
      const next = SUPPORTED_LANGUAGES[nextIdx];
      persistLanguage(next);
      return next;
    });
  };

  const setLanguageByCode = (code) => {
    if (SUPPORTED_LANGUAGES.includes(code)) {
      setLanguage(code);
      persistLanguage(code);
    }
  };

  const dictionary = getDictionary(language);

  // Funcion 't' para extraer texto con notacion de puntos: t('home.suiteTitle')
  // Si no encuentra la clave, devuelve el path tal cual (mejor diagnostico que undefined)
  const t = (path) => resolvePath(dictionary, path);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguageByCode, t, supportedLanguages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};
