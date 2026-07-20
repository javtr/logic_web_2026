// src/components/pricing/TrustSection.jsx
// Sección de seguridad + medios de pago. Lee TODO desde home.trust.* en el JSON.
//
// NOTA sobre el namespace: aunque el archivo vive en src/components/pricing/,
// los textos viven en home.json (no en pricing.json). La razón es que la
// sección "nace" en Home y Pricing la reusa; Home es la fuente de la verdad.
// Mantener el namespace estable evita romper /pricing cuando se reorganiza
// home.json, y deja claro de dónde vienen los textos.
//
// Reusado en:
//   - Home (`/`) — justo debajo de <PricingSection />.
//   - Pricing (`/pricing`) — debajo de las tarjetas de precio.
//
// Los íconos de cada medio de pago están mapeados por nombre. Si más adelante
// quieres SVGs de marca reales (Visa azul, PayPal azul, etc.), solo cambias el
// `methodIcons`. No hace falta tocar el JSON ni el resto del componente.
import { useLanguage } from '../../context/LanguageContext';
import { Lock, ShieldCheck, CreditCard, Wallet } from 'lucide-react';

// Mapeo de método de pago → ícono. Si el método no está acá, fallback a CreditCard.
const methodIcons = {
  'Lemon Squeezy': CreditCard,
  'Visa': CreditCard,
  'Mastercard': CreditCard,
  'American Express': CreditCard,
  'PayPal': Wallet,
};

export const TrustSection = () => {
  const { t } = useLanguage();
  const trust = t('home.trust');
  const methods = trust.paymentMethods.methods;

  return (
    <section className="px-6 container mx-auto">
      <div className="bg-dark-800/50 border border-dark-700 rounded-3xl p-10 md:p-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">
            {trust.title}
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            {trust.subtitle}
          </p>
        </div>

        {/* SSL Badge centrado */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-accent-primary/10 border border-accent-primary/30">
            <Lock size={20} className="text-accent-primary" />
            <span className="font-semibold text-text-main">{trust.sslBadge}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="text-center">
          <h3 className="text-sm uppercase tracking-wider text-text-muted font-semibold mb-5">
            {trust.paymentMethods.title}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {methods.map((method) => {
              const Icon = methodIcons[method] || CreditCard;
              return (
                <div
                  key={method}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-900 border border-dark-700"
                >
                  <Icon size={16} className="text-text-muted" />
                  <span className="text-sm font-medium text-text-main">{method}</span>
                </div>
              );
            })}
          </div>

          {/* Trust reinforcement (visual cue) */}
          <div className="mt-8 inline-flex items-center gap-2 text-text-muted text-sm">
            <ShieldCheck size={16} className="text-accent-primary" />
            <span>{trust.sslBadge2}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
