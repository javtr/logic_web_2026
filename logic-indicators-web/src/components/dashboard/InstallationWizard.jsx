// src/components/dashboard/InstallationWizard.jsx
// =============================================================================
// Wizard de instalación: modal fullscreen con flujo de pasos Prev/Next.
// Renderiza via createPortal en document.body para escapar del stacking
// context del dashboard.
//
// COMPORTAMIENTO:
//   - Al abrirse: siempre empieza en el paso 0 (no persiste progreso).
//   - Al cerrarse: vuelve al dashboard. El progreso se pierde.
//     (Decisión de diseño: sesiones puntuales, sin estado persistente.)
//   - ESC cierra el wizard.
//   - Click en backdrop NO cierra — fuerza el uso del botón Close/X para
//     evitar perdidas accidentales.
//   - Bloquea el scroll del body mientras está abierto.
//   - Renderiza ARIA role="dialog" + aria-modal para accesibilidad.
// =============================================================================

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { StepIndicator } from './StepIndicator';
import { StepCard } from './StepCard';
import { WizardControls } from './WizardControls';

export const InstallationWizard = ({ isOpen, onClose, steps, t }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  // Set de step IDs que el usuario marco como completados. Set de IDs (no
  // boolean) para que las lookups sean O(1). Se resetea cada vez que
  // se abre el wizard (sin estado persistente entre sesiones, igual
  // que currentStepIndex).
  const [completedSteps, setCompletedSteps] = useState(() => new Set());

  // Reset al paso 0 + limpiar completados cada vez que se abre.
  useEffect(() => {
    if (isOpen) {
      setCurrentStepIndex(0);
      setCompletedSteps(new Set());
    }
  }, [isOpen]);

  // Bloquear scroll del body mientras el modal está abierto.
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  // ESC para cerrar.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Marca un step como completado. Usado por el checkbox/button de
  // confirmacion dentro del StepCard (solo en prereq y products).
  const markStepComplete = useCallback((stepId) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      next.add(stepId);
      return next;
    });
  }, []);

  if (!isOpen) return null;
  if (!steps || steps.length === 0) return null;

  const currentStep = steps[currentStepIndex];
  const isFirst = currentStepIndex === 0;
  const isSuccess = currentStep.type === 'success';
  // Solo los pasos de instalacion (prereq / products) requieren
  // confirmacion obligatoria antes de avanzar. El tutorial no
  // (solo lectura) y el success no tiene Next.
  const requiresCompletion =
    currentStep.type === 'prerequisite' || currentStep.type === 'products';
  const isStepCompleted = completedSteps.has(currentStep.id);
  const canAdvance = !requiresCompletion || isStepCompleted;
  // Mensajes compartidos por step type (warning + confirmacion labels).
  // Misma fuente que StepCard para que la confirmacion del footer
  // y el warning del body se mantengan consistent.
  //
  // Para los prerrequisitos (Core / Engine) los labels de la
  // confirmacion son ESPECIFICOS al archivo que se esta instalando
  // (ej. "Ya instale el Core" vs "Ya instale el Engine"), porque el
  // usuario tiene que saber QUE acaba de confirmar. Los overrides
  // viven en `stepMessages.prerequisite.byKey.<file.key>` y se
  // mezclan sobre los labels genericos de `stepMessages.prerequisite`.
  let messages = t(`dashboard.installation.stepMessages.${currentStep.type}`) || {};
  if (currentStep.type === 'prerequisite' && currentStep.file?.key) {
    const byKey = messages.byKey?.[currentStep.file.key];
    if (byKey) {
      messages = { ...messages, ...byKey };
    }
  }

  // Resumen de prerrequisitos para que el copy del wizard (closing
  // note del tutorial, warning del paso de productos) se adapte al
  // caso real del usuario. Antes el copy era estatico y siempre
  // mencionaba Core/Engine, lo que desinformaba a usuarios con
  // pack completo (que no necesitan nada) y a usuarios con solo
  // DepthPack (que solo necesitan Core, no Engine).
  //
  // Valores posibles: 'none' (BasicPack/FullPack/vacio), 'core'
  // (solo DepthPack), 'core+engine' (individuales, con o sin
  // DepthPack). Se calcula UNA vez por render y se pasa al StepCard
  // para que elija el texto correcto.
  const prereqSummary = (() => {
    const keys = new Set(
      steps
        .filter((s) => s.type === 'prerequisite')
        .map((s) => s.file?.key)
        .filter(Boolean),
    );
    if (keys.has('core') && keys.has('engine')) return 'core+engine';
    if (keys.has('core')) return 'core';
    return 'none';
  })();

  const handlePrev = () => {
    if (!isFirst) setCurrentStepIndex((i) => i - 1);
  };
  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((i) => i + 1);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-4 bg-dark-900/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wizard-title"
    >
      <div className="w-[95vw] h-[90vh] max-w-[1600px] flex flex-col bg-dark-800 border border-dark-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header unificado: titulo + subtitulo a la izquierda,
            contador + indicador de pasos + close X a la derecha.
            Todo en una sola fila (con wrap en mobile si hace falta)
            para no consumir vertical — antes el contador y el
            indicador vivian en su propia fila separada, sumando
            ~40px de padding/border que eran innecesarios. */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 md:p-5 border-b border-dark-700 shrink-0">
          {/* Left: title + subtitle */}
          <div className="flex-1 min-w-0">
            <h2
              id="wizard-title"
              className="text-lg md:text-xl font-bold text-text-main leading-tight"
            >
              {t('dashboard.installation.wizard.title')}
            </h2>
            {t('dashboard.installation.wizard.subtitle') && (
              <p className="text-xs md:text-sm text-text-muted mt-0.5 leading-relaxed">
                {t('dashboard.installation.wizard.subtitle')}
              </p>
            )}
          </div>

          {/* Right: step counter + indicator + close X. Todos en una
              misma fila horizontal — el espacio horizontal sobra y
              vertical escasea, asi que esta es la disposicion optima.
              flex-wrap protege pantallas angostas. */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap shrink-0">
            <p className="text-[11px] text-text-muted font-medium uppercase tracking-wider whitespace-nowrap">
              {t('dashboard.installation.wizard.stepIndicator')
                .replace('{current}', currentStepIndex + 1)
                .replace('{total}', steps.length)}
            </p>
            <StepIndicator
              steps={steps}
              currentStepIndex={currentStepIndex}
            />
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 p-1.5 text-text-muted hover:text-text-main rounded-md hover:bg-dark-700 transition-colors"
              aria-label={t('dashboard.installation.wizard.closeAriaLabel')}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Contenido del paso (scrollable si el contenido es largo).
            Padding reducido de p-5/6 a p-4/5. */}
        <div className="flex-1 p-4 md:p-5 overflow-y-auto">
          <StepCard
            step={currentStep}
            t={t}
            isCompleted={isStepCompleted}
            onComplete={() => markStepComplete(currentStep.id)}
            prereqSummary={prereqSummary}
          />
        </div>

        {/* Controles Prev / [Confirmacion?] / Next / Close.
            Confirmacion vive ACA (entre Prev y Next) para que SIEMPRE
            este visible — antes quedaba al fondo del scroll del step. */}
        <div className="border-t border-dark-700 p-4 md:p-5 shrink-0">
          <WizardControls
            onPrev={handlePrev}
            onNext={handleNext}
            onClose={onClose}
            isFirst={isFirst}
            isSuccess={isSuccess}
            canAdvance={canAdvance}
            requiresConfirmation={requiresCompletion}
            isCompleted={isStepCompleted}
            onComplete={() => markStepComplete(currentStep.id)}
            messages={messages}
            t={t}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};
