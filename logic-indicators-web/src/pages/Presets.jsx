// src/pages/Presets.jsx
// =============================================================================
// Pagina publica de Presets — ubicada en /resources/presets.
// Estructura:
//   1) Hero (titulo + subtitulo)
//   2) TutorialSection — bloque destacado arriba con 2 pasos (imagen + texto)
//   3) Por cada indicator: PresetSection — fila scrolleable horizontal con
//      barra de progreso + flechas prev/next en la parte INFERIOR.
//
// El scroll horizontal es uniforme para TODOS los indicators, sin importar
// cuantos presets tenga (1, 2, 3 o 20). Cuando la fila cabe entera en
// pantalla (pocas cards en viewport ancho) las flechas se ocultan porque no
// hay overflow; la barra de progreso queda al 100% como indicador neutro.
//
// Fuente de verdad: src/data/{en,es}/presets.json (namespace 'presets').
// imageKey/xmlUrl son placeholders hasta que se suban los assets reales.
// =============================================================================

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/languageContext';
import { useAuth } from '../hooks/useAuth';
import { SEO } from '../components/SEO';
import { Button } from '../components/Button';
import { ZoomableImage } from '../components/ImageLightbox';
import { resolveImage } from '../data/imageResolver';
import { Download, ChevronLeft, ChevronRight, Lock, LogIn, X } from 'lucide-react';

const PresetCard = ({ preset, cta, isAuthenticated, onRequireAuth }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  // description es opcional: si esta vacia o ausente, no se renderiza <p>
  const hasDescription = typeof preset.description === 'string' && preset.description.trim().length > 0;

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      onRequireAuth(preset);
      return;
    }
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const response = await fetch(preset.xmlUrl);
      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = blobUrl;
      const downloadName = preset.xmlUrl.split('/').pop() || `${preset.name}.xml`;
      a.download = downloadName.endsWith('.xml') ? downloadName : `${downloadName}.xml`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch {
      // Fallback si fetch directo no es permitido por CORS o falla la red
      const a = document.createElement('a');
      a.href = preset.xmlUrl;
      a.target = '_blank';
      a.download = preset.xmlUrl.split('/').pop() || 'preset.xml';
      a.click();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <article className="group flex flex-col h-full bg-dark-800 border border-dark-700 hover:border-accent-secondary/40 rounded-2xl overflow-hidden transition-all duration-300">
      {/* Imagen: aspect 4:3, ZoomableImage reutilizado del lightbox global */}
      <div className="aspect-[4/3] w-full bg-dark-900 overflow-hidden">
        <ZoomableImage
          src={resolveImage(preset.imageKey)}
          alt={preset.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Contenido: nombre + descripcion opcional + boton de descarga */}
      <div className="flex flex-col flex-grow p-5 gap-3">
        <div>
          <h3 className="text-lg font-bold text-text-main leading-tight">
            {preset.name}
          </h3>
          {hasDescription && (
            <p className="text-sm text-text-muted leading-relaxed mt-1">
              {preset.description}
            </p>
          )}
        </div>

        {/* Botón de descarga forzada */}
        <div className="mt-auto">
          <Button
            variant="primary"
            className="w-full"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            <Download size={16} className={isDownloading ? 'animate-bounce' : ''} />
            {cta}
          </Button>
        </div>
      </div>
    </article>
  );
};

// Fila scrolleable con controles en la parte inferior (progress bar + flechas).
// Se usa para TODOS los indicators. Las flechas se ocultan automaticamente
// cuando no hay overflow (1-3 cards en pantallas anchas).
const ScrollablePresetRow = ({ presets, cta, isAuthenticated, onRequireAuth }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  // 0..1 — fraccion de scroll. 1 = al final o sin overflow.
  const [scrollProgress, setScrollProgress] = useState(1);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) {
      // No hay overflow: barra al 100%, ninguna flecha visible.
      setScrollProgress(1);
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    setScrollProgress(el.scrollLeft / max);
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft < max - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [presets.length]);

  const scrollByCard = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const firstCard = el.querySelector('[data-preset-card]');
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 300;
    const gap = 24; // gap-6 = 24px
    const delta = (cardWidth + gap) * (direction === 'left' ? -1 : 1);
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Contenedor scrolleable. snap-x + snap-mandatory = snap a cada card.
          [scrollbar-width:none] y equivalentes ocultan la scrollbar nativa
          pero mantienen la funcionalidad (mobile-friendly). */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {presets.map((preset) => (
          <div
            key={preset.id}
            data-preset-card
            className="shrink-0 w-[260px] sm:w-[280px] md:w-[300px] lg:w-[320px] snap-start"
          >
            <PresetCard
              preset={preset}
              cta={cta}
              isAuthenticated={isAuthenticated}
              onRequireAuth={onRequireAuth}
            />
          </div>
        ))}
      </div>

      {/* Controles inferiores: progress bar (full width arriba) + flechas
          centradas debajo. La barra SIEMPRE se muestra (al 100% cuando no
          hay overflow es visualmente neutro). Las flechas solo cuando hay
          algo a ese lado. */}
      <div className="mt-4 flex flex-col gap-3">
        {/* Progress bar: 2px de alto, fondo dark-700, fill accent-secondary */}
        <div
          className="relative h-[2px] bg-dark-700 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(scrollProgress * 100)}
          aria-label="Scroll progress"
        >
          <div
            className="absolute inset-y-0 left-0 bg-accent-secondary rounded-full transition-[width] duration-150 ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Flechas: ghost style, small, centradas horizontalmente. */}
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => scrollByCard('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll presets left"
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-dark-700 text-text-muted bg-dark-800/50 transition-all duration-200 hover:border-accent-secondary/40 hover:text-text-main hover:bg-dark-700 disabled:opacity-30 disabled:hover:border-dark-700 disabled:hover:text-text-muted disabled:hover:bg-dark-800/50"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard('right')}
            disabled={!canScrollRight}
            aria-label="Scroll presets right"
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-dark-700 text-text-muted bg-dark-800/50 transition-all duration-200 hover:border-accent-secondary/40 hover:text-text-main hover:bg-dark-700 disabled:opacity-30 disabled:hover:border-dark-700 disabled:hover:text-text-muted disabled:hover:bg-dark-800/50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const PresetSection = ({ indicatorId, presets, cta, isAuthenticated, onRequireAuth, t }) => {
  const indicatorName = t(`indicators.${indicatorId}.name`);

  return (
    <section className="scroll-mt-24">
      <div className="mb-6 border-b border-dark-700 pb-3 flex items-baseline justify-between gap-3">
        <h2 className="text-2xl md:text-3xl font-bold text-text-main">
          {indicatorName}
        </h2>
        <span className="text-xs text-text-muted shrink-0">
          {presets.length} {presets.length === 1 ? 'preset' : 'presets'}
        </span>
      </div>

      <ScrollablePresetRow
        presets={presets}
        cta={cta}
        isAuthenticated={isAuthenticated}
        onRequireAuth={onRequireAuth}
      />
    </section>
  );
};

// Card de un paso del tutorial. Misma estetica que PresetCard para coherencia,
// pero con un badge "PASO 1" / "STEP 1" arriba del titulo.
// Schema flexible: `description` (intro, opcional), `steps` (array de strings
// para lista numerada, opcional), `note` (linea de cierre, opcional).
// El componente renderiza los bloques que existan.
const TutorialStepCard = ({ step, stepLabel }) => {
  const hasSteps = Array.isArray(step.steps) && step.steps.length > 0;
  const hasDescription = typeof step.description === 'string' && step.description.trim().length > 0;
  const hasNote = typeof step.note === 'string' && step.note.trim().length > 0;

  return (
    <article className="group flex flex-col h-full bg-dark-800 border border-dark-700 hover:border-accent-secondary/40 rounded-2xl overflow-hidden transition-all duration-300">
      <div className="aspect-[16/10] w-full bg-dark-900 overflow-hidden">
        <ZoomableImage
          src={resolveImage(step.imageKey)}
          alt={step.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 sm:p-5 flex flex-col gap-2.5 flex-grow">
        <span className="inline-block self-start px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-accent-secondary bg-accent-secondary/10 border border-accent-secondary/30 rounded-full">
          {stepLabel} {step.stepNumber}
        </span>
        <h3 className="text-base md:text-lg font-bold text-text-main leading-snug">
          {step.title}
        </h3>
        <div className="text-xs sm:text-sm text-text-muted leading-relaxed space-y-2.5">
          {hasDescription && <p>{step.description}</p>}
          {hasSteps && (
            <ol className="space-y-1.5 pl-4 list-decimal marker:text-accent-secondary marker:font-bold">
              {step.steps.map((s, i) => (
                <li key={i} className="pl-1">
                  {s}
                </li>
              ))}
            </ol>
          )}
          {hasNote && (
            <p className="pt-2 border-t border-dark-700/60 text-xs text-text-muted/90 italic">
              {step.note}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

// Bloque de tutorial. Si no hay steps en el JSON, no se renderiza nada.
const TutorialSection = ({ tutorial }) => {
  if (!tutorial || !Array.isArray(tutorial.steps) || tutorial.steps.length === 0) {
    return null;
  }
  return (
    <section className="mb-12 md:mb-16 p-5 md:p-7 bg-dark-800/40 border border-dark-700 rounded-2xl">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-2">
          {tutorial.title}
        </h2>
        <p className="text-sm md:text-base text-text-muted max-w-2xl mx-auto leading-relaxed">
          {tutorial.subtitle}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        {tutorial.steps.map((step) => (
          <TutorialStepCard
            key={step.stepNumber}
            step={step}
            stepLabel={tutorial.stepLabel}
          />
        ))}
      </div>
    </section>
  );
};

// Modal de aviso cuando un usuario no autenticado intenta descargar una plantilla
const AuthRequiredModal = ({ isOpen, onClose, t }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleGoToLogin = () => {
    onClose();
    navigate('/login?next=/resources/presets');
  };

  const modalData = t('presets.authModal') || {};

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="auth-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          aria-hidden="true"
        >
          <motion.div
            key="auth-modal-dialog"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-dark-800 border border-dark-700 rounded-2xl p-6 sm:p-8 shadow-2xl text-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
          >
            {/* Botón de cerrar (X) */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-text-muted hover:text-text-main p-1.5 rounded-lg hover:bg-white/5 transition-colors"
              aria-label={modalData.cancelCta || 'Cerrar'}
            >
              <X size={20} />
            </button>

            {/* Icono Candado */}
            <div className="mx-auto w-16 h-16 rounded-2xl bg-accent-primary/10 border border-accent-primary/25 flex items-center justify-center mb-5 text-accent-primary">
              <Lock size={30} />
            </div>

            {/* Título y Mensaje */}
            <h3 id="auth-modal-title" className="text-xl sm:text-2xl font-bold text-text-main mb-3">
              {modalData.title}
            </h3>
            <p className="text-sm text-text-muted leading-relaxed mb-5">
              {modalData.description}
            </p>

            {/* Nota de beneficio */}
            {modalData.perkNote && (
              <div className="mb-6 py-2.5 px-3.5 rounded-xl bg-dark-900/70 border border-white/5 text-xs text-text-muted leading-snug">
                💡 {modalData.perkNote}
              </div>
            )}

            {/* Acciones */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                className="w-full justify-center order-1 sm:order-2"
                onClick={handleGoToLogin}
              >
                <LogIn size={16} />
                {modalData.loginCta}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-center order-2 sm:order-1"
                onClick={onClose}
              >
                {modalData.cancelCta}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const Presets = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleRequireAuth = () => {
    setIsAuthModalOpen(true);
  };

  const section = t('presets');
  const presets = Array.isArray(section.presets) ? section.presets : [];
  const tutorial = section.tutorial;

  // Agrupa presets por indicatorId preservando el orden de aparición
  // del JSON (matches INDICATOR_ORDER).
  const groupedByIndicator = presets.reduce((acc, preset) => {
    const key = preset.indicatorId;
    if (!acc[key]) acc[key] = [];
    acc[key].push(preset);
    return acc;
  }, {});

  const indicatorGroups = Object.entries(groupedByIndicator);

  return (
    <>
      <SEO
        title={t('seo.presets.title')}
        description={t('seo.presets.description')}
        type="website"
      />

      <div className="container mx-auto px-6 py-16 md:py-24 max-w-7xl">
        {/* Hero */}
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-main mb-4 tracking-tight">
            {section.pageTitle}
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            {section.pageSubtitle}
          </p>
        </div>

        {/* Tutorial — bloque destacado arriba */}
        <TutorialSection tutorial={tutorial} />

        {/* Body: empty state o lista de indicators */}
        {presets.length === 0 ? (
          <p className="text-center text-text-muted italic">
            {section.emptyMessage}
          </p>
        ) : (
          <div className="space-y-12 md:space-y-16">
            {indicatorGroups.map(([indicatorId, indicatorPresets]) => (
              <PresetSection
                key={indicatorId}
                indicatorId={indicatorId}
                presets={indicatorPresets}
                cta={t('presets.cta')}
                isAuthenticated={isAuthenticated}
                onRequireAuth={handleRequireAuth}
                t={t}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal de acceso exclusivo */}
      <AuthRequiredModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        t={t}
      />
    </>
  );
};
