// src/components/TestimonialsCarousel.jsx
// Carrusel de testimonios para la sección "Trusted by Traders" / "La Confianza
// de los Traders" de la página Home.
//
// Lee el array desde `home.testimonials` (EN/ES) vía useLanguage().
// Responsive: 2 cards visibles en >= md, 1 card en < md (replica el grid
// md:grid-cols-2 que el usuario quería mantener).
//
// Comportamiento:
//   - Autoplay cada 6s (loop circular). Cada ciclo = 3s de transición de
//     slide + 3s estable, balanceado para que la animación se perciba
//     pero el testimonio se pueda leer.
//   - Transición CSS de 3000ms (ease-out) — el slide se desliza suavemente
//     durante 3 segundos al cambiar de posición.
//   - Pausa cuando el usuario hace hover o foco dentro del carrusel.
//   - Pausa manual con botón Play/Pause (queda en estado "pausado" hasta
//     que el usuario lo reanude, incluso si no está haciendo hover).
//   - Controles: Prev / Play-Pause / Next + dots indicator.
//
// Implementación:
//   - Track = flex row, ancho = (items / visibleCount) * 100% del viewport.
//     Cada card = (100 / items)% del track = (1 / visibleCount) del viewport.
//   - translateX se expresa como % del TRACK (no del viewport), porque
//     CSS transform con % es relativo al propio elemento. Así,
//     translateX(-X%) donde X = (safeIndex * 100 / items.length)
//     desliza exactamente safeIndex cards.
//
// Accesibilidad:
//   - role="region" + aria-roledescription="carousel".
//   - Cada slide con role="group" + aria-roledescription="slide".
//   - Botones con aria-label desde i18n.
//   - Respeta prefers-reduced-motion (transition se anula).

import { useState, useEffect } from 'react';
import { useLanguage } from '../context/languageContext';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const TRANSITION_MS = 3000;
const AUTOPLAY_MS = 6000;
const MD_BREAKPOINT = '(min-width: 768px)';

export const TestimonialsCarousel = () => {
  const { t } = useLanguage();
  const items = t('home.testimonials') || [];

  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window === 'undefined') return 2;
    return window.matchMedia(MD_BREAKPOINT).matches ? 2 : 1;
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isPaused = userPaused || isHovered;
  const stepCount = Math.max(1, items.length - visibleCount + 1);
  // Estado derivado: si activeIndex quedó fuera de rango por un resize, lo
  // clampeamos en render en vez de disparar un setState en useEffect.
  const safeIndex = Math.min(activeIndex, stepCount - 1);

  // Responsive: 2 cards en md+, 1 en móvil.
  useEffect(() => {
    const mq = window.matchMedia(MD_BREAKPOINT);
    const handler = (e) => setVisibleCount(e.matches ? 2 : 1);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Autoplay. Se cancela si está pausado, si no hay items, o si cambia stepCount.
  useEffect(() => {
    if (isPaused || items.length === 0) return undefined;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stepCount);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPaused, stepCount, items.length]);

  if (items.length === 0) return null;

  const advance = () => {
    setActiveIndex((prev) => (prev + 1) % stepCount);
  };
  const retreat = () => {
    setActiveIndex((prev) => (prev - 1 + stepCount) % stepCount);
  };
  const goTo = (i) => setActiveIndex(i);
  const togglePause = () => setUserPaused((prev) => !prev);

  // Geometría:
  //  - track width = (items.length / visibleCount) * 100% del viewport.
  //  - cada card = (100 / items.length)% del track = (1 / visibleCount) del viewport.
  //  - offset (en % del track) para mover safeIndex cards =
  //      safeIndex * (100 / items.length).
  //
  //  Esto es clave: translateX(-X%) es relativo al propio elemento track,
  //  no al viewport. Si el track mide (items/visibleCount)*100% del viewport,
  //  translateX(-X%) mueve X% del track = X% * (items/visibleCount) del viewport.
  //  Para mover exactamente safeIndex cards (= safeIndex * (1/visibleCount) del
  //  viewport) necesitamos X = safeIndex * 100 / items.length.
  const trackWidthPct = (items.length / visibleCount) * 100;
  const cardBasisPct = 100 / items.length;
  const offsetPct = (safeIndex * 100) / items.length;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={t('home.testimonialsTitle')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsHovered(false);
        }
      }}
    >
      {/* Viewport */}
      <div className="overflow-hidden">
        {/* Track — slide horizontal con CSS transition (más predecible que
            motion.div cuando offsetPct=0, donde transform quedaba en 'none'). */}
        <div
          className={`flex transition-transform ease-out motion-reduce:transition-none`}
          style={{
            width: `${trackWidthPct}%`,
            transform: `translateX(-${offsetPct}%)`,
            transitionDuration: `${TRANSITION_MS}ms`,
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${items.length}`}
              style={{ flex: `0 0 ${cardBasisPct}%` }}
              className="px-2 md:px-4"
            >
              <div className="p-5 md:p-8 rounded-2xl bg-dark-900 border border-dark-700 h-full">
                <p className="text-text-muted italic mb-3 md:mb-6 leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <h4 className="font-bold text-text-main">- {item.author}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controles */}
      <div className="flex items-center justify-center gap-2 mt-6 md:mt-8">
        <button
          type="button"
          onClick={retreat}
          aria-label={t('home.carouselPrev')}
          className="p-2 rounded-lg border border-dark-700 hover:border-dark-600 text-text-muted hover:text-text-main transition-colors focus:outline-none focus:ring-2 focus:ring-accent-secondary/50"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={togglePause}
          aria-label={userPaused ? t('home.carouselPlay') : t('home.carouselPause')}
          className="p-2 rounded-lg border border-dark-700 hover:border-dark-600 text-text-muted hover:text-text-main transition-colors focus:outline-none focus:ring-2 focus:ring-accent-secondary/50"
        >
          {userPaused ? <Play size={20} aria-hidden="true" /> : <Pause size={20} aria-hidden="true" />}
        </button>
        <button
          type="button"
          onClick={advance}
          aria-label={t('home.carouselNext')}
          className="p-2 rounded-lg border border-dark-700 hover:border-dark-600 text-text-muted hover:text-text-main transition-colors focus:outline-none focus:ring-2 focus:ring-accent-secondary/50"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {Array.from({ length: stepCount }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === safeIndex ? 'true' : undefined}
            className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-accent-secondary/50 ${
              i === safeIndex
                ? 'w-6 bg-accent-secondary'
                : 'w-2 bg-dark-700 hover:bg-dark-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};