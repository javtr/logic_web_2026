// src/components/LanguageSwitcher.jsx
// =============================================================================
// SWITCHER DE IDIOMA — ES ⇄ EN
// =============================================================================
// Componente compacto, un solo botón que toggle entre los idiomas
// soportados (definidos en src/data/index.js → SUPPORTED_LANGUAGES).
//
// Usado en:
//   - Navbar (desktop y mobile) — versión primary pill
//   - DocsLayout (cuando showHomeButton=true) — versión inline, al
//     lado del botón "Volver al inicio"
//
// Usa setLanguageByCode en lugar de toggleLanguage para soportar más
// de 2 idiomas en el futuro sin tener que cambiar este componente.
// =============================================================================

import { Globe } from 'lucide-react';
import { useLanguage } from '../context/languageContext';

const LABEL_BY_CODE = {
  es: 'ES',
  en: 'EN',
};

export const LanguageSwitcher = ({ className = '' }) => {
  const { t, language, setLanguageByCode, supportedLanguages } = useLanguage();

  // Si el actual es el último, vuelve al primero; si no, va al siguiente.
  // Funciona con 2 o más idiomas.
  const handleToggle = () => {
    const idx = supportedLanguages.indexOf(language);
    const next = supportedLanguages[(idx + 1) % supportedLanguages.length];
    setLanguageByCode(next);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={t('common.languageSwitcher.aria').replace('{lang}', language.toUpperCase())}
      className={`
        inline-flex items-center gap-1.5
        px-3 py-1 rounded-full
        bg-dark-700
        text-xs font-semibold
        text-text-muted hover:text-text-main
        transition-all
        ${className}
      `}
    >
      <Globe size={13} />
      {LABEL_BY_CODE[language] || language.toUpperCase()}
    </button>
  );
};
