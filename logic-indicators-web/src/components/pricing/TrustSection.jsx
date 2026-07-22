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
//
// Mobile-first (commit actual):
//   - Padding de la tarjeta: p-6 mobile (24px) / p-12 desktop (48px).
//   - Título: 24px mobile / 36px desktop. Subtítulo: 16px mobile / 18px desktop
//     (el subtítulo es largo, se lee mejor a 16px en pantallas chicas).
//   - Señales de seguridad AGRUPADAS arriba (Lock + ShieldCheck) para que
//     el "qué tan seguro es" sea el mensaje principal, y los métodos de
//     pago queden como detalle práctico abajo. Antes el ShieldCheck estaba
//     huérfano al final, después de los métodos de pago.
//   - Separador sutil (h-px) entre los dos bloques lógicos (seguridad / pagos).
//   - Chips de métodos de pago: padding/icono/texto más chicos en mobile
//     (px-3 py-1.5 / size-14 / text-xs vs px-4 py-2 / size-16 / text-sm).
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
      <div className="bg-dark-800/50 border border-dark-700 rounded-3xl p-6 md:p-12">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-text-main mb-3 md:mb-4">
            {trust.title}
          </h2>
          <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            {trust.subtitle}
          </p>
        </div>

        {/* Bloque de seguridad: SSL badge + refuerzo ShieldCheck AGRUPADOS arriba.
            Antes el ShieldCheck estaba al final, después de los métodos de pago,
            lo que lo hacía sentir huérfano. Ahora ambos mensajes de seguridad
            quedan juntos como el "headline" de la sección. */}
        <div className="flex flex-col items-center gap-3 md:gap-4 mb-6 md:mb-10">
          <div className="inline-flex items-center gap-2 md:gap-3 px-4 py-2.5 md:px-5 md:py-3 rounded-full bg-accent-primary/10 border border-accent-primary/30">
            <Lock size={18} className="text-accent-primary md:w-5 md:h-5" />
            <span className="text-sm md:text-base font-semibold text-text-main">{trust.sslBadge}</span>
          </div>
          <div className="inline-flex items-center gap-2 text-text-muted text-xs md:text-sm">
            <ShieldCheck size={14} className="text-accent-primary md:w-4 md:h-4" />
            <span>{trust.sslBadge2}</span>
          </div>
        </div>

        {/* Separador sutil entre los dos bloques lógicos (seguridad / pagos).
            GPU-cheap, sin impacto en layout. */}
        <div className="w-12 md:w-16 h-px bg-dark-700 mx-auto mb-6 md:mb-10" aria-hidden="true" />

        {/* Payment Methods — el detalle práctico de "cómo podés pagar" */}
        <div className="text-center">
          <h3 className="text-xs md:text-sm uppercase tracking-wider text-text-muted font-semibold mb-4 md:mb-5">
            {trust.paymentMethods.title}
          </h3>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {methods.map((method) => {
              const Icon = methodIcons[method] || CreditCard;
              return (
                <div
                  key={method}
                  className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-dark-900 border border-dark-700"
                >
                  <Icon size={14} className="text-text-muted md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm font-medium text-text-main">{method}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
