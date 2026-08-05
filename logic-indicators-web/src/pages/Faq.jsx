// src/pages/Faq.jsx
// Página /faq — renderiza el contenido de faqPage.json con un Accordion.
// Reutiliza el componente Accordion existente (mismo que usa la home).
import { useLanguage } from '../context/languageContext';
import { SEO } from '../components/SEO';
import { Accordion } from '../components/Accordion';

export const Faq = () => {
  const { t } = useLanguage();
  const data = t('faqPage');

  const items = (data.items || []).map((it) => ({
    title: it.q,
    content: it.a,
  }));

  return (
    <>
      <SEO
        title={t('seo.faq.title')}
        description={t('seo.faq.description')}
        type="website"
      />
      <article className="max-w-3xl mx-auto px-4 md:px-6 pt-32 pb-24 text-text-main">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          {data.pageTitle}
        </h1>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">
          {data.pageSubtitle}
        </p>
      </header>

      {/* Accordion */}
      <Accordion items={items} />
    </article>
    </>
  );
};
