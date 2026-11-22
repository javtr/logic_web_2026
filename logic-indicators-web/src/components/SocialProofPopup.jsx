// src/components/SocialProofPopup.jsx
// =============================================================================
// POP-UP FLOTANTE DE PRUEBA SOCIAL (Estilo mensaje de WhatsApp "Logic User")
// =============================================================================
// - Ubicación: esquina inferior derecha encima de HelpWidget y ScrollToTopButton
//   (`bottom-[138px] right-4 sm:bottom-[156px] sm:right-6 z-30`).
//   HelpWidget usa `z-40` para que al abrir su menú quede por encima sin solaparse.
// - Rotación: muestra cada mensaje durante 30 segundos y rota entre los 6.
// - Cierre: botón X en la esquina superior derecha; persiste en sessionStorage
//   para no volver a mostrarse tras cerrarlo en la misma sesión.
// - i18n: textos desde t('common.socialProof') (EN / ES).
// =============================================================================

import { useState, useEffect } from 'react';
import { User, X } from 'lucide-react';
import { useLanguage } from '../context/languageContext';

const DISMISS_STORAGE_KEY = 'logic_social_proof_dismissed';
const INITIAL_DELAY_MS = 2500;
const ROTATION_INTERVAL_MS = 30000;
const SWAP_FADE_MS = 220;

// Fondo sutil beige estilo wallpaper de WhatsApp (100% inline SVG, 0 requests de red)
const CHAT_WALLPAPER_SVG = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" viewBox="0 0 84 84" fill="none">
    <path d="M12 18c4-3 10-3 13 1 2 3 1 7-2 9l-7 2 1-5c-3-1-6-4-5-7z" stroke="#ffffff" stroke-opacity="0.45" stroke-width="1.2"/>
    <circle cx="60" cy="20" r="6" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.2"/>
    <path d="M56 20l3 3 5-5" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.2"/>
    <path d="M22 58l4-8 4 8h-8z" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.2"/>
    <rect x="52" y="52" width="14" height="10" rx="2.5" stroke="#ffffff" stroke-opacity="0.42" stroke-width="1.2"/>
    <path d="M55 56h8M55 59h5" stroke="#ffffff" stroke-opacity="0.42" stroke-width="1.1"/>
  </svg>`
);

const readSessionDismissed = () => {
  try {
    return sessionStorage.getItem(DISMISS_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

export const SocialProofPopup = () => {
  const { t } = useLanguage();
  const socialProof = t('common.socialProof');
  const messages = Array.isArray(socialProof?.messages) ? socialProof.messages : [];

  const [isDismissed, setIsDismissed] = useState(readSessionDismissed);
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwapping, setIsSwapping] = useState(false);

  // Aparición suave tras el retardo inicial para no competir con el pintado principal
  useEffect(() => {
    if (isDismissed || messages.length === 0) return undefined;

    const showTimer = setTimeout(() => {
      setShouldRender(true);
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }, INITIAL_DELAY_MS);

    return () => clearTimeout(showTimer);
  }, [isDismissed, messages.length]);

  // Rotación cada 30 segundos entre los mensajes disponibles
  useEffect(() => {
    if (!shouldRender || isDismissed || messages.length <= 1) return undefined;

    let swapTimer;
    const interval = setInterval(() => {
      setIsSwapping(true);
      swapTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setIsSwapping(false);
      }, SWAP_FADE_MS);
    }, ROTATION_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      if (swapTimer) clearTimeout(swapTimer);
    };
  }, [shouldRender, isDismissed, messages.length]);

  const handleClose = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem(DISMISS_STORAGE_KEY, 'true');
    } catch {
      // Ignorar si sessionStorage está restringido
    }
    setTimeout(() => {
      setIsDismissed(true);
      setShouldRender(false);
    }, 300);
  };

  if (isDismissed || !shouldRender || messages.length === 0) {
    return null;
  }

  const activeMessage = messages[currentIndex % messages.length];

  return (
    <aside
      aria-label={socialProof?.sender || 'Logic User'}
      className={`
        fixed bottom-[136px] right-4 sm:bottom-[156px] sm:right-6 z-30
        w-[232px] sm:w-[276px] md:w-[296px] max-w-[calc(100vw-2rem)]
        rounded-xl overflow-hidden
        shadow-[0_12px_32px_rgba(0,0,0,0.5)] border border-black/30
        transition-all duration-300 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
    >
      {/* Cabecera verde WhatsApp + avatar + título + botón cerrar X */}
      <div className="bg-[#075E54] px-2.5 py-1.5 sm:px-3 sm:py-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1877f2] flex items-center justify-center shrink-0 ring-1 ring-white/25"
            aria-hidden="true"
          >
            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-white/95" />
          </span>
          <span className="text-white font-bold text-xs sm:text-sm tracking-tight truncate">
            {socialProof?.sender || 'Logic User'}
          </span>
        </div>

        <button
          type="button"
          onClick={handleClose}
          aria-label={socialProof?.closeAria || 'Close'}
          title={socialProof?.closeAria || 'Close'}
          className="p-1 -mr-1 rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-colors shrink-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/60"
        >
          <X size={15} strokeWidth={2.5} />
        </button>
      </div>

      {/* Cuerpo beige con textura y burbuja de mensaje entrante */}
      <div
        className="bg-[#ECE5DD] p-2 sm:p-3"
        style={{
          backgroundImage: `url("data:image/svg+xml,${CHAT_WALLPAPER_SVG}")`,
          backgroundSize: '84px 84px',
        }}
      >
        <div
          className={`
            relative ml-1.5 bg-white text-[#111b21]
            rounded-lg rounded-tl-none
            px-2.5 py-2 sm:px-3 sm:py-2.5
            shadow-[0_1px_2px_rgba(0,0,0,0.16)]
            transition-all duration-200 ease-out
            ${isSwapping ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}
          `}
        >
          {/* Cola triangular superior izquierda del globo de mensaje */}
          <svg
            viewBox="0 0 8 10"
            className="absolute -left-[7px] top-0 w-2 h-2.5 text-white"
            aria-hidden="true"
          >
            <path d="M8 0H0l8 10V0z" fill="currentColor" />
          </svg>

          <p className="text-[11px] sm:text-[12.5px] leading-[1.35] sm:leading-[1.4] font-medium text-[#111b21] break-words">
            {activeMessage}
          </p>
        </div>
      </div>
    </aside>
  );
};
