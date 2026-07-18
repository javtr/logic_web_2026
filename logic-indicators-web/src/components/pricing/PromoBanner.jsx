// src/components/pricing/PromoBanner.jsx
// Banner de promoción OPCIONAL. Lee desde pricing.promotion.* en el JSON.
// Si `pricing.promotion.enabled` es false (o falta), retorna null → no renderiza nada.
//
// Activar/desactivar promociones es 100% data — un cambio de `"enabled": false` a
// `"enabled": true` en el JSON sin tocar código.
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../Button';
import { Sparkles, ArrowRight } from 'lucide-react';

export const PromoBanner = () => {
  const { t } = useLanguage();
  const promo = t('pricing.promotion');

  // Gate: si no hay promo activa, no renderiza nada.
  if (!promo || promo.enabled !== true) return null;

  return (
    <section className="px-6 container mx-auto mt-28">
      <div className="relative overflow-hidden rounded-3xl border border-accent-primary/30 bg-gradient-to-r from-accent-primary/10 via-accent-secondary/10 to-accent-primary/10 p-8 md:p-10">
        {/* Decoración de fondo */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent-secondary/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex-1">
            {/* Badge */}
            {promo.badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/20 border border-accent-primary/40 mb-3">
                <Sparkles size={14} className="text-accent-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-accent-primary">
                  {promo.badge}
                </span>
              </div>
            )}

            {/* Título */}
            {promo.title && (
              <h2 className="text-2xl md:text-3xl font-extrabold text-text-main mb-2">
                {promo.title}
              </h2>
            )}

            {/* Subtítulo */}
            {promo.subtitle && (
              <p className="text-text-muted text-base md:text-lg">
                {promo.subtitle}
              </p>
            )}
          </div>

          {/* CTA */}
          {promo.ctaText && (
            <div className="flex-shrink-0">
              <Link to={promo.ctaLink || '#'}>
                <Button variant="primary" className="text-base px-6 py-3 inline-flex items-center gap-2">
                  {promo.ctaText}
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
