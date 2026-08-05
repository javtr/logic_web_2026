// src/components/FAQSection.jsx
// Sección de FAQ reusable. Lee las preguntas/respuestas desde el JSON del namespace
// pasado por prop (default: 'homeFaq'). El título se controla con `titleKey`.
//
// Estructura JSON esperada (en src/data/{en,es}/<namespace>.json):
//   {
//     "items": [
//       { "q": "Pregunta 1", "a": "Respuesta 1" },
//       { "q": "Pregunta 2", "a": "Respuesta 2" },
//       ...
//     ]
//   }
//
// Ejemplo de uso:
//   <FAQSection />                                       ← Home: namespace 'homeFaq', título 'home.faqTitle'
//   <FAQSection namespace="pricingFaq" titleKey="pricing.faqTitle" />
import { useLanguage } from '../context/languageContext';
import { Accordion } from './Accordion';

export const FAQSection = ({ titleKey = 'home.faqTitle', namespace = 'homeFaq' }) => {
  const { t } = useLanguage();

  // t(namespace) devuelve el objeto completo del namespace actual (resuelto por idioma).
  // De ahí tomamos el array `items` y lo mapeamos al shape que espera <Accordion />.
  const data = t(namespace);
  const items = (Array.isArray(data?.items) ? data.items : []).map((it) => ({
    title: it.q,
    content: it.a,
  }));

  return (
    <section className="px-6 container mx-auto">
      <h2 className="text-3xl font-bold text-center text-text-main mb-12">{t(titleKey)}</h2>
      <Accordion items={items} />
    </section>
  );
};
