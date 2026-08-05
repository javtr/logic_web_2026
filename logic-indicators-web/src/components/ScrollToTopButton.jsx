// src/components/ScrollToTopButton.jsx
//
// Botón flotante "Volver arriba". Aparece cuando el usuario scrollea más allá
// de un threshold (400px) y desaparece cuando está cerca del top. Al hacer
// click, scrollea al top de la página.
//
// Montar UNA vez en App.jsx para que esté disponible en TODAS las páginas.

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/languageContext';

// Umbral en píxeles: el botón aparece cuando window.scrollY > este valor.
// 400px es un buen balance: no aparece en páginas cortas, aparece rápido
// en páginas largas.
const SCROLL_THRESHOLD = 400;

export const ScrollToTopButton = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    // passive: true mejora performance — el browser sabe que no vamos a
    // llamar preventDefault(), así que puede hacer scroll más fluido.
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check inicial: si la página carga con scroll (ej. back del browser),
    // tenemos que evaluar el estado inmediatamente.
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    // Respetar prefers-reduced-motion: usuarios sensibles al movimiento
    // obtienen scroll instantáneo en vez de animado.
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={t('footer.backToTop')}
      className={`
        fixed bottom-6 right-6 z-40
        w-12 h-12 md:w-14 md:h-14
        rounded-full
        bg-accent-primary text-dark-900
        shadow-[0_4px_20px_theme(colors.accent.primary/30%)]
        hover:shadow-[0_6px_24px_theme(colors.accent.primary/40%)]
        hover:scale-110
        opacity-60 hover:opacity-100 focus-visible:opacity-100
        flex items-center justify-center
        transition-all duration-300 ease-out
        ${isVisible
          ? 'translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
        }
      `}
    >
      <ArrowUp size={22} strokeWidth={2.5} />
    </button>
  );
};
