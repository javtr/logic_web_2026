// src/components/dashboard/StepCard.jsx
// =============================================================================
// Contenido de un paso individual del wizard.
//
// En el modelo simplificado de distribución (1 pack por usuario), hay solo
// 3 tipos de paso:
//   - 'tutorial' → bloque con sub-pasos (imágenes opcionales, badge
//                  "Importante" opcional). Sin descarga. Next libre.
//   - 'products' → UN solo archivo (el pack asignado). Una card con
//                  el nombre del pack y el botón de descarga. Sin warning
//                  (los packs son autosuficientes).
//   - 'success'  → paso de cierre con recordatorio de reiniciar NT8.
//
// La confirmación ("ya lo instalé") vive en el footer del wizard
// (WizardControls) para que SIEMPRE esté visible. Antes quedaba oculta
// al fondo del scroll y los usuarios no entendían por qué Next estaba
// disabled.
//
// Optimizaciones de espacio vertical:
//   - gap-3.5 en vez de gap-5 (entre bloques del step)
//   - imágenes del tutorial: max-h-[300px], sm:max-w-[480px] (tienen
//     espacio de sobra porque el primer paso no scrollea tanto)
//   - padding p-3.5 en FileCard
//   - success py-3 (antes py-6)
// =============================================================================

import { Download, Power, AlertCircle, Check } from 'lucide-react';
import { Button } from '../Button';
import { ZoomableImage } from '../ImageLightbox';
import { resolveImage } from '../../data/imageResolver';

// Sub-componente FileCard: una card con el nombre del archivo como título
// y el botón de descarga centrado abajo. En el modelo actual, el paso
// de products siempre tiene 1 sola card (el pack asignado).
const FileCard = ({ name, url, downloadLabel }) => (
  <div className="flex flex-col items-center gap-2.5 p-3.5 bg-dark-900 border border-dark-700 rounded-xl">
    <h4 className="text-base font-bold text-text-main text-center">
      {name}
    </h4>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <Button variant="primary" className="w-fit min-w-[220px]">
        <Download size={18} />
        <span>{downloadLabel}</span>
      </Button>
    </a>
  </div>
);

// Sub-componente: un sub-paso del tutorial. Número a la izquierda, contenido
// (título + descripción + imágenes + badge "Importante") a la derecha.
const TutorialSubStep = ({ number, substep, importantLabel }) => {
  const hasImages = Array.isArray(substep.images) && substep.images.length > 0;
  const isImportant = substep.important === true;
  const hasImageLabels = Array.isArray(substep.imageLabels) && substep.imageLabels.length > 0;

  return (
    <div className="flex gap-3 md:gap-4 p-3 bg-dark-900 border border-dark-700 rounded-xl">
      <div className="shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full bg-accent-secondary/15 text-accent-secondary flex items-center justify-center font-bold text-xs md:text-sm">
        {number}
      </div>

      <div className="flex-1 min-w-0 space-y-1.5">
        <h4 className="text-sm md:text-base font-bold text-text-main leading-tight">
          {substep.title}
        </h4>
        <p className="text-xs md:text-sm text-text-muted leading-relaxed">
          {substep.description}
        </p>

        {/* Imágenes: el tutorial es el primer paso y tiene espacio
            vertical de sobra, así que las imágenes se renderizan más
            grandes. En el resto de pasos no hay imágenes. */}
        {hasImages && (
          <div className="flex flex-col sm:flex-row gap-3 pt-2 items-center justify-center">
            {substep.images.map((imgKey, i) => (
              <div
                key={imgKey}
                className="relative w-full sm:w-auto sm:max-w-[480px] bg-dark-800 border border-dark-700 rounded-lg overflow-hidden"
              >
                {hasImageLabels && substep.imageLabels[i] && (
                  <span className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 bg-dark-900/85 backdrop-blur-sm text-[10px] font-bold text-text-main rounded border border-dark-700">
                    {substep.imageLabels[i]}
                  </span>
                )}
                <ZoomableImage
                  src={resolveImage(imgKey)}
                  alt={hasImageLabels && substep.imageLabels[i] ? substep.imageLabels[i] : substep.title}
                  loading="lazy"
                  className="w-full h-auto max-h-[300px] object-contain"
                />
              </div>
            ))}
          </div>
        )}

        {isImportant && (
          <div className="flex items-center gap-1.5 pt-0.5 text-red-400">
            <AlertCircle size={14} />
            <span className="text-[11px] font-bold uppercase tracking-wider">
              {importantLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export const StepCard = ({ step, t, isCompleted = false, onComplete }) => {
  const downloadLabel = t('dashboard.installation.wizard.downloadButton') || 'Download';

  // ============================================================
  // TUTORIAL: primer paso, siempre. Lista de sub-pasos. Sin
  // confirmación obligatoria.
  // ============================================================
  if (step.type === 'tutorial') {
    const substeps = t(step.substepsKey) || [];
    const importantLabel = t(step.importantLabelKey);
    const closingNote = t(step.closingNoteKey);

    return (
      <div className="flex flex-col gap-3.5">
        <div className="space-y-1.5">
          <h3 className="text-lg md:text-xl font-bold text-text-main leading-tight">
            {t(step.titleKey)}
          </h3>
          <p className="text-sm text-text-muted leading-relaxed">
            {t(step.descriptionKey)}
          </p>
        </div>

        {Array.isArray(substeps) && substeps.length > 0 && (
          <div className="flex flex-col gap-2.5">
            {substeps.map((sub, i) => (
              <TutorialSubStep
                key={i}
                number={i + 1}
                substep={sub}
                importantLabel={importantLabel}
              />
            ))}
          </div>
        )}

        {closingNote && (
          <p className="text-xs md:text-sm text-text-muted italic border-t border-dark-700 pt-3 leading-relaxed whitespace-pre-line">
            {closingNote}
          </p>
        )}
      </div>
    );
  }

  // ============================================================
  // SUCCESS: paso de cierre. Recordatorio de reiniciar NT8.
  // ============================================================
  if (step.type === 'success') {
    return (
      <div className="flex flex-col items-center text-center gap-3 py-3">
        <div className="w-14 h-14 rounded-full bg-accent-secondary/15 text-accent-secondary flex items-center justify-center">
          <Power size={28} strokeWidth={2} />
        </div>
        <h3 className="text-lg md:text-xl font-bold text-text-main">
          {t(step.titleKey)}
        </h3>
        <p className="text-sm text-text-muted max-w-md leading-relaxed">
          {t(step.descriptionKey)}
        </p>
        {t('dashboard.installation.steps.success.actionNote') && (
          <p className="text-xs text-text-muted/80 italic">
            {t('dashboard.installation.steps.success.actionNote')}
          </p>
        )}
      </div>
    );
  }

  // ============================================================
  // PRODUCTS: UN solo archivo (el pack asignado). Una FileCard.
  // La confirmación vive en el footer del wizard.
  // ============================================================
  if (step.type === 'products') {
    return (
      <div className="flex flex-col gap-3.5">
        {step.imageKey && (
          <div className="aspect-[16/9] w-full bg-dark-900 border border-dark-700 rounded-xl overflow-hidden">
            <ZoomableImage
              src={resolveImage(step.imageKey)}
              alt={t(step.titleKey)}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="space-y-1.5">
          <h3 className="text-lg md:text-xl font-bold text-text-main leading-tight">
            {t(step.titleKey)}
          </h3>
          <p className="text-sm text-text-muted leading-relaxed">
            {t(step.descriptionKey)}
          </p>
        </div>

        <div className="flex flex-col items-stretch gap-2.5">
          {step.files.map((file) => (
            <FileCard
              key={file.key}
              name={file.name}
              url={file.url}
              downloadLabel={downloadLabel}
            />
          ))}
        </div>
      </div>
    );
  }

  // Tipo desconocido: fallback vacío (no debería ocurrir con el modelo
  // actual, pero evitamos un crash silencioso si se agrega un tipo nuevo
  // sin actualizar este switch).
  return null;
};
