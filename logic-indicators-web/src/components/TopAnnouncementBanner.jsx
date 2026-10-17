// src/components/TopAnnouncementBanner.jsx
// Banner superior de lanzamiento y promociones especiales.
// 100% data-driven desde t('common.topBanner') en los JSONs de idioma.
// Cuenta con temporizador regresivo cíclico (se reinicia automáticamente cada 2 días hasta el 30 de octubre)
// y botón interactivo para copiar el cupón con feedback visual instantáneo.

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/languageContext';
import { Check, Copy } from 'lucide-react';

// Helper para calcular el tiempo restante cíclico (cada X horas) hasta la fecha límite final
const calculateTimeLeft = (startDateStr, finalDateStr, cycleHours = 48) => {
  const now = Date.now();
  const finalTime = finalDateStr ? new Date(finalDateStr).getTime() : null;

  // Si ya se superó la fecha límite final (30 de octubre), el banner expira completamente
  if (finalTime && !isNaN(finalTime) && now >= finalTime) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00', isExpired: true };
  }

  const startTime = startDateStr && !isNaN(new Date(startDateStr).getTime())
    ? new Date(startDateStr).getTime()
    : (finalTime ? finalTime - (14 * 24 * 60 * 60 * 1000) : now);

  const cycleMs = Math.max(1, (cycleHours || 48)) * 60 * 60 * 1000;

  let remainingMs;
  if (now < startTime) {
    remainingMs = cycleMs;
  } else {
    const elapsed = now - startTime;
    const elapsedInCycle = elapsed % cycleMs;
    // Si justo elapsedInCycle es 0, queda el ciclo completo de 48h
    remainingMs = elapsedInCycle === 0 ? cycleMs : (cycleMs - elapsedInCycle);
  }

  // Si el tiempo restante del ciclo sobrepasa el final de la campaña (30 de octubre),
  // ajustamos para no prometer más tiempo del que durará la promoción
  if (finalTime && !isNaN(finalTime) && now + remainingMs > finalTime) {
    remainingMs = Math.max(0, finalTime - now);
  }

  if (remainingMs <= 0) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00', isExpired: true };
  }

  const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remainingMs / (1000 * 60)) % 60);
  const seconds = Math.floor((remainingMs / 1000) % 60);

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    isExpired: false,
  };
};

export const TopAnnouncementBanner = () => {
  const { t } = useLanguage();
  const banner = t('common.topBanner');
  const [copied, setCopied] = useState(false);

  const [timeLeft, setTimeLeft] = useState(() =>
    calculateTimeLeft(
      banner?.startDate,
      banner?.finalDate || banner?.targetDate,
      banner?.cycleHours || 48
    )
  );

  // Actualizador continuo del temporizador cada segundo
  useEffect(() => {
    if (!banner?.finalDate && !banner?.targetDate && !banner?.startDate) return;

    const updateTimer = () => {
      setTimeLeft(
        calculateTimeLeft(
          banner.startDate,
          banner.finalDate || banner.targetDate,
          banner.cycleHours || 48
        )
      );
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [banner?.startDate, banner?.finalDate, banner?.targetDate, banner?.cycleHours]);

  // Si no está configurado, está deshabilitado o la campaña ya finalizó el 30 de octubre, no renderiza nada
  if (!banner || banner.enabled !== true || timeLeft?.isExpired) {
    return null;
  }

  const handleCopyCode = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!banner.code) return;

    navigator.clipboard.writeText(banner.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <aside
      aria-label="Announcement"
      className="w-full relative border-b border-black/30 text-white shadow-md select-none transition-colors overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, #560b19 0%, #8b0f1c 55%, #bd121c 100%)'
      }}
    >
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-center text-xs sm:text-sm font-sans">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-x-3 gap-y-1.5 text-center flex-wrap">
          {/* Bloque: Texto de Oferta y Píldora del Código */}
          <div className="inline-flex items-center flex-wrap justify-center gap-1.5 sm:gap-2 leading-tight">
            <Link
              to={banner.link || '/pricing'}
              className="inline-flex items-center gap-1.5 hover:opacity-95 transition-opacity"
            >
              <span className="font-bold text-[#86efac] tracking-tight">
                {banner.titleHighlight || 'Extendimos'}
              </span>
              <span className="font-semibold text-white">
                {banner.titleText || banner.prefix || 'el código de lanzamiento'}
              </span>
            </Link>

            {/* Píldora del Código Promocional con Copiado Rápido */}
            {banner.code && (
              <button
                type="button"
                onClick={handleCopyCode}
                aria-label={banner.copyAria || `Copiar ${banner.code}`}
                title={banner.copyAria || `Copiar ${banner.code}`}
                className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-0.5 rounded-full border border-white/45 bg-white/5 hover:bg-white/15 hover:border-white/70 active:scale-95 transition-all cursor-pointer text-xs font-bold tracking-wider text-white group shadow-sm focus:outline-none focus:ring-1 focus:ring-white/50"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-[#86efac] stroke-[2.5]" />
                    <span className="font-bold text-[#86efac]">
                      {banner.copied || '¡Copiado!'}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-white font-bold tracking-wider">{banner.code}</span>
                    <Copy size={11} className="text-white/60 group-hover:text-white transition-colors ml-0.5" />
                  </>
                )}
              </button>
            )}

            {/* Texto de Descuento */}
            <Link
              to={banner.link || '/pricing'}
              className="inline-flex items-center gap-1 hover:opacity-95 transition-opacity"
            >
              <span className="text-white font-medium">{banner.discountPrefix || '-'}</span>
              <span className="font-bold text-[#86efac]">
                {banner.discountHighlight || banner.discount || '15%'}
              </span>
              <span className="font-semibold text-white">
                {banner.discountSuffix || 'de descuento'}
              </span>
            </Link>
          </div>

          {/* Separador vertical estilo banner */}
          <span className="hidden sm:inline-block text-white/30 text-xs font-light select-none">
            |
          </span>

          {/* Bloque: Temporizador Regresivo */}
          {timeLeft && !timeLeft.isExpired && (
            <div className="inline-flex items-center gap-1.5 sm:gap-2">
              <span className="text-white/80 font-bold text-[10px] sm:text-xs tracking-wider uppercase select-none">
                {banner.endsIn || 'TERMINA EN:'}
              </span>

              {/* Píldora del Contador (01D 12H 30M 29S) */}
              <div
                className="inline-flex items-center px-2.5 sm:px-3 py-0.5 rounded-full border border-white/45 bg-black/15 font-mono text-xs sm:text-sm font-semibold tracking-tight text-white shadow-inner"
                title={`${banner.endsIn || 'Termina en:'} ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
              >
                <span className="font-bold">{timeLeft.days}</span>
                <span className="text-[9px] sm:text-[10px] text-white/75 font-sans font-medium ml-0.5 mr-1.5">D</span>

                <span className="font-bold">{timeLeft.hours}</span>
                <span className="text-[9px] sm:text-[10px] text-white/75 font-sans font-medium ml-0.5 mr-1.5">H</span>

                <span className="font-bold">{timeLeft.minutes}</span>
                <span className="text-[9px] sm:text-[10px] text-white/75 font-sans font-medium ml-0.5 mr-1.5">M</span>

                <span className="font-bold">{timeLeft.seconds}</span>
                <span className="text-[9px] sm:text-[10px] text-white/75 font-sans font-medium ml-0.5">S</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
