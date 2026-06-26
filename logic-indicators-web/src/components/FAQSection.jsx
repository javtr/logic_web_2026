// src/components/FAQSection.jsx
// Sección de FAQ reusable. Lee las preguntas/respuestas desde JSON vía el namespace
// pasado por prop (default: 'faq'). El título se controla con `titleKey` para que la
// página /pricing pueda usar un título distinto al de Home si quiere.
//
// Estructura JSON esperada:
//   { "q1": "...", "a1": "...", "q2": "...", "a2": "...", "q3": "...", "a3": "..." }
//
// Si en el futuro hay más preguntas, refactorizamos a un array `items` en el JSON.
import { useLanguage } from '../context/LanguageContext';
import { Accordion } from './Accordion';

export const FAQSection = ({ titleKey = 'home.faqTitle', namespace = 'faq' }) => {
  const { t } = useLanguage();

  const items = [
    { title: t(`${namespace}.q1`), content: t(`${namespace}.a1`) },
    { title: t(`${namespace}.q2`), content: t(`${namespace}.a2`) },
    { title: t(`${namespace}.q3`), content: t(`${namespace}.a3`) },
  ];

  return (
    <section className="px-6 container mx-auto">
      <h2 className="text-3xl font-bold text-center text-text-main mb-12">{t(titleKey)}</h2>
      <Accordion items={items} />
    </section>
  );
};
