// src/components/TopAnnouncementBanner.jsx
// Banner superior de campaña (Pre-Black Friday y eventos especiales).
// 100% data-driven desde t('common.topBanner') en los JSONs de idioma.
// Se oculta automáticamente al superar la fecha límite configurada (finalDate)
// y cuenta con botón interactivo para copiar el cupón con feedback visual.

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/languageContext';
import { Check, Copy } from 'lucide-react';

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

// Verifica si la campaña ya superó su fecha límite final
const isBannerExpired = (finalDateStr, nowMs) => {
  if (!finalDateStr) return false;
  const finalTime = new Date(finalDateStr).getTime();
  if (Number.isNaN(finalTime)) return false;
  return nowMs >= finalTime;
};

export const TopAnnouncementBanner = () => {
  const { t } = useLanguage();
  const banner = t('common.topBanner');
  const [copied, setCopied] = useState(false);
  const [nowMs, setNowMs] = useState(() => Date.now());

  const deadline = banner?.finalDate || banner?.targetDate;
  const expired = isBannerExpired(deadline, nowMs);

  // Chequeo periódico por minuto para ocultar el banner en vivo al llegar a la fecha límite
  useEffect(() => {
    if (!deadline) return undefined;
    const interval = setInterval(() => {
      setNowMs(Date.now());
    }, 60000);
    return () => clearInterval(interval);
  }, [deadline]);

  // Si no está configurado, está deshabilitado o ya venció la fecha límite, no renderiza nada
  if (!banner || banner.enabled !== true || expired) {
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

      <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-3 relative z-10 font-sans">
        {/* Rayas inclinadas izquierdas */}
        <SlantedStripes side="left" className="hidden lg:block" />

        {/* Contenido central responsive */}
        <div className="flex-1 flex flex-wrap md:flex-nowrap items-center justify-center gap-x-3 sm:gap-x-4 lg:gap-x-6 gap-y-2 text-center">
          {/* Bloque 1: Badge PRE BLACK FRIDAY */}
          <Link
            to={banner.link || '/pricing'}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1 rounded-full bg-[#2a0408]/85 border banner-badge-glow hover:brightness-110 transition-all shrink-0"
          >
            <span className="text-white font-black text-xs sm:text-sm tracking-wide uppercase leading-none">
              {banner.badgePrefix || 'PRE'}
            </span>
            <span className="text-[#ff1a2b] font-black text-xs sm:text-sm tracking-wide uppercase leading-none">
              {banner.badgeHighlight || 'BLACK FRIDAY'}
            </span>
          </Link>

          {/* Separador */}
          <span className="hidden md:inline-block h-5 w-px bg-white/25 shrink-0" aria-hidden="true" />

          {/* Bloque 2: 20% OFF + swoosh rojo + descripción */}
          <Link
            to={banner.link || '/pricing'}
            className="inline-flex items-center gap-2.5 sm:gap-3 hover:opacity-95 transition-opacity group"
          >
            <span className="relative inline-flex flex-col items-center shrink-0">
              <span className="font-black text-white text-lg sm:text-xl md:text-[22px] tracking-tight leading-none whitespace-nowrap">
                {banner.discount || '20% OFF'}
              </span>
              {/* Arco rojo decorativo debajo del descuento */}
              <svg
                viewBox="0 0 120 10"
                fill="none"
                className="w-full h-2 -mt-0.5 text-[#ff1a2b]"
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
              <span className="text-white/95 font-medium text-xs sm:text-[13px] md:text-sm leading-tight text-center max-w-[190px] sm:max-w-[205px]">
                {banner.description}
              </span>
            )}
          </Link>

          {/* Separador */}
          <span className="hidden md:inline-block h-5 w-px bg-white/25 shrink-0" aria-hidden="true" />

          {/* Bloque 3: Botón de código con copiado al portapapeles */}
          {banner.code && (
            <button
              type="button"
              onClick={handleCopyCode}
              aria-label={banner.copyAria || `Copiar ${banner.code}`}
              title={banner.copyAria || `Copiar ${banner.code}`}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg border border-white/55 hover:border-white/85 bg-black/25 hover:bg-black/40 active:scale-95 transition-all cursor-pointer group shadow-sm focus:outline-none focus:ring-1 focus:ring-white/60 shrink-0"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-300 stroke-[2.5] shrink-0" />
                  <span className="font-bold text-emerald-200 text-xs sm:text-sm whitespace-nowrap">
                    {banner.copied || '¡Copiado!'}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-white/90 font-normal text-xs sm:text-sm whitespace-nowrap">
                    {banner.codeLabel}
                  </span>
                  <span className="font-black tracking-wider text-white text-xs sm:text-sm md:text-[15px] whitespace-nowrap">
                    {banner.code}
                  </span>
                  <Copy size={14} className="text-white/80 group-hover:text-white transition-colors shrink-0" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Rayas inclinadas derechas */}
        <SlantedStripes side="right" className="hidden lg:block" />
      </div>
    </aside>
  );
};
