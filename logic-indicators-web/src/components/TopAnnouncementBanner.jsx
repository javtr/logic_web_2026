// src/components/TopAnnouncementBanner.jsx
// Banner superior de campaña (Pre-Black Friday y eventos especiales).
// 100% data-driven desde t('common.topBanner') en los JSONs de idioma.
// Incluye contador regresivo en vivo hasta la fecha límite configurada (finalDate),
// ocultamiento automático al vencer y botón de copiado del cupón con feedback visual.

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/languageContext';
import { Check, Copy, Clock } from 'lucide-react';

// Rayas diagonales decorativas en los extremos (///), con degradado de intensidad hacia afuera
const SlantedStripes = ({ side = 'left', className = '' }) => {
  const opacities = side === 'left' ? [0.45, 0.72, 1] : [1, 0.72, 0.45];

  return (
    <svg
      viewBox="0 0 56 24"
      fill="none"
      className={`h-5 w-auto shrink-0 ${className}`}
      aria-hidden="true"
    >
      <polygon points="10,0 18,0 10,24 2,24" fill="#f40524" fillOpacity={opacities[0]} />
      <polygon points="26,0 34,0 26,24 18,24" fill="#f40524" fillOpacity={opacities[1]} />
      <polygon points="42,0 50,0 42,24 34,24" fill="#f40524" fillOpacity={opacities[2]} />
    </svg>
  );
};

// Calcula el desglose regresivo (D/H/M/S) hasta una fecha ISO-8601 objetivo.
const calculateRemainingTime = (targetDateStr, nowMs) => {
  if (!targetDateStr) {
    return { isActive: false, isExpired: false };
  }

  const targetMs = new Date(targetDateStr).getTime();
  if (Number.isNaN(targetMs)) {
    return { isActive: false, isExpired: false };
  }

  const diffMs = targetMs - nowMs;
  if (diffMs <= 0) {
    return {
      isActive: true,
      isExpired: true,
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
    };
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  return {
    isActive: true,
    isExpired: false,
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
};

export const TopAnnouncementBanner = () => {
  const { t } = useLanguage();
  const banner = t('common.topBanner');
  const [copied, setCopied] = useState(false);
  const [nowMs, setNowMs] = useState(() => Date.now());

  const deadline = banner?.finalDate || banner?.targetDate;
  const countdownTarget = banner?.countdownEndDate || deadline;

  const bannerExpiration = calculateRemainingTime(deadline, nowMs);
  const countdown = calculateRemainingTime(countdownTarget, nowMs);

  // Refresca cada segundo mientras exista una fecha límite activa (sin deriva de reloj)
  useEffect(() => {
    if (!deadline && !countdownTarget) return undefined;
    const interval = setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [deadline, countdownTarget]);

  // Si no está configurado, está deshabilitado o ya venció la fecha límite, no renderiza nada
  if (!banner || banner.enabled !== true || bannerExpiration.isExpired) {
    return null;
  }

  const units = {
    d: banner.timeUnits?.d || 'D',
    h: banner.timeUnits?.h || 'H',
    m: banner.timeUnits?.m || 'M',
    s: banner.timeUnits?.s || 'S',
  };

  const timeSegments = [
    { key: 'd', value: countdown.days, label: units.d },
    { key: 'h', value: countdown.hours, label: units.h },
    { key: 'm', value: countdown.minutes, label: units.m },
    { key: 's', value: countdown.seconds, label: units.s },
  ];

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
      className="w-full relative border-b border-black/40 text-white shadow-md select-none overflow-hidden banner-prebf-bg"
    >
      {/* Estilos CSS Scoped (100% GPU-accelerated, 0 reflow/repaint de layout) */}
      <style>{`
        @keyframes bannerFluidBg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes bannerLightSweep {
          0% { transform: translate3d(-180%, 0, 0); }
          26%, 100% { transform: translate3d(380%, 0, 0); }
        }
        @keyframes bannerBadgeGlow {
          0%, 100% {
            box-shadow: 0 0 12px rgba(244, 5, 36, 0.18);
            border-color: rgba(244, 5, 36, 0.45);
          }
          50% {
            box-shadow: 0 0 18px rgba(244, 5, 36, 0.36);
            border-color: rgba(244, 5, 36, 0.72);
          }
        }
        .banner-prebf-bg {
          background: linear-gradient(90deg, #210509 0%, #59050e 25%, #8a0b17 50%, #59050e 75%, #210509 100%);
          background-size: 200% 100%;
          animation: bannerFluidBg 16s ease infinite;
        }
        .banner-sweep-layer {
          animation: bannerLightSweep 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          will-change: transform;
        }
        .banner-badge-glow {
          animation: bannerBadgeGlow 3.6s ease-in-out infinite;
        }
      `}</style>

      {/* Haz de luz diagonal sutil que recorre el banner periódicamente */}
      <div
        className="pointer-events-none absolute inset-y-0 -skew-x-12 z-0 banner-sweep-layer"
        style={{
          width: '40%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.015) 25%, rgba(255,255,255,0.11) 50%, rgba(255,255,255,0.015) 75%, transparent 100%)',
        }}
      />

      <div className="container mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-3 relative z-10 font-sans">
        {/* Rayas inclinadas izquierdas (solo en pantallas muy anchas para no comprimir los 4 bloques) */}
        <SlantedStripes side="left" className="hidden 2xl:block" />

        {/* Contenido central agrupado en 2 bloques lógicos: Oferta + Acción/Urgencia */}
        <div className="flex-1 flex flex-wrap xl:flex-nowrap items-center justify-center gap-x-4 xl:gap-x-5 gap-y-1.5 text-center">
          {/* Grupo 1: Badge + Descuento + Descripción */}
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-x-2.5 sm:gap-x-3.5 gap-y-1">
            {/* Bloque 1: Badge PRE BLACK FRIDAY */}
            <Link
              to={banner.link || '/pricing'}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-[#2a0408]/85 border banner-badge-glow hover:brightness-110 transition-all shrink-0"
            >
              <span className="text-white font-black text-[10px] sm:text-xs tracking-wide uppercase leading-none">
                {banner.badgePrefix || 'PRE'}
              </span>
              <span className="text-[#ff1a2b] font-black text-[10px] sm:text-xs tracking-wide uppercase leading-none">
                {banner.badgeHighlight || 'BLACK FRIDAY'}
              </span>
            </Link>

            {/* Separador */}
            <span className="hidden sm:inline-block h-4 w-px bg-white/25 shrink-0" aria-hidden="true" />

            {/* Bloque 2: 20% OFF + swoosh rojo + descripción */}
            <Link
              to={banner.link || '/pricing'}
              className="inline-flex items-center gap-2 sm:gap-2.5 hover:opacity-95 transition-opacity group"
            >
              <span className="relative inline-flex flex-col items-center shrink-0">
                <span className="font-black text-white text-[15px] sm:text-xl xl:text-[22px] tracking-tight leading-none whitespace-nowrap">
                  {banner.discount || '20% OFF'}
                </span>
                {/* Arco rojo decorativo debajo del descuento */}
                <svg
                  viewBox="0 0 120 10"
                  fill="none"
                  className="w-full h-1.5 sm:h-2 -mt-0.5 text-[#ff1a2b]"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8.5 Q60 -0.8 118 7.5 Q60 3.4 2 8.5 Z"
                    fill="currentColor"
                  />
                </svg>
              </span>

              {banner.description && (
                <span className="text-white/95 font-medium text-[11px] sm:text-[13px] xl:text-sm leading-tight text-left sm:text-center max-w-[130px] sm:max-w-[205px]">
                  {banner.description}
                </span>
              )}
            </Link>
          </div>

          {/* Separador principal entre Grupo 1 y Grupo 2 en desktop ancho */}
          <span className="hidden xl:inline-block h-5 w-px bg-white/25 shrink-0" aria-hidden="true" />

          {/* Grupo 2: Código de descuento + Contador regresivo (juntos en fila 2 en móvil/tablet) */}
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-3.5 shrink-0">
            {/* Bloque 3: Botón de código con copiado al portapapeles */}
            {banner.code && (
              <button
                type="button"
                onClick={handleCopyCode}
                aria-label={banner.copyAria || `Copiar ${banner.code}`}
                title={banner.copyAria || `Copiar ${banner.code}`}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 rounded-lg border border-white/55 hover:border-white/85 bg-black/25 hover:bg-black/40 active:scale-95 transition-all cursor-pointer group shadow-sm focus:outline-none focus:ring-1 focus:ring-white/60 shrink-0"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-300 stroke-[2.5] shrink-0" />
                    <span className="font-bold text-emerald-200 text-xs sm:text-sm whitespace-nowrap">
                      {banner.copied || '¡Copiado!'}
                    </span>
                  </>
                ) : (
                  <>
                    {banner.codeLabel && (
                      <span className="hidden sm:inline text-white/90 font-normal text-xs sm:text-sm whitespace-nowrap">
                        {banner.codeLabel}
                      </span>
                    )}
                    <span className="font-black tracking-wider text-white text-xs sm:text-sm whitespace-nowrap">
                      {banner.code}
                    </span>
                    <Copy size={13} className="text-white/80 group-hover:text-white transition-colors shrink-0" />
                  </>
                )}
              </button>
            )}

            {/* Separador entre cupón y contador */}
            {banner.code && countdown.isActive && !countdown.isExpired && (
              <span className="inline-block h-4 w-px bg-white/25 shrink-0" aria-hidden="true" />
            )}

            {/* Bloque 4: Contador regresivo en vivo */}
            {countdown.isActive && !countdown.isExpired && (
              <div
                aria-label={`${banner.endsIn || 'Ends in:'} ${countdown.days}${units.d} ${countdown.hours}${units.h} ${countdown.minutes}${units.m} ${countdown.seconds}${units.s}`}
                title={`${banner.endsIn || 'Ends in:'} ${countdown.days}${units.d} ${countdown.hours}${units.h} ${countdown.minutes}${units.m} ${countdown.seconds}${units.s}`}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-lg border border-[#ff1a2b]/45 bg-[#1a0306]/85 shadow-inner shrink-0"
              >
                <Clock size={12} className="text-[#ff4d5a] shrink-0 sm:hidden" aria-hidden="true" />
                <span className="hidden sm:inline-flex relative h-2 w-2 shrink-0" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff1a2b] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff1a2b]" />
                </span>

                <span className="hidden sm:inline text-white/80 font-bold text-[10px] xl:text-[11px] tracking-wider uppercase whitespace-nowrap">
                  {banner.endsIn || 'ENDS IN:'}
                </span>

                <div className="inline-flex items-center gap-1.5 font-mono tabular-nums text-xs sm:text-sm font-bold tracking-tight text-white whitespace-nowrap">
                  {timeSegments.map(({ key, value, label }) => (
                    <span key={key} className="inline-flex items-baseline">
                      <span className="text-white">{value}</span>
                      <span className="text-[9px] sm:text-[10px] text-white/65 font-sans font-semibold ml-0.5">
                        {label}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rayas inclinadas derechas (solo en pantallas muy anchas) */}
        <SlantedStripes side="right" className="hidden 2xl:block" />
      </div>
    </aside>
  );
};
