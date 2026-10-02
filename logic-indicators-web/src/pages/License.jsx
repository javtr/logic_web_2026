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
  ExternalLink,
  Info
} from 'lucide-react';

// Icono SVG oficial de Discord
const DiscordIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

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
                  {/* Discord */}
                  <a
                    href={t('license.support.discordUrl')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-dark-900 border border-dark-700/80 hover:border-[#5865F2]/40 hover:bg-[#5865F2]/5 transition-all text-left group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#5865F2]/10 text-[#5865F2] border border-[#5865F2]/30 flex items-center justify-center shrink-0">
                      <DiscordIcon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-text-muted">Discord</p>
                      <p className="text-xs font-semibold text-text-main truncate group-hover:text-[#5865F2] transition-colors">
                        {t('license.support.discord')}
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

