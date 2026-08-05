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
//   - Lock badge (mensaje de seguridad principal) arriba, después del subtítulo.
//   - Métodos de pago en el medio, como detalle práctico.
//   - ShieldCheck (refuerzo "100% segura y encriptada") ABAJO, al final de la
//     tarjeta, como cierre de la sección. La idea es que funcione como
//     "sello" final que refuerza todo lo anterior.
//   - Separadores sutiles (h-px) entre los bloques lógicos.
//   - Chips de métodos de pago: padding/icono/texto más chicos en mobile
//     (px-3 py-1.5 / size-14 / text-xs vs px-4 py-2 / size-16 / text-sm).
import { useLanguage } from '../../context/languageContext';
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

        {/* SSL badge (Lock) — mensaje de seguridad principal, justo debajo
            del subtítulo para que sea lo primero que el ojo registra. */}
        <div className="flex justify-center mb-6 md:mb-10">
          <div className="inline-flex items-center gap-2 md:gap-3 px-4 py-2.5 md:px-5 md:py-3 rounded-full bg-accent-primary/10 border border-accent-primary/30">
            <Lock size={18} className="text-accent-primary md:w-5 md:h-5" />
            <span className="text-sm md:text-base font-semibold text-text-main">{trust.sslBadge}</span>
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

        {/* Refuerzo de seguridad (ShieldCheck) — al FINAL de la tarjeta,
            como "sello" que cierra la sección reforzando el mensaje principal. */}
        <div className="mt-6 md:mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 text-text-muted text-xs md:text-sm">
            <ShieldCheck size={14} className="text-accent-primary md:w-4 md:h-4" />
            <span>{trust.sslBadge2}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
