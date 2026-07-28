// src/data/index.js
// Loader i18n-aware. Une los JSON por idioma en un único diccionario
// con la misma forma que tenía el antiguo translations.js, para que
// los componentes que usan t('nav.foo.bar') sigan funcionando.
//
// Para agregar un tercer idioma (ej: francés):
//   1. Crear carpeta src/data/fr/ copiando la estructura de src/data/en/
//   2. Traducir los valores
//   3. Importar abajo y agregar a dictionaries y SUPPORTED_LANGUAGES
//   4. Agregar 'fr' a la constante de idiomas en LanguageContext
// Cero cambios en componentes.

import enNav from './en/nav.json';
import enHero from './en/hero.json';
import enHome from './en/home.json';
import enIndicators from './en/indicators.json';
import enIndicatorsPage from './en/indicatorsPage.json';
import enIndicatorPage from './en/indicatorPage.json';
import enPricing from './en/pricing.json';
import enDocs from './en/docs.json';
import enFreeIndicators from './en/freeIndicators.json';
import enContact from './en/contact.json';
import enHomeFaq from './en/homeFaq.json';
import enPricingFaq from './en/pricingFaq.json';
import enFaqPage from './en/faqPage.json';
import enPrivacy from './en/privacy.json';
import enTerms from './en/terms.json';
import enHelp from './en/help.json';
import enFooter from './en/footer.json';
import enDashboard from './en/dashboard.json';
import enNotFound from './en/notFound.json';
import enLogin from './en/login.json';
import enSeo from './en/seo.json';

import esNav from './es/nav.json';
import esHero from './es/hero.json';
import esHome from './es/home.json';
import esIndicators from './es/indicators.json';
import esIndicatorsPage from './es/indicatorsPage.json';
import esIndicatorPage from './es/indicatorPage.json';
import esPricing from './es/pricing.json';
import esDocs from './es/docs.json';
import esFreeIndicators from './es/freeIndicators.json';
import esContact from './es/contact.json';
import esHomeFaq from './es/homeFaq.json';
import esPricingFaq from './es/pricingFaq.json';
import esFaqPage from './es/faqPage.json';
import esPrivacy from './es/privacy.json';
import esTerms from './es/terms.json';
import esHelp from './es/help.json';
import esFooter from './es/footer.json';
import esDashboard from './es/dashboard.json';
import esNotFound from './es/notFound.json';
import esLogin from './es/login.json';
import esSeo from './es/seo.json';

export const SUPPORTED_LANGUAGES = ['en', 'es'];
export const DEFAULT_LANGUAGE = 'en';

// Orden de aparición PREFERIDO de los indicadores en listas (Home, /indicators, etc.).
// Para "ocultar" un indicador sin perder su posición en el orden, simplemente elimínalo
// de los JSONs de en/ y es/; getActiveIndicatorIds() lo va a filtrar automáticamente.
// Para volver a mostrarlo, agregalo de nuevo en los JSONs (con el mismo id) y aparecerá
// en esta misma posición.
// El id debe coincidir con la clave en cada indicators.json.
export const INDICATOR_ORDER = [
  'footprint',
  'footer',
  'profile',
  'composite',
  'bigtrades',
  'analytics',
  'algorithms',
  'deepchart',
  'deeplive',
];

// Single source of truth para la lista de indicadores que se renderizan.
// Devuelve SOLO los IDs de INDICATOR_ORDER que existen en el JSON del idioma actual.
// Las páginas (Home, /indicators, /indicators/:slug) iteran sobre esto en lugar de
// hacerlo sobre INDICATOR_ORDER directo, así no renderizan tarjetas rotas con
// strings tipo "indicators.deepchart.name".
export const getActiveIndicatorIds = (lang) => {
  const dict = getDictionary(lang);
  const indicators = dict?.indicators || {};
  const active = INDICATOR_ORDER.filter((id) => indicators[id] != null);

  // Aviso en consola si hay drift entre INDICATOR_ORDER y el JSON (solo dev).
  const missing = INDICATOR_ORDER.filter((id) => !(id in indicators));
  if (missing.length > 0 && import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.warn(
      `[i18n] ${missing.length} indicator(s) in INDICATOR_ORDER are missing from "${lang}/indicators.json": ${missing.join(', ')}. They will be hidden. Add them to the JSON or remove from INDICATOR_ORDER.`
    );
  }

  return active;
};

const dictionaries = {
  en: {
    nav: enNav,
    hero: enHero,
    home: enHome,
    indicators: enIndicators,
    indicatorsPage: enIndicatorsPage,
    indicatorPage: enIndicatorPage,
    pricing: enPricing,
    docs: enDocs,
    freeIndicators: enFreeIndicators,
    contact: enContact,
    homeFaq: enHomeFaq,
    pricingFaq: enPricingFaq,
    faqPage: enFaqPage,
    privacy: enPrivacy,
    terms: enTerms,
    help: enHelp,
    footer: enFooter,
    dashboard: enDashboard,
    notFound: enNotFound,
    login: enLogin,
    seo: enSeo,
  },
  es: {
    nav: esNav,
    hero: esHero,
    home: esHome,
    indicators: esIndicators,
    indicatorsPage: esIndicatorsPage,
    indicatorPage: esIndicatorPage,
    pricing: esPricing,
    docs: esDocs,
    freeIndicators: esFreeIndicators,
    contact: esContact,
    homeFaq: esHomeFaq,
    pricingFaq: esPricingFaq,
    faqPage: esFaqPage,
    privacy: esPrivacy,
    terms: esTerms,
    help: esHelp,
    footer: esFooter,
    dashboard: esDashboard,
    notFound: esNotFound,
    login: esLogin,
    seo: esSeo,
  },
};

export const getDictionary = (lang) => {
  if (!dictionaries[lang]) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(`[i18n] No dictionary for "${lang}". Falling back to "${DEFAULT_LANGUAGE}".`);
    }
    return dictionaries[DEFAULT_LANGUAGE];
  }
  return dictionaries[lang];
};

// Helper para dot-paths tipo t('home.suiteTitle')
export const resolvePath = (dictionary, path) => {
  return path.split('.').reduce(
    (obj, key) => (obj && obj[key] != null ? obj[key] : path),
    dictionary
  );
};
