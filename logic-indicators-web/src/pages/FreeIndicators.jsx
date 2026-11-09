// src/pages/FreeIndicators.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/languageContext';
import { SEO } from '../components/SEO';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { ZoomableImage } from '../components/ImageLightbox';
import { AutoCarousel } from '../components/AutoCarousel';
import { resolveImage } from '../data/imageResolver';
import { Download, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const MotionArticle = motion.article;

export const FreeIndicators = () => {
  const { t } = useLanguage();
  const indicators = t('freeIndicators.indicators') || [];
  const downloadCta = t('freeIndicators.downloadCta') || 'Descargar ahora';
  const viewFullCta = t('freeIndicators.viewFullCta') || 'Ver versión completa';

  // Control del indicador activo (por defecto el primero)
  const [selectedId, setSelectedId] = useState(() => indicators[0]?.id || 'profile-free');
  const activeIndicator = indicators.find((item) => item.id === selectedId) || indicators[0];

  const contentImages = (activeIndicator?.contentImages || [])
    .map(resolveImage)
    .filter(Boolean);
  const hasCarousel = contentImages.length >= 2;
  const singleDetail = contentImages.length === 1;

  return (
    <>
      <SEO
        title={t('seo.freeIndicators.title')}
        description={t('seo.freeIndicators.description')}
        type="website"
      />
      <div className="min-h-screen bg-dark-900 pb-24">
        {/* 1. HERO DE TEXTO Y SELECTOR DE INDICADORES */}
        <section className="pt-16 md:pt-32 pb-10 px-6 text-center bg-[radial-gradient(ellipse_600px_200px_at_center_top,theme(colors.accent.primary/10%)_0%,transparent_70%)]">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-text-main tracking-tight mb-4">
              {t('freeIndicators.title')}
            </h1>
            <p className="text-lg text-text-muted leading-relaxed">
              {t('freeIndicators.subtitle')}
            </p>

            {/* Selector de Indicadores (Botones / Pills entre el subtítulo y la tarjeta) */}
            {indicators.length > 1 && (
              <div
                role="tablist"
                aria-label="Selector de indicadores gratuitos"
                className="flex items-center justify-center gap-2.5 sm:gap-3.5 mt-8 sm:mt-10 flex-wrap"
              >
                {indicators.map((item) => {
                  const isActive = item.id === activeIndicator?.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedId(item.id)}
                      className={`px-5 sm:px-6 py-2.5 rounded-full text-sm sm:text-base font-bold transition-all duration-200 cursor-pointer select-none active:scale-95 ${
                        isActive
                          ? 'bg-accent-primary text-white border border-accent-primary shadow-[0_0_25px_theme(colors.accent.primary/35%)] scale-[1.02]'
                          : 'bg-dark-800 text-text-muted hover:text-text-main hover:bg-dark-700/80 border border-dark-700 hover:border-dark-600'
                      }`}
                    >
                      {item.shortName || item.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* 2. TARJETA DINÁMICA DEL INDICADOR ACTIVO */}
        <section className="px-6 container mx-auto max-w-5xl">
          {activeIndicator && (
            <AnimatePresence mode="wait">
              <MotionArticle
                key={activeIndicator.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="bg-dark-800 border border-dark-700 rounded-3xl overflow-hidden hover:border-dark-600 transition-all shadow-xl"
              >
                <div className="p-6 md:p-10 space-y-8">
                  {/* Header de la tarjeta con título y badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-700/60 pb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-text-main">
                          {activeIndicator.name}
                        </h2>
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          {activeIndicator.badge}
                        </span>
                      </div>
                      {activeIndicator.tagline && (
                        <p className="text-sm md:text-base font-medium text-text-muted">
                          {activeIndicator.tagline}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Previsualización visual / Imagen */}
                  <div className="overflow-hidden rounded-2xl bg-dark-900 aspect-video md:aspect-[21/9]">
                    {hasCarousel ? (
                      <AutoCarousel
                        images={contentImages}
                        alt={activeIndicator.name}
                        imageClassName="w-full h-full object-cover"
                      />
                    ) : singleDetail ? (
                      <ZoomableImage
                        src={contentImages[0]}
                        alt={activeIndicator.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ZoomableImage
                        src={resolveImage(activeIndicator.imageKey)}
                        alt={activeIndicator.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Descripción principal */}
                  <p className="text-text-muted text-base md:text-lg leading-relaxed whitespace-pre-line">
                    {activeIndicator.description}
                  </p>

                  {/* Características incluidas */}
                  {Array.isArray(activeIndicator.features) && activeIndicator.features.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {activeIndicator.features.map((feat, idx) => {
                        const parts = typeof feat === 'string' ? feat.split(': ') : [feat];
                        const hasTitle = parts.length > 1;
                        return (
                          <div key={idx} className="flex items-start gap-2.5 text-sm md:text-base leading-snug">
                            <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                            <span>
                              {hasTitle ? (
                                <>
                                  <strong className="font-semibold text-text-main">{parts[0]}: </strong>
                                  <span className="text-text-muted">{parts.slice(1).join(': ')}</span>
                                </>
                              ) : (
                                <span className="text-text-main">{feat}</span>
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Nota explicativa de versión de prueba */}
                  {activeIndicator.trialNotice && (
                    <div className="bg-accent-secondary/10 border border-accent-secondary/25 rounded-2xl p-5 md:p-6 flex items-start gap-4">
                      <Sparkles size={24} className="text-accent-secondary shrink-0 mt-0.5" />
                      <div className="text-sm md:text-base text-text-main leading-relaxed">
                        <p>{activeIndicator.trialNotice}</p>
                      </div>
                    </div>
                  )}

                  {/* Botones de acción */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                    <a
                      href={activeIndicator.downloadUrl || '#'}
                      target={activeIndicator.downloadUrl && activeIndicator.downloadUrl !== '#' ? '_blank' : undefined}
                      rel={activeIndicator.downloadUrl && activeIndicator.downloadUrl !== '#' ? 'noopener noreferrer' : undefined}
                      className="w-full sm:w-auto"
                      onClick={(e) => {
                        if (activeIndicator.downloadUrl === '#' || !activeIndicator.downloadUrl) {
                          e.preventDefault();
                          alert('La descarga directa estará disponible próximamente.');
                        }
                      }}
                    >
                      <Button
                        variant="primary"
                        className="w-full sm:w-auto gap-2 text-base px-6 py-3"
                      >
                        <Download size={20} />
                        <span>{downloadCta}</span>
                      </Button>
                    </a>

                    {activeIndicator.fullVersionSlug && (
                      <Link
                        to={`/indicators/${activeIndicator.fullVersionSlug}`}
                        className="w-full sm:w-auto"
                      >
                        <Button
                          variant="secondary"
                          className="w-full sm:w-auto gap-2 text-base px-6 py-3"
                        >
                          <span>{viewFullCta}</span>
                          <ArrowRight size={18} />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </MotionArticle>
            </AnimatePresence>
          )}
        </section>
      </div>
    </>
  );
};
