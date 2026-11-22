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

import { useState, useEffect, Fragment } from 'react';
import { useLanguage } from '../../context/languageContext';
import { Button } from '../Button';
import { ToggleSwitch } from '../ToggleSwitch';
import { CheckCircle2, GraduationCap, Headphones, Info, ExternalLink, Tag, Copy, Check } from 'lucide-react';

const CURRENCY_SYMBOL = '$';

const formatPrice = (value) =>
  typeof value === 'number' ? new Intl.NumberFormat('en-US').format(value) : value;

const parseTimestamp = (dateStr) => {
  if (!dateStr) return null;
  const ms = new Date(dateStr).getTime();
  return Number.isNaN(ms) ? null : ms;
};

const isBlackFridayActive = (bfConfig, nowMs) => {
  if (!bfConfig || bfConfig.enabled !== true) return false;

  if (import.meta.env.DEV && typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    if (params.get('promo') === 'black-friday' || params.get('banner') === 'black-friday') {
      return true;
    }
  }

  const startMs = parseTimestamp(bfConfig.startDate);
  const finalMs = parseTimestamp(bfConfig.finalDate);
  if (startMs !== null && nowMs < startMs) return false;
  if (finalMs !== null && nowMs >= finalMs) return false;
  return true;
};

const applyPlanPromo = (plan, bfConfig, promoActive) => {
  if (!promoActive || !plan?.id) return plan;
  const override = bfConfig?.overrides?.[plan.id];
  if (!override) return plan;

  return {
    ...plan,
    price: override.price ?? plan.price,
    crossedPrice: override.crossedPrice ?? plan.crossedPrice,
    savingsText: override.savingsText ?? plan.savingsText,
    installments: override.installments
      ? { ...plan.installments, ...override.installments }
      : plan.installments,
  };
};

// Mapa de iconos para los "extras" del plan (features que no son
// indicadores, p.ej. soporte tecnico). Si agregas un extra nuevo en
// pricing.json con un icon nuevo, agregalo aca tambien.
const EXTRA_ICONS = {
  support: Headphones,
};

// -----------------------------------------------------------------------------
// BlackFridayHeader — franja BLACK FRIDAY + píldoras de descuento y copiado
// -----------------------------------------------------------------------------
const BlackFridayHeader = ({ bfConfig, items }) => {
  const [copiedCode, setCopiedCode] = useState(null);

  if (!Array.isArray(items) || items.length === 0) return null;

  const handleCopy = (code) => {
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2200);
    }).catch(() => {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2200);
    });
  };

  return (
    <div className="mt-4 mb-2 flex flex-col items-center gap-4">
      {/* Título BLACK FRIDAY con líneas doradas laterales */}
      <div className="flex items-center justify-center gap-3 sm:gap-5 w-full max-w-xl">
        <span
          className="h-[1.5px] flex-1 max-w-[120px] bg-gradient-to-r from-transparent via-[#d49a24]/60 to-[#f6b82d]"
          aria-hidden="true"
        />
        <div className="inline-flex items-center gap-2 shrink-0">
          <span className="italic font-black uppercase tracking-tight text-white text-2xl sm:text-3xl md:text-[34px] leading-none">
            {bfConfig.titlePrefix || 'BLACK'}
          </span>
          <span
            className="italic font-black uppercase tracking-tight text-[#f6b82d] text-2xl sm:text-3xl md:text-[34px] leading-none"
            style={{ textShadow: '0 0 18px rgba(246, 184, 45, 0.35)' }}
          >
            {bfConfig.titleHighlight || 'FRIDAY'}
          </span>
        </div>
        <span
          className="h-[1.5px] flex-1 max-w-[120px] bg-gradient-to-l from-transparent via-[#d49a24]/60 to-[#f6b82d]"
          aria-hidden="true"
        />
      </div>

      {/* Fila de promociones y botones de código copiable */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5">
        {items.map((item, idx) => {
          const isCopied = copiedCode === item.code;
          const copyLabel = (bfConfig.copyAriaTemplate || 'Copy code {code}').replace('{code}', item.code);

          return (
            <Fragment key={`${item.code}-${idx}`}>
              {idx > 0 && (
                <span className="hidden md:inline-block h-5 w-px bg-white/20 shrink-0" aria-hidden="true" />
              )}

              <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                <div className="inline-flex items-center gap-2">
                  {item.badgeStyle === 'solid' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-[#f6b82d] text-[#0b0e14] font-black italic text-sm sm:text-[15px] tracking-tight leading-snug shadow-[0_0_14px_rgba(246,184,45,0.28)]">
                      {item.badge}
                    </span>
                  ) : (
                    <span className="font-black italic text-[#f6b82d] text-sm sm:text-base tracking-tight">
                      {item.badge}
                    </span>
                  )}
                  <span className="text-text-main font-medium text-sm sm:text-[15px]">
                    {item.label}
                  </span>
                </div>

                {item.code && (
                  <>
                    <span className="h-4 w-px bg-white/20 shrink-0" aria-hidden="true" />
                    <div className="inline-flex items-center gap-2">
                      <span className="text-text-muted text-sm">{bfConfig.codeLabel || 'Code:'}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(item.code)}
                        aria-label={copyLabel}
                        title={copyLabel}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[#d49a24]/75 bg-[#1a1204]/60 hover:border-[#f6b82d] hover:bg-[#2a1d06]/75 active:scale-95 transition-all cursor-pointer group focus:outline-none focus:ring-1 focus:ring-[#f6b82d]"
                      >
                        {isCopied ? (
                          <>
                            <Check size={14} className="text-emerald-400 stroke-[2.5]" />
                            <span className="text-xs sm:text-sm font-bold text-emerald-300">
                              {bfConfig.copiedLabel || 'Copied!'}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="font-black tracking-wide text-white text-sm">
                              {item.code}
                            </span>
                            <Copy size={14} className="text-[#f6b82d] group-hover:text-[#ffd86b] transition-colors" />
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// PricingCard — card individual. No sabe si viene de un array (EN) o del toggle
// (ES). Solo renderiza el `plan` que le pasan.
// -----------------------------------------------------------------------------
const PricingCard = ({ plan, t, bestValueText, currencyCode = 'USD' }) => {
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

      {/* Precio + moneda USD + tachado */}
      <div className="mt-4 mb-2 flex items-baseline gap-2.5 flex-wrap">
        <span className="text-4xl font-extrabold text-text-main">
          {CURRENCY_SYMBOL}{formatPrice(plan.price)}
          <span className="text-sm font-bold text-text-muted ml-1.5">{currencyCode}</span>
        </span>
        {hasCrossed && (
          <span className="text-base text-text-muted line-through">
            {CURRENCY_SYMBOL}{formatPrice(plan.crossedPrice)} {currencyCode}
          </span>
        )}
      </div>

      {/* Etiqueta de ahorro promocional (ej. Black Friday) */}
      {plan.savingsText && (
        <div className="mb-3 inline-flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base">
          <Tag size={15} className="shrink-0" aria-hidden="true" />
          <span>{plan.savingsText}</span>
        </div>
      )}

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

        {/* Indicadores añadidos / diferenciados (ej. Depth Chart y Depth Live) */}
        {Array.isArray(plan.bonusIndicators) && plan.bonusIndicators.map((item, i) => {
          const id = typeof item === 'string' ? item : item.id;
          const label = typeof item === 'object' && item.label ? item.label : `+ ${t(`indicators.${id}.name`)}`;
          return (
            <li key={`bonus-${id || i}`} className="flex items-center gap-3 text-sm">
              <CheckCircle2
                size={16}
                className="text-purple-400 shrink-0"
              />
              <span className="text-purple-300 font-semibold tracking-wide">{label}</span>
            </li>
          );
        })}

        {/* Extras del plan (features no-indicador, p.ej. soporte técnico al final).
            Se renderizan en la misma <ul> que los indicators, separados
            visualmente por el icono distinto (LifeBuoy en vez de check). */}
        {Array.isArray(plan.extras) && plan.extras.map((extra, i) => {
          const Icon = EXTRA_ICONS[extra.icon];
          if (!Icon) return null;
          return (
            <li key={`extra-${i}`} className="flex items-center gap-3 text-sm">
              <Icon
                size={16}
                className={highlighted ? 'text-accent-primary shrink-0' : 'text-accent-secondary shrink-0'}
              />
              <span>{t(`pricing.extras.${extra.icon}`)}</span>
            </li>
          );
        })}
      </ul>

      {/* Plus content — solo en planes Plus (ES). Lista de cursos. */}
      {Array.isArray(plan.plusContent) && plan.plusContent.length > 0 && (
        <div className="mt-6 pt-6 border-t border-dark-700">
          <a
            href={plan.plusContentUrl || t('pricing.plusContentUrl') || 'https://3ctrading.gumroad.com/l/logic-pack-plus'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-accent-secondary font-bold mb-3 hover:text-accent-secondary/80 hover:underline underline-offset-4 transition-all group/plus"
          >
            <span>{t('pricing.plusContentTitle')}</span>
            <ExternalLink
              size={13}
              className="shrink-0 transition-transform group-hover/plus:translate-x-0.5 group-hover/plus:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
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
          <p className="text-xs uppercase tracking-wider text-accent-secondary font-bold mb-2">
            {t('pricing.installmentsTitle')}
          </p>
          {plan.installments.checkoutUrl ? (
            <a
              href={plan.installments.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-accent-secondary hover:text-accent-secondary/80 transition-colors py-1 px-3 rounded-lg bg-accent-secondary/10 hover:bg-accent-secondary/20 border border-accent-secondary/30 group/inst"
            >
              <span>{plan.installments.text}</span>
              <span className="transition-transform group-hover/inst:translate-x-0.5" aria-hidden="true">&rarr;</span>
            </a>
          ) : (
            <p className="text-sm font-semibold text-accent-secondary">
              {plan.installments.text}
            </p>
          )}
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
  const [nowMs, setNowMs] = useState(() => Date.now());

  const bfConfig = section.blackFriday;

  // Chequeo periódico para activar/desactivar la promo Black Friday al cruzar 00:00
  useEffect(() => {
    if (!bfConfig || bfConfig.enabled !== true) return undefined;
    const interval = setInterval(() => {
      setNowMs(Date.now());
    }, 30000);
    return () => clearInterval(interval);
  }, [bfConfig]);

  const promoActive = isBlackFridayActive(bfConfig, nowMs);
  const dataRequirementNote = section.dataRequirementNote;
  const currencyCode = section.currencyCode || 'USD';

  const isArrayLayout = Array.isArray(plans);
  const rawPlans = isArrayLayout
    ? plans
    : isLifetime
      ? [plans.lifetime.basic, plans.lifetime.plus]
      : [plans.yearly.basic, plans.yearly.plus];

  const currentPlans = rawPlans.map((plan) => applyPlanPromo(plan, bfConfig, promoActive));

  const activeBannerItems = promoActive
    ? isArrayLayout
      ? bfConfig?.banners?.all
      : isLifetime
        ? bfConfig?.banners?.lifetime
        : bfConfig?.banners?.yearly
    : null;

  return (
    <section className="px-6 container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">
          {t(titleKey)}
        </h2>
        {promoActive && (
          <BlackFridayHeader bfConfig={bfConfig} items={activeBannerItems} />
        )}
        {!isArrayLayout && (
          <ToggleSwitch
            isLifetime={isLifetime}
            onToggle={() => setIsLifetime(!isLifetime)}
            labels={section.billingToggle}
          />
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-5xl mx-auto">
        {currentPlans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            t={t}
            bestValueText={bestValueText}
            currencyCode={currencyCode}
          />
        ))}
      </div>

      {dataRequirementNote && (
        <div className="mt-8 text-center">
          <p className="text-xs md:text-sm text-text-muted flex items-center justify-center gap-1.5 max-w-2xl mx-auto">
            <Info size={14} className="text-purple-400 shrink-0" />
            <span>*{dataRequirementNote}</span>
          </p>
        </div>
      )}
    </section>
  );
};
