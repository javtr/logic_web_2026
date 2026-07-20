// src/components/legal/LegalPage.jsx
// Componente reusable para páginas legales (Privacy, Terms, etc).
// Lee título, subtítulo, "lastUpdated" y secciones desde el JSON que recibe
// por prop. Mantiene la estructura JSON-driven para que editar el contenido
// no requiera tocar código.
//
// Uso:
//   <LegalPage data={t('privacy')} />
//   <LegalPage data={t('terms')} />
//
// El JSON esperado es:
//   {
//     pageTitle: string,
//     pageSubtitle?: string,
//     lastUpdated: string,
//     intro: string,
//     sections: [{ title: string, content: string }, ...]
//   }
export const LegalPage = ({ data }) => {
  return (
    <article className="max-w-3xl mx-auto px-4 md:px-6 pt-32 pb-24 text-text-main">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          {data.pageTitle}
        </h1>
        {data.pageSubtitle && (
          <p className="text-text-muted text-lg">{data.pageSubtitle}</p>
        )}
        <p className="text-text-muted text-sm mt-4 uppercase tracking-wider font-semibold">
          {data.lastUpdated}
        </p>
      </header>

      {/* Intro */}
      {data.intro && (
        <p className="text-text-muted leading-relaxed text-lg mb-12">
          {data.intro}
        </p>
      )}

      {/* Sections */}
      <div className="space-y-10">
        {data.sections.map((section, i) => (
          <section key={i}>
            <h2 className="text-2xl font-bold text-text-main mb-3">
              {section.title}
            </h2>
            <p className="text-text-muted leading-relaxed text-base">
              {section.content}
            </p>
          </section>
        ))}
      </div>
    </article>
  );
};
