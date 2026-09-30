// src/components/TopAnnouncementBanner.jsx
// Banner superior llamativo para eventos especiales y lanzamientos.
// 100% data-driven desde t('common.topBanner') en los JSONs de idioma.
// Cuenta con temporizador regresivo en vivo y botón para copiar cupón.

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/languageContext';
import { Check, Copy, Clock } from 'lucide-react';

// Decoración de barras inclinadas (///) para pantallas amplias
const SlantedStripes = ({ className = '' }) => (
  <svg
    viewBox="0 0 44 20"
    fill="currentColor"
    className={`h-4 sm:h-5 w-auto shrink-0 ${className}`}
    aria-hidden="true"
  >
    <polygon points="10,0 4,20 0,20 6,0" />
    <polygon points="22,0 16,20 12,20 18,0" />
    <polygon points="34,0 28,20 24,20 30,0" />
  </svg>
);

// Helper para calcular el tiempo restante hasta la fecha límite
const calculateTimeLeft = (targetIsoString) => {
  if (!targetIsoString) return null;
  const difference = new Date(targetIsoString).getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00', isExpired: true };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

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
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(banner?.targetDate));

  // Actualizador del temporizador cada segundo
  useEffect(() => {
    if (!banner?.targetDate) return;
    setTimeLeft(calculateTimeLeft(banner.targetDate));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(banner.targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [banner?.targetDate]);

  // Si no está configurado o está deshabilitado, no renderiza nada
  if (!banner || banner.enabled !== true) {
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
      className="w-full bg-gradient-to-r from-[#6e0505] via-[#cf1b1b] to-[#6e0505] border-b border-black/20 text-white shadow-md select-none transition-colors"
    >
      <div className="container mx-auto px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between gap-2 text-xs sm:text-sm">
        {/* Rayas decorativas izquierdas (visibles solo en pantallas grandes para ahorrar espacio) */}
        <SlantedStripes className="text-red-500/80 hidden xl:block" />

        {/* Contenedor central flexible (2 filas en móvil para no saturar, 1 fila en tablet/desktop) */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-x-3 gap-y-1 text-center">
          {/* Bloque 1: Oferta */}
          <Link
            to={banner.link || '/pricing'}
            className="inline-flex items-center gap-1.5 hover:underline decoration-white/40 underline-offset-2 transition-all leading-tight text-white/95"
          >
            <strong className="font-extrabold text-white text-xs sm:text-sm">
              {banner.discount}
            </strong>
            <span className="text-white/90 text-xs sm:text-sm">
              {banner.prefix}
            </span>
            <strong className="font-bold text-white text-xs sm:text-sm">
              {banner.product}
            </strong>
          </Link>

          {/* Separador Desktop */}
          <span className="hidden md:inline-block text-white/30 text-xs font-light">
            |
          </span>

          {/* Sub-fila en móvil para contador y cupón */}
          <div className="flex items-center justify-center gap-2 sm:gap-2.5">
            {/* Bloque 2: Cuenta Regresiva */}
            {timeLeft && !timeLeft.isExpired && (
              <div
                className="inline-flex items-center gap-1 bg-black/30 border border-white/20 px-2 py-0.5 rounded text-[11px] sm:text-xs font-mono font-bold tracking-tight text-white/95 shadow-inner"
                title={`${banner.endsIn || 'Termina en:'} ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
              >
                <Clock size={12} className="text-white/80 shrink-0" />
                <span>{timeLeft.days}d</span>
                <span className="text-white/40">:</span>
                <span>{timeLeft.hours}h</span>
                <span className="text-white/40">:</span>
                <span>{timeLeft.minutes}m</span>
                <span className="text-white/40">:</span>
                <span className="text-yellow-200">{timeLeft.seconds}s</span>
              </div>
            )}

            {/* Separador */}
            <span className="text-white/30 text-xs font-light">
              |
            </span>

            {/* Bloque 3: Botón de Copiar Código */}
            {banner.code && (
              <button
                type="button"
                onClick={handleCopyCode}
                aria-label={banner.copyAria || `Copiar ${banner.code}`}
                title={banner.copyAria || `Copiar ${banner.code}`}
                className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-black/30 hover:bg-black/45 border border-white/30 hover:border-white/50 transition-all cursor-pointer text-[11px] sm:text-xs active:scale-95 group focus:outline-none focus:ring-1 focus:ring-white/50"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-300 stroke-[2.5]" />
                    <span className="font-bold text-emerald-200">
                      {banner.copied || '¡Copiado!'}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-white/80 font-normal">
                      {banner.codeLabel}
                    </span>
                    <span className="font-black tracking-wider text-white group-hover:text-yellow-200 transition-colors">
                      {banner.code}
                    </span>
                    <Copy size={11} className="text-white/60 group-hover:text-white transition-colors ml-0.5" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Rayas decorativas derechas (visibles solo en pantallas grandes) */}
        <SlantedStripes className="text-red-500/80 hidden xl:block" />
      </div>
    </aside>
  );
};
