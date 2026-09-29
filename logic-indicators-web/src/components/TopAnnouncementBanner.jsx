// src/components/TopAnnouncementBanner.jsx
// Banner superior llamativo para eventos especiales y lanzamientos.
// 100% data-driven desde t('common.topBanner') en los JSONs de idioma.
// Si enabled === false, retorna null.

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/languageContext';
import { Check, Copy } from 'lucide-react';

// Decoración de barras inclinadas (///) idéntica al diseño de referencia
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

export const TopAnnouncementBanner = () => {
  const { t } = useLanguage();
  const banner = t('common.topBanner');
  const [copied, setCopied] = useState(false);

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
      // Fallback si el clipboard API falla
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <aside
      aria-label="Announcement"
      className="relative z-50 w-full bg-gradient-to-r from-[#6e0505] via-[#cf1b1b] to-[#6e0505] border-b border-black/20 text-white shadow-md select-none transition-colors"
    >
      <div className="container mx-auto px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2 md:gap-4 text-xs sm:text-sm">
        {/* Rayas decorativas izquierdas */}
        <SlantedStripes className="text-red-500/90 hidden md:block" />

        {/* Contenido central del anuncio */}
        <div className="flex-1 flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3.5 gap-y-1.5 text-center">
          {/* Badge NEW */}
          {banner.badge && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-black/25 border border-white/20 text-white shadow-sm">
              {banner.badge}
            </span>
          )}

          {/* Texto de oferta con enlace a /pricing */}
          <Link
            to={banner.link || '/pricing'}
            className="inline-flex items-center gap-1.5 hover:underline decoration-white/50 underline-offset-2 transition-all leading-tight text-white/95"
          >
            <strong className="font-extrabold text-white text-sm sm:text-base">
              {banner.discount}
            </strong>
            <span>{banner.prefix}</span>
            <strong className="font-bold text-white">
              {banner.product}
            </strong>
          </Link>

          {/* Separador vertical */}
          <span className="hidden sm:inline-block text-white/30 text-sm font-light mx-0.5">
            |
          </span>

          {/* Caja con botón para copiar el código */}
          {banner.code && (
            <button
              type="button"
              onClick={handleCopyCode}
              aria-label={banner.copyAria || `Copiar ${banner.code}`}
              title={banner.copyAria || `Copiar ${banner.code}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/25 hover:bg-black/40 border border-white/30 hover:border-white/50 transition-all cursor-pointer text-xs sm:text-sm active:scale-95 group focus:outline-none focus:ring-1 focus:ring-white/50"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-300 stroke-[2.5]" />
                  <span className="font-bold text-emerald-200">
                    {banner.copied || '¡Copiado!'}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-white/90 font-normal">
                    {banner.codeLabel}
                  </span>
                  <span className="font-extrabold tracking-wider text-white group-hover:text-yellow-200 transition-colors">
                    {banner.code}
                  </span>
                  <Copy size={12} className="text-white/60 group-hover:text-white transition-colors ml-0.5" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Rayas decorativas derechas */}
        <SlantedStripes className="text-red-500/90 hidden md:block" />
      </div>
    </aside>
  );
};
