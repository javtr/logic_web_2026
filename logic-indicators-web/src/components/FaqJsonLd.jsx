// src/components/FaqJsonLd.jsx
// =============================================================================
// JSON-LD: FAQPage
// =============================================================================
// Datos estructurados Schema.org para páginas y secciones de Preguntas Frecuentes.
// Permite que Google muestre las preguntas y respuestas directamente como
// acordeones desplegables en los resultados de búsqueda (Rich Snippets), aumentando
// el CTR significativamente.
// =============================================================================

import { Helmet } from 'react-helmet-async';

export const FaqJsonLd = ({ items = [] }) => {
  if (!Array.isArray(items) || items.length === 0) return null;

  const validItems = items.filter((item) => item && (item.q || item.question) && (item.a || item.answer));
  if (validItems.length === 0) return null;

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: validItems.map((item) => ({
      '@type': 'Question',
      name: item.q || item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof (item.a || item.answer) === 'string'
          ? (item.a || item.answer).replace(/<[^>]*>?/gm, '').trim()
          : String(item.a || item.answer),
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </Helmet>
  );
};
