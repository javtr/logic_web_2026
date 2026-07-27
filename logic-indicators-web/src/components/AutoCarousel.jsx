// src/components/AutoCarousel.jsx
// =============================================================================
// CAROUSEL AUTOMÁTICO SIN CONTROLES
// =============================================================================
// Cross-fade entre imágenes cada `interval` ms. Sin dots, sin prev/next, sin
// pause button. Pensado para mostrar las contentImages de un indicador en
// una card de Home o /indicators sin distraer al usuario.
//
// Comportamiento:
//   - 0 imágenes  → null
//   - 1 imagen    → render directo de ZoomableImage (no tiene sentido rotar)
//   - 2+ imágenes → carousel con cross-fade
//
// Interacción:
//   - Hover (mouseenter) pausa el auto-advance
//   - Mouseleave retoma desde donde quedó
//   - Click en la imagen visible → abre el lightbox (vía ZoomableImage)
//   - Solo la imagen con opacity-100 recibe pointer events; las demás están
//     con pointer-events-none para que el click siempre abra el lightbox de
//     la imagen visible, no de una oculta.
//
// Nota: NO se respeta prefers-reduced-motion (decisión del usuario, 2026-07-27).
// El carousel siempre rota. Si más adelante se quiere respetar, hay que volver
// a agregar el check de matchMedia y el state `reducedMotion`.
//
// Performance:
//   - El re-render es solo un cambio de índice (state), opacidad es
//     GPU-composited (transition-opacity duration-700).
//   - El timer vive en un useRef para no causar renders extra.
//   - setInterval se limpia en el return del useEffect (no leak).
//   - Pointer events via Tailwind (`pointer-events-auto`/`-none`) — no JS extra.
// =============================================================================
import { useState, useEffect, useRef } from 'react';
import { ZoomableImage } from './ImageLightbox';

const DEFAULT_INTERVAL_MS = 4500;

export const AutoCarousel = ({
  images,
  alt,
  interval = DEFAULT_INTERVAL_MS,
  className = '',
  imageClassName = '',
}) => {
  const list = Array.isArray(images) ? images.filter(Boolean) : [];
  const count = list.length;

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  // Auto-advance: solo si hay 2+ imágenes y no está pausado por hover.
  useEffect(() => {
    if (count < 2 || paused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrent((i) => (i + 1) % count);
    }, interval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [count, paused, interval]);

  // 0 imágenes: nada que renderizar.
  if (count === 0) return null;

  // 1 imagen: sin animación, no tiene sentido rotar. Pero seguimos dando
  // lightbox al click.
  if (count === 1) {
    return (
      <div className={className}>
        <ZoomableImage
          src={list[0]}
          alt={alt}
          className={imageClassName}
        />
      </div>
    );
  }

  // 2+ imágenes: cross-fade.
  return (
    <div
      className={`relative w-full h-full ${className}`}
      aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {list.map((src, i) => (
        <ZoomableImage
          key={`${src}-${i}`}
          src={src}
          alt={`${alt} ${i + 1}`}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
            i === current ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          } ${imageClassName}`}
        />
      ))}
    </div>
  );
};
