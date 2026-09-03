// src/pages/FreeIndicators.jsx
import { useLanguage } from '../context/languageContext';
import { SEO } from '../components/SEO';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { ZoomableImage } from '../components/ImageLightbox';
import { AutoCarousel } from '../components/AutoCarousel';
import { resolveImage } from '../data/imageResolver';
import { Download, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const FreeIndicators = () => {
  const { t } = useLanguage();
  const indicators = t('freeIndicators.indicators') || [];
  const downloadCta = t('freeIndicators.downloadCta') || 'Descargar ahora';
  const viewFullCta = t('freeIndicators.viewFullCta') || 'Ver versión completa';

  return (
    <>
      <SEO
        title={t('seo.freeIndicators.title')}
        description={t('seo.freeIndicators.description')}
        type="website"
      />
      <div className="min-h-screen bg-dark-900 pb-24">
        {/* 1. HERO DE TEXTO */}
        <section className="pt-16 md:pt-32 pb-12 px-6 text-center bg-[radial-gradient(ellipse_600px_200px_at_center_top,theme(colors.accent.primary/10%)_0%,transparent_70%)]">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-text-main tracking-tight mb-4">
              {t('freeIndicators.title')}
            </h1>
            <p className="text-lg text-text-muted leading-relaxed">
              {t('freeIndicators.subtitle')}
            </p>
          </div>
        </section>

        {/* 2. LISTA DE INDICADORES GRATUITOS */}
        <section className="px-6 container mx-auto max-w-5xl">
          <div className="space-y-12">
            {indicators.map((item) => {
              const contentImages = (item.contentImages || [])
                .map(resolveImage)
                .filter(Boolean);
              const hasCarousel = contentImages.length >= 2;
              const singleDetail = contentImages.length === 1;

              return (
                <article
                  key={item.id}
                  className="bg-dark-800 border border-dark-700 rounded-3xl overflow-hidden hover:border-dark-600 transition-all shadow-xl"
                >
                  <div className="p-6 md:p-10 space-y-8">
                    {/* Header de la tarjeta con título y badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-700/60 pb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-2xl md:text-3xl font-bold text-text-main">
                            {item.name}
                          </h2>
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            {item.badge}
                          </span>
                        </div>
                        {item.tagline && (
                          <p className="text-sm md:text-base font-medium text-text-muted">
                            {item.tagline}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Previsualización visual / Imagen */}
                    <div className="overflow-hidden rounded-2xl bg-dark-900 aspect-video md:aspect-[21/9]">
                      {hasCarousel ? (
                        <AutoCarousel
                          images={contentImages}
                          alt={item.name}
                          imageClassName="w-full h-full object-cover"
                        />
                      ) : singleDetail ? (
                        <ZoomableImage
                          src={contentImages[0]}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ZoomableImage
                          src={resolveImage(item.imageKey)}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Descripción principal */}
                    <p className="text-text-muted text-base md:text-lg leading-relaxed">
                      {item.description}
                    </p>

                    {/* Características incluidas */}
                    {Array.isArray(item.features) && item.features.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {item.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 text-text-main text-sm md:text-base">
                            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Nota explicativa de versión de prueba */}
                    {item.trialNotice && (
                      <div className="bg-accent-secondary/10 border border-accent-secondary/25 rounded-2xl p-5 md:p-6 flex items-start gap-4">
                        <Sparkles size={24} className="text-accent-secondary shrink-0 mt-0.5" />
                        <div className="text-sm md:text-base text-text-main leading-relaxed">
                          <p>{item.trialNotice}</p>
                        </div>
                      </div>
                    )}

                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                      <a
                        href={item.downloadUrl || '#'}
                        className="w-full sm:w-auto"
                        onClick={(e) => {
                          if (item.downloadUrl === '#' || !item.downloadUrl) {
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

                      {item.fullVersionSlug && (
                        <Link
                          to={`/indicators/${item.fullVersionSlug}`}
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
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};
