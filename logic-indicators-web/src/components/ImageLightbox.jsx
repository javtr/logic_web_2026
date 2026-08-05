// src/components/ImageLightbox.jsx
// Lightbox reusable para hacer zoom en imágenes en mobile.
//
// Uso: <ZoomableImage src="..." alt="..." className="..." />
//
// Gestos soportados dentro del lightbox:
//   - Pinch (2 dedos)    → zoom continuo entre 1x y 4x
//   - Doble tap          → alterna entre 1x y 2.5x
//   - Drag (1 dedo)      → pan cuando la imagen está ampliada
//   - Tap en el fondo    → cierra
//   - Tap en la X        → cierra
//   - Tecla ESC          → cierra
//
// Performance: usa `transform: translate3d + scale` (GPU), `touch-action: none`,
// `will-change: transform`, y un ref para el estado de gestos para no re-renderizar
// en cada touchmove. El body se bloquea (overflow:hidden) mientras el lightbox está abierto.
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useLanguage } from '../context/languageContext';

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.5;
const DOUBLE_TAP_MS = 300;
const DOUBLE_TAP_PX = 30;
const TAP_MOVE_PX = 10;

/**
 * Drop-in replacement de <img> que abre un lightbox al hacer click/tap.
 * Acepta las mismas props que <img> (className, loading, etc.).
 */
export const ZoomableImage = ({
  src,
  alt,
  className = "",
  loading = "lazy",
  ...rest
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        loading={loading}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className={`cursor-zoom-in ${className}`}
        {...rest}
      />
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  );
};

const Lightbox = ({ src, alt, onClose }) => {
  const { t } = useLanguage();
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  // Estado de gestos: vive en un ref para no causar re-renders en cada touchmove.
  const gesture = useRef({
    pointers: new Map(), // pointerId -> {x,y}
    initialDistance: 0,
    initialScale: 1,
    isPanning: false,
    panStart: { x: 0, y: 0 },
    translateAtStart: { x: 0, y: 0 },
    lastTapTime: 0,
    lastTapPos: { x: 0, y: 0 },
    tapMoved: false,
    startPos: { x: 0, y: 0 },
  });

  const closeBtnRef = useRef(null);

  // Bloquear scroll del body mientras el lightbox está abierto
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.overscrollBehavior = prevOverscroll;
    };
  }, []);

  // ESC cierra
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Autofocus en el botón cerrar (a11y)
  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  // Límite de pan en función del zoom y el viewport.
  // A scale=1, maxX/maxY = 0 (no hay pan). Crece linealmente con (scale-1).
  const panBounds = (s) => ({
    maxX: (s - 1) * (window.innerWidth * 0.5),
    maxY: (s - 1) * (window.innerHeight * 0.5),
  });

  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const pos = { x: e.clientX, y: e.clientY };
    gesture.current.pointers.set(e.pointerId, pos);
    gesture.current.startPos = pos;
    gesture.current.tapMoved = false;

    if (gesture.current.pointers.size === 2) {
      // Inicio de pinch
      const [a, b] = [...gesture.current.pointers.values()];
      gesture.current.initialDistance = Math.hypot(a.x - b.x, a.y - b.y);
      gesture.current.initialScale = scale;
    } else if (gesture.current.pointers.size === 1 && scale > 1) {
      // Inicio de pan (solo si la imagen ya está ampliada)
      gesture.current.isPanning = true;
      gesture.current.panStart = pos;
      gesture.current.translateAtStart = { ...translate };
    }
  };

  const handlePointerMove = (e) => {
    if (!gesture.current.pointers.has(e.pointerId)) return;
    const pos = { x: e.clientX, y: e.clientY };
    gesture.current.pointers.set(e.pointerId, pos);

    // Detectar si es tap o drag (umbral en píxeles)
    const start = gesture.current.startPos;
    if (Math.hypot(pos.x - start.x, pos.y - start.y) > TAP_MOVE_PX) {
      gesture.current.tapMoved = true;
    }

    if (gesture.current.pointers.size === 2) {
      // Pinch zoom
      const [a, b] = [...gesture.current.pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (gesture.current.initialDistance > 0) {
        const ratio = d / gesture.current.initialDistance;
        const newScale = clamp(
          gesture.current.initialScale * ratio,
          MIN_SCALE,
          MAX_SCALE,
        );
        setScale(newScale);
        if (newScale <= 1) setTranslate({ x: 0, y: 0 });
      }
    } else if (
      gesture.current.pointers.size === 1 &&
      gesture.current.isPanning
    ) {
      // Pan con un dedo (solo si está ampliada)
      const dx = pos.x - gesture.current.panStart.x;
      const dy = pos.y - gesture.current.panStart.y;
      const { maxX, maxY } = panBounds(scale);
      setTranslate({
        x: clamp(
          gesture.current.translateAtStart.x + dx,
          -maxX,
          maxX,
        ),
        y: clamp(
          gesture.current.translateAtStart.y + dy,
          -maxY,
          maxY,
        ),
      });
    }
  };

  const handlePointerEnd = (e) => {
    if (gesture.current.pointers.has(e.pointerId)) {
      gesture.current.pointers.delete(e.pointerId);
    }
    if (gesture.current.pointers.size < 2) {
      gesture.current.initialDistance = 0;
    }
    if (gesture.current.pointers.size === 0) {
      // Detección de tap / doble tap
      if (!gesture.current.tapMoved) {
        const now = Date.now();
        const lastT = gesture.current.lastTapTime;
        const lastP = gesture.current.lastTapPos;
        const start = gesture.current.startPos;
        const isDoubleTap =
          now - lastT < DOUBLE_TAP_MS &&
          Math.hypot(start.x - lastP.x, start.y - lastP.y) < DOUBLE_TAP_PX;
        if (isDoubleTap) {
          if (scale > 1) {
            setScale(1);
            setTranslate({ x: 0, y: 0 });
          } else {
            setScale(DOUBLE_TAP_SCALE);
            setTranslate({ x: 0, y: 0 });
          }
          gesture.current.lastTapTime = 0;
        } else {
          gesture.current.lastTapTime = now;
          gesture.current.lastTapPos = { ...start };
        }
      }
      gesture.current.isPanning = false;
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt || t('common.lightbox.expanded')}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center touch-none"
    >
      <button
        ref={closeBtnRef}
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-dark-800/80 text-white hover:bg-dark-800 active:scale-95 transition-all border border-white/10"
        aria-label={t('common.lightbox.close')}
      >
        <X size={22} />
      </button>

      <img
        src={src}
        alt={alt}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${scale})`,
          transition: "transform 0.2s ease-out",
          touchAction: "none",
          willChange: "transform",
          maxWidth: "95vw",
          maxHeight: "90vh",
          objectFit: "contain",
          userSelect: "none",
          WebkitUserSelect: "none",
          cursor: scale > 1 ? "grab" : "zoom-in",
        }}
        draggable={false}
      />
    </div>,
    document.body,
  );
};
