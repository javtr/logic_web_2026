// src/components/SEO.jsx
// =============================================================================
// COMPONENTE SEO REUTILIZABLE
// =============================================================================
// Renderiza <title>, <meta>, <link> en el <head> de la página usando
// react-helmet-async. Cada página pública lo llama con su título y
// descripción específicos; este componente se encarga de:
//
//   - Inyectar <title>, <meta description>, <meta robots>
//   - <link rel="canonical"> apuntando a la URL actual
//   - <link rel="alternate" hreflang> para los dos idiomas soportados
//     (mismo path en ambos idiomas, el usuario cambia el idioma por UI)
//   - Open Graph (og:*) para preview en Facebook, LinkedIn, Slack, WhatsApp
//   - Twitter Card (twitter:*) para preview en X
//
// El JSON-LD Organization NO esta aca — vive en
// src/components/OrganizationJsonLd.jsx y se usa solo en la home.
//
// El componente lee el idioma actual del LanguageContext y actualiza
// <html lang="..."> automáticamente (Helmet puede mutar atributos del <html>).
//
// El `path` se obtiene automáticamente desde useLocation (react-router-dom),
// por lo que la página que usa este componente no tiene que pasarlo.
//
// Uso típico:
//   <SEO
//     title={t('seo.home.title')}
//     description={t('seo.home.description')}
//     type="website"
//   />
//
// Si `noindex` es true, se añade <meta name="robots" content="noindex, nofollow">.
// Útil para páginas internas como /login, /dashboard, o el 404.
// =============================================================================

import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/languageContext';
import { resolveImage } from '../data/imageResolver';
import { SUPPORTED_LANGUAGES } from '../data';

// Dominio de producción. Mantener sincronizado con public/_redirects y
// public/sitemap.xml. Cambiar acá si el dominio cambia.
const SITE_URL = 'https://logicindicators.com';

// Mapeo idioma -> locale Open Graph. OG usa estos códigos específicos
// (no solo el código de idioma, sino también la región).
const OG_LOCALES = {
  en: 'en_US',
  es: 'es_ES',
};

// imageKey default para Open Graph / Twitter Card. Usamos el banner
// de la suite como preview genérico porque muestra la marca + el
// producto en uso. Si en el futuro se crea un og-default.png dedicado,
// reemplazar acá.
const DEFAULT_OG_IMAGE_KEY = 'suite';

export const SEO = ({
  title,
  description,
  image,
  type = 'website',
  noindex = false,
}) => {
  const { language, t } = useLanguage();
  const location = useLocation();
  const path = location.pathname;

  // URL absoluta de esta página (sin query string ni hash).
  // En desarrollo también funciona porque la lógica de canonical no depende
  // del entorno: apunta al dominio de producción igualmente. Esto es
  // deseable: si alguien comparte una URL de localhost, no la queremos
  // canonicalizada a localhost.
  const url = `${SITE_URL}${path}`;

  // Título final: si ya incluye el nombre del sitio, no lo duplicamos.
  // Si no, lo agregamos con el separador " | ".
  const siteName = t('seo.siteName');
  const finalTitle = title
    ? (title.includes(siteName) ? title : `${title} | ${siteName}`)
    : t('seo.defaultTitle');

  const finalDescription = description || t('seo.defaultDescription');

  // OG image: si nos pasan un imageKey (string), lo resolvemos vía
  // imageResolver para que Vite lo hashee y optimice. Si nos pasan
  // una URL absoluta, la usamos tal cual.
  let finalImageUrl;
  if (!image) {
    finalImageUrl = `${SITE_URL}${resolveImage(DEFAULT_OG_IMAGE_KEY)}`;
  } else if (image.startsWith('http://') || image.startsWith('https://')) {
    finalImageUrl = image;
  } else {
    // Asumimos que es un imageKey del imageMap de Vite.
    finalImageUrl = `${SITE_URL}${resolveImage(image)}`;
  }

  // Hreflang: misma URL para en y es (toggle por UI). Añadimos x-default
  // apuntando a la versión en (idioma por defecto del sitio).
  const hreflangLinks = SUPPORTED_LANGUAGES.map((loc) => (
    <link key={loc} rel="alternate" hrefLang={loc} href={url} />
  ));
  hreflangLinks.push(
    <link key="x-default" rel="alternate" hrefLang="x-default" href={url} />
  );

  return (
    <Helmet>
      {/* Actualiza el atributo lang del <html>. Helmet puede mutar
          atributos del elemento raíz, no solo su contenido. */}
      <html lang={language} />

      {/* Meta básicos */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical: versión "oficial" de esta URL. Google la usa para
          consolidar señales si encuentra la misma página con otros
          parámetros. */}
      <link rel="canonical" href={url} />

      {/* Hreflang i18n (mismo path en ambos idiomas, el usuario cambia
          por UI — no por subdominio ni prefijo de URL). */}
      {hreflangLinks}

      {/* Open Graph — previews en Facebook, LinkedIn, Slack, WhatsApp, Discord, etc. */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={finalImageUrl} />
      <meta property="og:locale" content={OG_LOCALES[language] || OG_LOCALES.en} />
      {/* og:locale:alternate declara los otros locales disponibles */}
      {SUPPORTED_LANGUAGES
        .filter((loc) => loc !== language)
        .map((loc) => (
          <meta
            key={loc}
            property="og:locale:alternate"
            content={OG_LOCALES[loc] || loc}
          />
        ))}

      {/* Twitter Card — preview en X (Twitter). summary_large_image
          muestra la imagen grande arriba, ideal para hero shots. */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImageUrl} />
    </Helmet>
  );
};
