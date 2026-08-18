// src/components/dashboard/StepCard.jsx
// =============================================================================
// Contenido de un paso individual del wizard.
// Variantes según step.type:
//   - 'tutorial'     → bloque con sub-pasos (imagenes opcionales, badge
//                     "Importante" opcional). Sin descarga. Next libre.
//   - 'prerequisite' → un solo archivo (Core / Engine), una card con el
//                     nombre del archivo y el boton de descarga. Warning
//                     amber (acompana, NO bloquea — el bloqueo esta en
//                     el footer via InstallConfirmation).
//   - 'products'    → N archivos consolidados, una card por producto.
//                     Warning amber.
//   - 'success'     → paso de cierre con recordatorio de reiniciar NT8.
//
// La confirmacion (checkbox "ya lo instale") se movio al footer del wizard
// (WizardControls) para que SIEMPRE este visible — antes quedaba oculta
// al fondo del scroll y los usuarios no entendian por que Next estaba
// disabled.
//
// Optimizaciones de espacio vertical:
//   - gap-3.5 en vez de gap-5 (entre bloques del step)
//   - image max-h-[200px] (antes 260px) en el tutorial
//   - padding p-3.5 en FileCard (antes p-4)
//   - success py-3 (antes py-6)
// =============================================================================

import { Download, Power, AlertCircle, AlertTriangle, Check } from 'lucide-react';
import { Button } from '../Button';
import { ZoomableImage } from '../ImageLightbox';
import { resolveImage } from '../../data/imageResolver';

// Sub-componente FileCard: una card con el nombre del archivo como titulo
// y el boton de descarga centrado abajo. Usado por 'prerequisite' (1 card)
// y 'products' (N cards en lista).
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

// Sub-componente WarningBox: solo el warning amber (sin el checkbox de
// confirmacion — eso vive ahora en el footer). Se muestra solo si el step
// todavia NO esta completado (una vez confirmado, el warning se reemplaza
// visualmente por el badge "Instalado" del footer).
const WarningBox = ({ messages }) => {
  if (!messages || !messages.warning) return null;
  return (
    <div className="flex gap-3 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl">
      <AlertTriangle
        className="text-amber-400 shrink-0 mt-0.5"
        size={20}
      />
      <div className="text-sm leading-relaxed">
        <p className="font-bold text-amber-200">
          {messages.warningTitle}
        </p>
        <p className="mt-1 text-amber-200/85">
          {messages.warning}
        </p>
      </div>
    </div>
  );
};

// Sub-componente: un sub-paso del tutorial. Numero a la izquierda, contenido
// (titulo + descripcion + imagenes + badge "Importante") a la derecha.
const TutorialSubStep = ({ number, substep, importantLabel, t }) => {
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

        {/* Imagenes: el tutorial es el primer paso y tiene espacio
            vertical de sobra, asi que las imagenes se renderizan mas
            grandes (max-h-[300px], max-w-[480px] en sm+). En el resto
            de pasos el espacio es escaso, por eso aca son grandes. */}
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

export const StepCard = ({ step, t, isCompleted = false, onComplete, prereqSummary = 'core+engine' }) => {
  const downloadLabel = t('dashboard.installation.wizard.downloadButton') || 'Download';
  // Mensajes compartidos por step type (warning + confirmacion labels).
  //
  // Para el paso de productos, los mensajes dependen de QUE
  // prerrequisitos necesita el usuario: si tiene pack completo
  // (prereqSummary = 'none') el warning sobre Core/Engine no aplica
  // y se muestra una verificacion generica. Si solo tiene DepthPack
  // (prereqSummary = 'core') el warning menciona solo Core. Para
  // individuales (prereqSummary = 'core+engine') el warning menciona
  // ambos. Esto evita que un usuario con FullPack vea avisos de
  // Core/Engine que no le aplican.
  const messages =
    step.type === 'products'
      ? t(`dashboard.installation.stepMessages.products.warningByPrereq.${prereqSummary}`) || {}
      : t(`dashboard.installation.stepMessages.${step.type}`) || {};

  // ============================================================
  // TUTORIAL: primer paso, siempre. Lista de sub-pasos. Sin
  // confirmacion obligatoria.
  // ============================================================
  if (step.type === 'tutorial') {
    const substeps = t(step.substepsKey) || [];
    const importantLabel = t(step.importantLabelKey);
    // El closing note tambien depende de prereqSummary: si el
    // usuario no necesita Core/Engine, la nota final NO los
    // menciona. La key en i18n es
    // `steps.tutorial.closingNote.<prereqSummary>`.
    const closingNote = t(`dashboard.installation.steps.tutorial.closingNote.${prereqSummary}`);

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
                t={t}
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
  // PRODUCTOS: N archivos, una card por archivo. Warning amber.
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

        {/* Solo el warning. La confirmacion vive en el footer. */}
        <WarningBox messages={messages} />
      </div>
    );
  }

  // ============================================================
  // PREREQUISITE: un solo archivo. Warning amber.
  // ============================================================
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

      {step.file && (
        <div className="flex flex-col items-stretch gap-2.5">
          <FileCard
            name={t(step.nameKey)}
            url={step.file.url}
            downloadLabel={downloadLabel}
          />
        </div>
      )}

      <WarningBox messages={messages} />
    </div>
  );
};
