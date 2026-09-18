// src/pages/License.jsx
import { useLanguage } from '../context/languageContext';
import { SEO } from '../components/SEO';
import { LicenseForm } from '../components/LicenseForm';
import { ZoomableImage } from '../components/ImageLightbox';
import { resolveImage } from '../data/imageResolver';
import { 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Mail, 
  MessageCircle, 
  ExternalLink,
  Info
} from 'lucide-react';

export const License = () => {
  const { t } = useLanguage();
  const instructions = t('license.step1.instructions') || [];

  return (
    <>
      <SEO
        title={t('seo.license.title')}
        description={t('seo.license.description')}
        type="website"
      />

      <div className="min-h-screen bg-dark-900 pb-24">
        {/* 1. BANNER DE ADVERTENCIA SUPERIOR */}
        <div className="bg-amber-500/15 border-b border-amber-500/30 text-amber-300 py-3 px-4 text-center text-xs sm:text-sm font-medium flex items-center justify-center gap-2.5 shadow-sm">
          <AlertTriangle size={18} className="shrink-0 text-amber-400" />
          <span>{t('license.alert')}</span>
        </div>

        {/* 2. HERO PRINCIPAL */}
        <section className="pt-12 md:pt-20 pb-10 px-6 text-center bg-[radial-gradient(ellipse_600px_200px_at_center_top,theme(colors.accent.primary/12%)_0%,transparent_70%)]">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-main tracking-tight mb-4">
              {t('license.title')}
            </h1>
            <p className="text-base sm:text-lg text-text-muted leading-relaxed">
              {t('license.subtitle')}
            </p>
          </div>
        </section>

        {/* 3. CONTENIDO EN 2 COLUMNAS (GUÍA PASO 1 + FORMULARIO PASO 2) */}
        <section className="px-6 container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* COLUMNA IZQUIERDA: GUÍA PASO 1 (MACHINE ID) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-dark-800 border border-dark-700/80 rounded-2xl p-6 sm:p-8 shadow-xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent-primary/10 text-accent-primary border border-accent-primary/25 mb-3">
                  {t('license.step1.badge')}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-text-main mb-3">
                  {t('license.step1.title')}
                </h2>
                <p className="text-text-muted text-sm leading-relaxed mb-6">
                  {t('license.step1.description')}
                </p>

                {/* Pasos ordenados */}
                <ol className="space-y-3.5 mb-6">
                  {Array.isArray(instructions) &&
                    instructions.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-text-main leading-relaxed">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-primary/15 text-accent-primary font-bold text-xs shrink-0 mt-0.5 border border-accent-primary/30">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                </ol>

                {/* Captura de NinjaTrader 8 con Lightbox */}
                <div className="space-y-2">
                  <div className="rounded-xl overflow-hidden border border-dark-600/80 bg-dark-900 shadow-md">
                    <ZoomableImage
                      src={resolveImage('machine_id')}
                      alt="NinjaTrader 8 Machine ID Location"
                      loading="lazy"
                      className="w-full h-auto object-cover cursor-zoom-in"
                    />
                  </div>
                  <p className="text-xs text-text-muted text-center flex items-center justify-center gap-1.5 pt-1">
                    <Info size={14} className="text-accent-primary" />
                    <span>{t('license.step1.imageHint')}</span>
                  </p>
                </div>
              </div>

              {/* Tarjetas de Soporte Rápido */}
              <div className="bg-dark-800/60 border border-dark-700/60 rounded-2xl p-6 space-y-4">
                <h3 className="font-semibold text-text-main text-base flex items-center gap-2">
                  <HelpCircle size={18} className="text-accent-primary" />
                  <span>{t('license.support.title')}</span>
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {t('license.support.description')}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* WhatsApp */}
                  <a
                    href={t('license.support.whatsappUrl')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-dark-900 border border-dark-700/80 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all text-left group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <MessageCircle size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-text-muted">WhatsApp</p>
                      <p className="text-xs font-semibold text-text-main truncate group-hover:text-emerald-400 transition-colors">
                        {t('license.support.whatsapp')}
                      </p>
                    </div>
                  </a>

                  {/* Correo */}
                  <a
                    href={`mailto:${t('license.support.email')}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-dark-900 border border-dark-700/80 hover:border-accent-primary/40 hover:bg-accent-primary/5 transition-all text-left group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-accent-primary/10 text-accent-primary border border-accent-primary/30 flex items-center justify-center shrink-0">
                      <Mail size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-text-muted">Email</p>
                      <p className="text-xs font-semibold text-text-main truncate group-hover:text-accent-primary transition-colors">
                        {t('license.support.email')}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: FORMULARIO DE LICENCIA */}
            <div className="lg:col-span-6">
              <LicenseForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

