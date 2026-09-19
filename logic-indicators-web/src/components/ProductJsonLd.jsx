// src/components/ProductJsonLd.jsx
// =============================================================================
// JSON-LD: Product & SoftwareApplication
// =============================================================================
// Datos estructurados Schema.org para cada indicador individual (/indicators/:slug).
// Ayuda a Google a entender que la página ofrece un software profesional para
// NinjaTrader 8 con precio, moneda, disponibilidad y fabricante, habilitando
// resultados enriquecidos (Rich Snippets) en las búsquedas.
// =============================================================================

import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://logicindicators.com';

export const ProductJsonLd = ({
  name,
  description,
  image,
  url,
  price = '197.00',
  currency = 'USD',
}) => {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: name,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Windows, NinjaTrader 8',
    description: description,
    image: image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : `${SITE_URL}/og-image.jpg`,
    url: url || SITE_URL,
    brand: {
      '@type': 'Brand',
      name: 'Logic Indicators',
    },
    offers: {
      '@type': 'Offer',
      price: String(price),
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      url: url || `${SITE_URL}/pricing`,
      seller: {
        '@type': 'Organization',
        name: 'Logic Indicators',
      },
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </Helmet>
  );
};
