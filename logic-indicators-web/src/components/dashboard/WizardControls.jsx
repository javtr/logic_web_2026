// src/components/dashboard/WizardControls.jsx
// =============================================================================
// Controles del footer del wizard: Prev | [Confirmacion?] | Next/Close.
//
// La confirmacion ("ya instale el archivo en NT8") se movio ACA desde
// el body del step. Antes quedaba al fondo del scroll, invisible en
// pantallas chicas, y los usuarios no entendian por que Next estaba
// disabled. Ahora vive entre Prev y Next, siempre visible.
//
// Comportamiento por tipo de step:
//   - tutorial (no requiere confirmacion): solo Prev + Next
//   - prereq / products (requiere confirmacion):
//       pending  → [☐ label corto] + Next (disabled)
//       complete → [✓ Instalado] + Next (enabled)
//   - success: Prev + Close (en lugar de Next)
//
// En mobile (modal angosto) el right group (confirm + Next) baja a
// una segunda linea si no entra — flex-wrap se encarga.
// =============================================================================

import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '../Button';

// Sub-componente: el boton/check de confirmacion compacto para el
// footer. Es chico y de un solo renglon — pensado para no consumir
// vertical. Cambia de estado pending a completed segun isCompleted.
const ConfirmationButton = ({ isCompleted, onComplete, label, completedLabel }) => {
  if (isCompleted) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/30 rounded-lg whitespace-nowrap">
        <div className="shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
          <Check size={12} className="text-dark-900" strokeWidth={3} />
        </div>
        <span className="text-sm font-bold text-green-300">{completedLabel}</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onComplete}
      className="flex items-center gap-2 px-3 py-2 bg-dark-900 border border-dark-700 hover:border-accent-secondary/50 rounded-lg transition-colors whitespace-nowrap group"
    >
      <div className="shrink-0 w-5 h-5 rounded border-2 border-dark-600 group-hover:border-accent-secondary transition-colors" />
      <span className="text-sm font-medium text-text-main">{label}</span>
    </button>
  );
};

export const WizardControls = ({
  onPrev,
  onNext,
  onClose,
  isFirst,
  isSuccess,
  canAdvance = true,
  requiresConfirmation = false,
  isCompleted = false,
  onComplete,
  messages,
  t,
}) => {
  // Labels de la confirmacion (cortos, pensados para el footer).
  const confirmLabel = messages?.footerLabel || 'Confirmar';
  const confirmCompletedLabel = messages?.footerCompletedLabel || 'Listo';

  return (
    // flex-wrap: en mobile el right group baja a la segunda linea
    // si no entra horizontalmente.
    <div className="flex flex-wrap items-center justify-between gap-3">
      {/* Prev: anclado a la izquierda */}
      <Button
        variant="secondary"
        onClick={onPrev}
        disabled={isFirst}
        className="shrink-0"
        aria-label={t('dashboard.installation.wizard.prev')}
      >
        <ArrowLeft size={18} />
        <span>{t('dashboard.installation.wizard.prev')}</span>
      </Button>

      {/* Right group: confirmacion (opcional) + Next/Close. Anclado
          a la derecha para que la confirmacion quede pegada al Next. */}
      <div className="flex items-center gap-3 flex-wrap">
        {requiresConfirmation && !isSuccess && (
          <ConfirmationButton
            isCompleted={isCompleted}
            onComplete={onComplete}
            label={confirmLabel}
            completedLabel={confirmCompletedLabel}
          />
        )}

        {isSuccess ? (
          <Button variant="primary" onClick={onClose} className="shrink-0">
            <Check size={18} />
            <span>{t('dashboard.installation.wizard.close')}</span>
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={onNext}
            disabled={!canAdvance}
            className="shrink-0"
            aria-label={t('dashboard.installation.wizard.next')}
          >
            <span>{t('dashboard.installation.wizard.next')}</span>
            <ArrowRight size={18} />
          </Button>
        )}
      </div>
    </div>
  );
};
