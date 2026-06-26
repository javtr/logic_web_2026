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
import enFaq from './en/faq.json';
import enFooter from './en/footer.json';

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
import esFaq from './es/faq.json';
import esFooter from './es/footer.json';

export const SUPPORTED_LANGUAGES = ['en', 'es'];
export const DEFAULT_LANGUAGE = 'en';

// Orden de aparición de los indicadores en listas (Home, /indicators, etc.).
// Para agregar un indicador nuevo: agregarlo aquí Y en cada indicators.json bajo en/ y es/.
// El id debe coincidir con la clave en indicators.json.
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
    faq: enFaq,
    footer: enFooter,
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
    faq: esFaq,
    footer: esFooter,
  },
};

export const getDictionary = (lang) => {
  if (!dictionaries[lang]) {
    // eslint-disable-next-line no-console
    console.warn(`[i18n] No dictionary for "${lang}". Falling back to "${DEFAULT_LANGUAGE}".`);
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
