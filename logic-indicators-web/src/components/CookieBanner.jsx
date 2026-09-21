// src/components/CookieBanner.jsx
// =============================================================================
// BANNER / TARJETA FLOTANTE DE CONSENTIMIENTO DE COOKIES
// =============================================================================
// - Ubicación: bottom-left (bottom-4 left-4 en móvil, sm:bottom-6 sm:left-6 sm:max-w-md)
//   para no colisionar con ScrollToTopButton y HelpWidget en bottom-right.
// - Persistencia: guarda en localStorage bajo 'logic_cookie_consent' ('all' | 'essential').
//   También reconoce la clave histórica 'cookiesAccepted' para usuarios recurrentes.
// - Acciones:
//     * "Aceptar todas"   -> guarda 'all'
//     * "Solo necesarias" -> guarda 'essential'
// - Animación: entrada suave tras 1.5s y salida con fade-out al responder.
// =============================================================================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';
import { useLanguage } from '../context/languageContext';

const CONSENT_STORAGE_KEY = 'logic_cookie_consent';
const LEGACY_STORAGE_KEY = 'cookiesAccepted';

export const CookieBanner = () => {
  const { t } = useLanguage();
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Comprobar si ya existe consentimiento previo
    try {
      const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
      const legacyConsent = localStorage.getItem(LEGACY_STORAGE_KEY);

      if (storedConsent || legacyConsent) {
        return;
      }
    } catch {
      // localStorage deshabilitado: no mostramos o manejamos en memoria
      return;
    }

    // Retardo inicial de 1.5s para no competir con el LCP de la página
    const timer = setTimeout(() => {
      setShouldRender(true);
      // Pequeño delay de 50ms para que la animación de entrada se active
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleConsent = (type) => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, type);
    } catch {
      // localStorage bloqueado en navegador
    }

    // Animar salida y luego desmontar
    setIsVisible(false);
    setTimeout(() => {
      setShouldRender(false);
    }, 400);
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <aside
      aria-label={t('cookies.cookieAria') || 'Configuración de cookies'}
      className={`
        fixed bottom-4 left-4 right-4 sm:right-auto sm:bottom-6 sm:left-6
        w-auto sm:max-w-md z-50
        transition-all duration-400 ease-out
        ${isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
        }
      `}
    >
      <div className="bg-dark-900/95 backdrop-blur-md border border-dark-700/90 shadow-2xl rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5">
        {/* Cabecera con icono */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent-primary/15 text-accent-primary flex items-center justify-center shrink-0">
            <Cookie size={18} strokeWidth={2.2} />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-text-main leading-tight">
            {t('cookies.title')}
          </h3>
        </div>

        {/* Descripción y enlace a políticas */}
        <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
          {t('cookies.description')}{' '}
          <Link
            to="/privacy"
            className="text-accent-primary hover:underline font-medium inline-flex items-center"
          >
            {t('cookies.privacyLinkText')}
          </Link>
          .
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={() => handleConsent('essential')}
            className="px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl border border-dark-600 bg-dark-800/80 text-text-muted hover:text-text-main hover:bg-dark-700 transition-colors text-center cursor-pointer"
          >
            {t('cookies.onlyEssential')}
          </button>
          <button
            type="button"
            onClick={() => handleConsent('all')}
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-accent-primary text-dark-900 hover:brightness-110 shadow-[0_2px_12px_theme(colors.accent.primary/25%)] transition-all text-center cursor-pointer"
          >
            {t('cookies.acceptAll')}
          </button>
        </div>
      </div>
    </aside>
  );
};
