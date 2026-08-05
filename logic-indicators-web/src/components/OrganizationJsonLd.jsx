// src/components/OrganizationJsonLd.jsx
// =============================================================================
// JSON-LD: Organization
// =============================================================================
// Datos estructurados para que Google (y otros buscadores) entiendan que
// Logic Indicators es una Organization. Esto habilita el "knowledge panel" en
// las busquedas de marca y mejora la presentacion en los resultados.
//
// Solo se usa en la home. Otras paginas no necesitan Organization.
//
// Formato: schema.org/Organization
// https://schema.org/Organization
//
// Helmet lo inyecta en el <head> via <script type="application/ld+json">.
// =============================================================================

import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://logicindicators.com';

// URLs de redes sociales para `sameAs`. Mismas URLs que el Footer.
// Mantener sincronizado con src/components/Footer.jsx.
const SOCIAL_URLS = [
  'https://discord.gg/EWFehJ9dFu',
  'mailto:info@logicindicators.com',
];

export const OrganizationJsonLd = () => {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Logic Indicators',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description:
      'Professional order flow, footprint, volume profile, and big trades indicators for NinjaTrader 8.',
    sameAs: SOCIAL_URLS,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </Helmet>
  );
};
