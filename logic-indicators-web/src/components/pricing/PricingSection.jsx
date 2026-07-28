// src/components/pricing/PricingSection.jsx
// =============================================================================
// SECCIÓN DE PRICING — soporta 2 layouts según idioma:
//   - EN: array de 2 cards (Annual, Lifetime) SIN toggle
//   - ES: objeto {yearly:{basic,plus}, lifetime:{basic,plus}} CON toggle
//
// Detección: en runtime, `Array.isArray(t('pricing.plans'))`. Si es array,
// render plano; si es objeto, render con toggle Anual ⇄ Lifetime.
//
// El plan destacado (badge "Mejor Opción" / "Best Value" + borde accent +
// glow) se renderiza cuando su JSON tiene `"highlighted": true`.
//
// Cada card muestra:
//   1. Nombre del plan + billing label
//   2. Precio actual + precio tachado (si crossedPrice existe)
//   3. Lista de indicators (resueltos vía t('indicators.{id}.name'))
//   4. Plus content (solo si plusContent existe) — cursos del Pack Plus
//   5. Installments (solo si installments existe) — solo en Lifetime
//   6. CTA → abre checkoutUrl en nueva pestaña
//
// `defaultIsLifetime` se respeta: si la página usa toggle, empieza en
// lifetime. Home lo usa y por defecto muestra el lifetime (el highlight).
// =============================================================================

import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../Button';
import { ToggleSwitch } from '../ToggleSwitch';
import { CheckCircle2, GraduationCap } from 'lucide-react';

const CURRENCY_SYMBOL = '$';

// -----------------------------------------------------------------------------
// PricingCard — card individual. No sabe si viene de un array (EN) o del toggle
// (ES). Solo renderiza el `plan` que le pasan.
// -----------------------------------------------------------------------------
const PricingCard = ({ plan, t, bestValueText }) => {
  const highlighted = plan.highlighted === true;
  const borderClasses = highlighted
    ? 'border-2 border-accent-primary shadow-[0_0_30px_theme(colors.accent.primary/10%)]'
    : 'border border-dark-700';
  const accentText = highlighted ? 'text-text-main' : 'text-text-muted';
  const hasCrossed = typeof plan.crossedPrice === 'number';

  return (
    <div
      className={`flex-1 p-8 rounded-3xl bg-dark-800 flex flex-col relative ${borderClasses}`}
    >
      {/* Badge "Mejor Opción" / "Best Value" — solo si highlighted.
          whitespace-nowrap: garantiza que el texto no se rompa en cards
          angostas (con font-bold + uppercase + tracking-wider + px-4 a
          veces el navegador wrappeaba "MEJOR OPCIÓN" en 2 líneas). */}
      {highlighted && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-primary text-dark-900 font-bold px-4 py-1 rounded-full text-sm uppercase tracking-wider whitespace-nowrap">
          {bestValueText}
        </div>
      )}

      {/* Nombre + billing label */}
      <h3 className="text-2xl font-bold text-text-main">{plan.name}</h3>
      <p className={`text-sm mt-0.5 ${accentText}`}>{plan.billingLabel}</p>

      {/* Precio + tachado */}
      <div className="mt-4 mb-2 flex items-baseline gap-3">
        <span className="text-4xl font-extrabold text-text-main">
          {CURRENCY_SYMBOL}{plan.price}
        </span>
        {hasCrossed && (
          <span className="text-base text-text-muted line-through">
            {CURRENCY_SYMBOL}{plan.crossedPrice}
          </span>
        )}
      </div>

      {/* Indicators (los 7 del suite, o el subset que defina cada plan) */}
      <ul className={`space-y-3 mt-4 flex-grow ${accentText}`}>
        {(plan.indicators || []).map((indicatorId) => (
          <li key={indicatorId} className="flex items-center gap-3 text-sm">
            <CheckCircle2
              size={16}
              className={highlighted ? 'text-accent-primary shrink-0' : 'text-accent-secondary shrink-0'}
            />
            <span>{t(`indicators.${indicatorId}.name`)}</span>
          </li>
        ))}
      </ul>

      {/* Plus content — solo en planes Plus (ES). Lista de cursos. */}
      {Array.isArray(plan.plusContent) && plan.plusContent.length > 0 && (
        <div className="mt-6 pt-6 border-t border-dark-700">
          <p className="text-xs uppercase tracking-wider text-accent-secondary font-bold mb-3">
            {t('pricing.plusContentTitle')}
          </p>
          <ul className="space-y-2">
            {plan.plusContent.map((item, i) => (
              <li key={i} className="text-sm text-text-muted leading-snug">
                <span className="inline-flex items-start gap-2">
                  <GraduationCap
                    size={14}
                    className="text-accent-secondary shrink-0 mt-0.5"
                  />
                  <span>
                    <span className="text-text-main font-medium">{item.title}</span>
                    {item.note && (
                      <span className="block text-xs text-text-muted/70 mt-0.5">
                        {item.note}
                      </span>
                    )}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA — siempre antes de installments (installments es info
          complementaria, no compite con la acción principal). */}
      <a
        href={plan.checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-6"
      >
        <Button
          variant={highlighted ? 'primary' : 'outline'}
          className="w-full"
        >
          {plan.cta}
        </Button>
      </a>

      {/* Installments — solo en planes Lifetime. Caja destacada DEBAJO
          del botón, con título "Diferir pagos" / "Installments" para
          separar visualmente del bloque de precio que está arriba. */}
      {plan.installments && (
        <div className="mt-4 pt-4 border-t border-dark-700 text-center">
          <p className="text-xs uppercase tracking-wider text-accent-primary font-bold mb-2">
            {t('pricing.installmentsTitle')}
          </p>
          <p className="text-sm font-semibold text-accent-primary">
            {plan.installments.text}
          </p>
          <p className="text-xs text-text-muted mt-1 leading-snug">
            {plan.installments.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
};

// -----------------------------------------------------------------------------
// PricingSection — wrapper público. Detecta el shape de `t('pricing.plans')`
// y renderiza el layout apropiado (con o sin toggle).
// -----------------------------------------------------------------------------
export const PricingSection = ({
  defaultIsLifetime = true,
  titleKey = 'pricing.sectionTitle',
}) => {
  const { t } = useLanguage();
  const section = t('pricing');
  const plans = section.plans;
  const bestValueText = section.bestValueBadge || 'Best Value';

  // Reglas de Hooks: useState debe estar ANTES de cualquier return
  // condicional, así se llama siempre en el mismo orden.
  // Solo lo usamos cuando el shape lo requiere (ES con toggle), pero
  // declararlo igual mantiene el orden estable entre renders de EN y ES.
  const [isLifetime, setIsLifetime] = useState(defaultIsLifetime);

  // EN: plans = [Annual, Lifetime] (array plano, sin toggle)
  if (Array.isArray(plans)) {
    return (
      <section className="px-6 container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">
            {t(titleKey)}
          </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              t={t}
              bestValueText={bestValueText}
            />
          ))}
        </div>
      </section>
    );
  }

  // ES: plans = { yearly:{basic,plus}, lifetime:{basic,plus} } con toggle
  const currentPlans = isLifetime
    ? [plans.lifetime.basic, plans.lifetime.plus]
    : [plans.yearly.basic, plans.yearly.plus];
  const toggleLabels = section.billingToggle;

  return (
    <section className="px-6 container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">
          {t(titleKey)}
        </h2>
        <ToggleSwitch
          isLifetime={isLifetime}
          onToggle={() => setIsLifetime(!isLifetime)}
          labels={toggleLabels}
        />
      </div>
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-5xl mx-auto">
        {currentPlans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            t={t}
            bestValueText={bestValueText}
          />
        ))}
      </div>
    </section>
  );
};
