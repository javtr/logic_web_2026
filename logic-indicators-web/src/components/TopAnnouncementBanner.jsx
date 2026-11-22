// src/components/TopAnnouncementBanner.jsx
// Banner superior de campañas programadas (Pre-Black Friday, Black Friday y eventos).
// 100% data-driven desde t('common.topBanner') en los JSONs de idioma.
// Selecciona automáticamente la campaña vigente según startDate/finalDate (UTC-5),
// actualiza el contador regresivo cada segundo y se oculta al expirar.

import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/languageContext';
import { Check, Copy, Clock, Calendar } from 'lucide-react';

// Rayas diagonales decorativas en los extremos (///), usadas en la campaña Pre-Black Friday
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

// Silueta sutil de velas de trading en los extremos para el banner Black Friday (negro/dorado)
const CandlestickWatermark = ({ side = 'left' }) => {
  const candles = [
    { x: 8, y: 20, h: 24, wickTop: 10, wickBottom: 52 },
    { x: 24, y: 12, h: 30, wickTop: 4, wickBottom: 50 },
    { x: 40, y: 24, h: 18, wickTop: 14, wickBottom: 48 },
    { x: 56, y: 8, h: 32, wickTop: 2, wickBottom: 46 },
    { x: 72, y: 18, h: 22, wickTop: 8, wickBottom: 48 },
    { x: 88, y: 14, h: 26, wickTop: 6, wickBottom: 50 },
  ];

  return (
    <svg
      viewBox="0 0 104 56"
      fill="none"
      className={`pointer-events-none hidden lg:block absolute inset-y-0 h-full w-28 xl:w-36 opacity-[0.07] ${
        side === 'left' ? 'left-2' : 'right-2 -scale-x-100'
      }`}
      aria-hidden="true"
    >
      {candles.map((c) => (
        <g key={c.x}>
          <line
            x1={c.x + 3.5}
            y1={c.wickTop}
            x2={c.x + 3.5}
            y2={c.wickBottom}
            stroke="#f6b82d"
            strokeWidth="1.4"
          />
          <rect
            x={c.x}
            y={c.y}
            width="7"
            height={c.h}
            rx="1"
            fill="#ffffff"
          />
        </g>
      ))}
    </svg>
  );
};

const parseTimestamp = (dateStr) => {
  if (!dateStr) return null;
  const ms = new Date(dateStr).getTime();
  return Number.isNaN(ms) ? null : ms;
};

// Calcula el desglose regresivo (D/H/M/S) hasta una fecha ISO-8601 objetivo.
const calculateRemainingTime = (targetDateStr, nowMs) => {
  const targetMs = parseTimestamp(targetDateStr);
  if (targetMs === null) {
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

// Selecciona la campaña activa según ventana horaria (o ?banner=<id> solo en modo DEV).
const resolveActiveCampaign = (topBannerConfig, nowMs) => {
  if (!topBannerConfig || topBannerConfig.enabled !== true) return null;

  const campaigns = Array.isArray(topBannerConfig.campaigns)
    ? topBannerConfig.campaigns
    : [topBannerConfig];

  // Permite previsualizar campañas programadas localmente sin exponerlas en producción
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    const previewParam = new URLSearchParams(window.location.search).get('banner');
    if (previewParam) {
      const matched = campaigns.find(
        (c) => c && (c.id === previewParam || c.theme === previewParam)
      );
      if (matched) return matched;
    }
  }

  return (
    campaigns.find((campaign) => {
      if (!campaign || campaign.enabled !== true) return false;
      const startMs = parseTimestamp(campaign.startDate);
      const finalMs = parseTimestamp(campaign.finalDate || campaign.targetDate);
      if (startMs !== null && nowMs < startMs) return false;
      if (finalMs !== null && nowMs >= finalMs) return false;
      return true;
    }) || null
  );
};

// Diseño Pre-Black Friday (rojo/carmesí, activo hasta 21 nov 23:59:59 UTC-5)
const PreBlackFridayBanner = ({ banner, countdown }) => {
  const [copied, setCopied] = useState(false);

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
        <SlantedStripes side="left" className="hidden 2xl:block" />

        <div className="flex-1 flex flex-wrap xl:flex-nowrap items-center justify-center gap-x-4 xl:gap-x-5 gap-y-1.5 text-center">
          {/* Grupo 1: Badge + Descuento + Descripción */}
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-x-2.5 sm:gap-x-3.5 gap-y-1">
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

            <span className="hidden sm:inline-block h-4 w-px bg-white/25 shrink-0" aria-hidden="true" />

            <Link
              to={banner.link || '/pricing'}
              className="inline-flex items-center gap-2 sm:gap-2.5 hover:opacity-95 transition-opacity group"
            >
              <span className="relative inline-flex flex-col items-center shrink-0">
                <span className="font-black text-white text-[15px] sm:text-xl xl:text-[22px] tracking-tight leading-none whitespace-nowrap">
                  {banner.discount || '20% OFF'}
                </span>
                <svg
                  viewBox="0 0 120 10"
                  fill="none"
                  className="w-full h-1.5 sm:h-2 -mt-0.5 text-[#ff1a2b]"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 8.5 Q60 -0.8 118 7.5 Q60 3.4 2 8.5 Z" fill="currentColor" />
                </svg>
              </span>

              {banner.description && (
                <span className="text-white/95 font-medium text-[11px] sm:text-[13px] xl:text-sm leading-tight text-left sm:text-center max-w-[130px] sm:max-w-[205px]">
                  {banner.description}
                </span>
              )}
            </Link>
          </div>

          <span className="hidden xl:inline-block h-5 w-px bg-white/25 shrink-0" aria-hidden="true" />

          {/* Grupo 2: Cupón + Contador regresivo */}
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-3.5 shrink-0">
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

            {banner.code && countdown.isActive && !countdown.isExpired && (
              <span className="inline-block h-4 w-px bg-white/25 shrink-0" aria-hidden="true" />
            )}

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

        <SlantedStripes side="right" className="hidden 2xl:block" />
      </div>
    </aside>
  );
};

// Diseño Black Friday (negro profundo + dorado, activo desde 22 nov 00:00 hasta 28 nov 23:59:59 UTC-5)
const BlackFridayGoldBanner = ({ banner, countdown }) => {
  const fullLabels = {
    d: banner.timeLabels?.d || 'days',
    h: banner.timeLabels?.h || 'hours',
    m: banner.timeLabels?.m || 'minutes',
    s: banner.timeLabels?.s || 'seconds',
  };

  const compactLabels = {
    d: banner.timeLabelsCompact?.d || fullLabels.d,
    h: banner.timeLabelsCompact?.h || 'hrs',
    m: banner.timeLabelsCompact?.m || 'min',
    s: banner.timeLabelsCompact?.s || 'sec',
  };

  const timeSegments = [
    { key: 'd', value: countdown.days, full: fullLabels.d, compact: compactLabels.d },
    { key: 'h', value: countdown.hours, full: fullLabels.h, compact: compactLabels.h },
    { key: 'm', value: countdown.minutes, full: fullLabels.m, compact: compactLabels.m },
    { key: 's', value: countdown.seconds, full: fullLabels.s, compact: compactLabels.s },
  ];

  return (
    <aside
      aria-label="Announcement"
      className="w-full relative border-b border-[#d49a24]/30 text-white shadow-lg select-none overflow-hidden bg-[#050505]"
    >
      <style>{`
        @keyframes bfGoldPulse {
          0%, 100% { opacity: 0.72; transform: scaleX(0.96); }
          50% { opacity: 1; transform: scaleX(1.04); }
        }
        .bf-horizon-glow {
          animation: bfGoldPulse 5s ease-in-out infinite;
          will-change: transform, opacity;
        }
      `}</style>

      {/* Fondo negro con tenue aura dorada central */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 46% 90% at 50% 100%, rgba(245, 185, 50, 0.22) 0%, rgba(168, 108, 14, 0.08) 48%, rgba(5, 5, 5, 0) 80%)',
        }}
        aria-hidden="true"
      />

      {/* Siluetas sutiles de velas japonesas en los extremos */}
      <CandlestickWatermark side="left" />
      <CandlestickWatermark side="right" />

      {/* Haz luminoso horizontal dorado centrado en la base */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-64 sm:w-80 md:w-[420px] h-[2px] bf-horizon-glow"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(245, 185, 50, 0.45) 22%, #ffe28a 50%, rgba(245, 185, 50, 0.45) 78%, transparent 100%)',
          boxShadow: '0 0 18px 2px rgba(245, 185, 50, 0.55)',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-3 sm:px-6 py-2 sm:py-2.5 relative z-10 font-sans">
        <div className="flex flex-wrap xl:flex-nowrap items-center justify-center gap-x-4 xl:gap-x-7 gap-y-1.5">
          {/* Grupo 1: Oferta (-40%) + Título central (BLACK FRIDAY) */}
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-x-3 sm:gap-x-5 xl:gap-x-7 gap-y-1">
            {/* Bloque Oferta */}
            <Link
              to={banner.link || '/pricing'}
              className="inline-flex items-center gap-1.5 sm:gap-2.5 hover:opacity-95 transition-opacity order-2 sm:order-1"
            >
              {banner.offerPrefix && (
                <span className="text-white font-bold uppercase tracking-wide text-[9px] sm:text-xs xl:text-[13px] leading-none">
                  {banner.offerPrefix}
                </span>
              )}

              <span
                className="italic font-black text-[#f6b82d] text-[20px] sm:text-[30px] xl:text-[36px] leading-none tracking-tight whitespace-nowrap"
                style={{ textShadow: '0 0 18px rgba(246, 184, 45, 0.48)' }}
              >
                {banner.discount || '-40%'}
              </span>

              {(banner.descriptionLine1 || banner.descriptionLine2) && (
                <span className="flex flex-col text-left uppercase font-bold text-white text-[8.5px] sm:text-[11px] xl:text-xs leading-[1.15] tracking-wide">
                  {banner.descriptionLine1 && <span>{banner.descriptionLine1}</span>}
                  {banner.descriptionLine2 && <span>{banner.descriptionLine2}</span>}
                </span>
              )}
            </Link>

            {/* Divisor vertical dorado */}
            <span
              className="hidden sm:inline-block h-8 w-px bg-gradient-to-b from-transparent via-[#d49a24]/75 to-transparent shrink-0 sm:order-2"
              aria-hidden="true"
            />

            {/* Bloque Título BLACK FRIDAY */}
            <Link
              to={banner.link || '/pricing'}
              className="inline-flex items-center gap-1.5 sm:gap-2 hover:opacity-95 transition-opacity order-1 sm:order-3 shrink-0"
            >
              <span className="italic font-black uppercase tracking-tight text-white text-base sm:text-2xl xl:text-[29px] leading-none">
                {banner.titlePrefix || 'BLACK'}
              </span>
              <span
                className="italic font-black uppercase tracking-tight text-[#f6b82d] text-base sm:text-2xl xl:text-[29px] leading-none"
                style={{ textShadow: '0 0 16px rgba(246, 184, 45, 0.35)' }}
              >
                {banner.titleHighlight || 'FRIDAY'}
              </span>
            </Link>
          </div>

          {/* Divisor vertical dorado entre Título y Contador */}
          <span
            className="hidden xl:inline-block h-8 w-px bg-gradient-to-b from-transparent via-[#d49a24]/75 to-transparent shrink-0"
            aria-hidden="true"
          />

          {/* Grupo 2: Contador regresivo + Píldora de fecha */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-4 shrink-0">
            {countdown.isActive && !countdown.isExpired && (
              <div
                aria-label={`${banner.endsIn || 'Ends in:'} ${countdown.days} ${fullLabels.d}, ${countdown.hours} ${fullLabels.h}, ${countdown.minutes} ${fullLabels.m}, ${countdown.seconds} ${fullLabels.s}`}
                className="flex flex-col items-center"
              >
                {/* Etiqueta superior con punto rojo pulsante */}
                <div className="inline-flex items-center gap-1.5 mb-0.5">
                  <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ef2323] opacity-75" />
                    <span
                      className="relative inline-flex rounded-full h-2 w-2 bg-[#ef2323]"
                      style={{ boxShadow: '0 0 8px rgba(239, 35, 35, 0.9)' }}
                    />
                  </span>
                  <span className="text-white/95 font-medium text-[10px] sm:text-xs leading-none">
                    {banner.endsIn || 'Ends in:'}
                  </span>
                </div>

                {/* Dígitos tabulares con etiqueta debajo de cada columna */}
                <div className="inline-flex items-start gap-1 sm:gap-1.5 tabular-nums">
                  {timeSegments.map((seg, idx) => (
                    <Fragment key={seg.key}>
                      {idx > 0 && (
                        <span
                          className="font-mono font-bold text-white/90 text-sm sm:text-base xl:text-lg leading-none pt-[1px]"
                          aria-hidden="true"
                        >
                          :
                        </span>
                      )}
                      <div className="flex flex-col items-center min-w-[22px] sm:min-w-[28px]">
                        <span className="font-mono font-extrabold text-white text-sm sm:text-base xl:text-[19px] leading-none tracking-tight">
                          {seg.value}
                        </span>
                        <span className="sm:hidden text-[8.5px] text-white/75 font-medium leading-none mt-0.5">
                          {seg.compact}
                        </span>
                        <span className="hidden sm:inline text-[9.5px] text-white/75 font-medium leading-none mt-0.5">
                          {seg.full}
                        </span>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Píldora de fecha límite */}
            {(banner.endDateLabel || banner.endDateLabelCompact) && (
              <Link
                to={banner.link || '/pricing'}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-[#d49a24]/70 bg-black/55 hover:border-[#f6b82d] hover:bg-[#1a1204]/70 transition-all shrink-0"
              >
                <Calendar size={13} className="text-[#f6b82d] shrink-0" aria-hidden="true" />
                {banner.endDateLabelCompact && (
                  <span className="sm:hidden text-white/95 font-medium text-[10.5px] whitespace-nowrap leading-none">
                    {banner.endDateLabelCompact}
                  </span>
                )}
                <span className="hidden sm:inline text-white/95 font-medium text-xs whitespace-nowrap leading-none">
                  {banner.endDateLabel || banner.endDateLabelCompact}
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export const TopAnnouncementBanner = () => {
  const { t } = useLanguage();
  const topBannerConfig = t('common.topBanner');
  const [nowMs, setNowMs] = useState(() => Date.now());

  // Tick de 1 segundo para actualizar el contador y cambiar de campaña en vivo al llegar la hora programada
  useEffect(() => {
    if (!topBannerConfig || topBannerConfig.enabled !== true) return undefined;
    const interval = setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [topBannerConfig]);

  const activeBanner = resolveActiveCampaign(topBannerConfig, nowMs);
  if (!activeBanner) {
    return null;
  }

  const deadline = activeBanner.finalDate || activeBanner.targetDate;
  const countdownTarget = activeBanner.countdownEndDate || deadline;
  const countdown = calculateRemainingTime(countdownTarget, nowMs);

  if (activeBanner.theme === 'black-friday-gold') {
    return <BlackFridayGoldBanner banner={activeBanner} countdown={countdown} />;
  }

  return <PreBlackFridayBanner banner={activeBanner} countdown={countdown} />;
};
