// src/components/pricing/PricingSection.jsx
// Sección de pricing reusable. Lee TODO desde pricing.json:
//   - sectionTitle, bestValueBadge, billingToggle, singlePlan, suitePlan
//
// El plan destacado (con badge "Best Value", borde verde, glow) se renderiza solo
// si su JSON tiene `"highlighted": true`. Así "cuál plan es el destacado" es data,
// no código.
//
// Los precios están como números en el JSON; el símbolo de moneda y los sufijos
// ("yr" / "once") se arman acá. Si después multi-moneda, mover a JSON.
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../Button';
import { ToggleSwitch } from '../ToggleSwitch';
import { CheckCircle2 } from 'lucide-react';

const CURRENCY_SYMBOL = '$';

// Orden de los planes en la grilla. El highlighted se renderiza igual en su posición
// (no cambia layout); solo cambia el borde, el badge y el color del icono.
const PLAN_KEYS = ['singlePlan', 'suitePlan'];

export const PricingSection = ({ defaultIsLifetime = true, titleKey = 'pricing.sectionTitle' }) => {
  const { t } = useLanguage();
  const [isLifetime, setIsLifetime] = useState(defaultIsLifetime);

  const labels = t('pricing.billingToggle');
  const bestValueText = t('pricing.bestValueBadge');

  return (
    <section className="px-6 container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">{t(titleKey)}</h2>
        <ToggleSwitch
          isLifetime={isLifetime}
          onToggle={() => setIsLifetime(!isLifetime)}
          labels={labels}
        />
      </div>

      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-5xl mx-auto">
        {PLAN_KEYS.map((key) => {
          const plan = t(`pricing.${key}`);
          const highlighted = plan.highlighted === true;
          const price = isLifetime ? plan.priceLifetime : plan.priceYearly;
          const period = isLifetime ? plan.billingPeriodLifetime : plan.billingPeriodYearly;
          const accentText = highlighted ? 'text-text-main' : 'text-text-muted';

          return (
            <div
              key={key}
              className={`flex-1 p-8 rounded-3xl bg-dark-800 flex flex-col relative ${
                highlighted
                  ? 'border-2 border-accent-primary shadow-[0_0_30px_theme(colors.accent.primary/10%)]'
                  : 'border border-dark-700'
              }`}
            >
              {highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-primary text-dark-900 font-bold px-4 py-1 rounded-full text-sm uppercase tracking-wider">
                  {bestValueText}
                </div>
              )}

              <h3 className="text-2xl font-bold text-text-main mb-2">{plan.name}</h3>
              <p className={`mb-6 ${accentText}`}>{plan.description}</p>

              <div className="text-4xl font-extrabold text-text-main mb-8">
                {CURRENCY_SYMBOL}{price} <span className="text-lg text-text-muted font-normal">/ {period}</span>
              </div>

              <ul className={`space-y-4 mb-8 flex-grow ${accentText}`}>
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2
                      size={18}
                      className={highlighted ? 'text-accent-primary' : 'text-accent-secondary'}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={highlighted ? 'primary' : 'outline'}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
