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
//       pending  → [☐ label corto] + Next (clickeable)
//                  Si el usuario hace click en Next sin marcar la
//                  casilla, la casilla se pone en rojo como senal
//                  de que ESO es lo que falta.
//       complete → [✓ Instalado] + Next (enabled, sin restriccion)
//   - success: Prev + Close (en lugar de Next)
//
// El boton Next siempre se ve activo (no usamos `disabled`). En su
// lugar, en el onClick validamos canAdvance: si esta listo avanza, si
// no, dispara el feedback rojo en la confirmacion. Esto le da al
// usuario una senal visual clara de QUE bloquea el avance, en vez
// de un boton gris que parece roto.
//
// En mobile (modal angosto) el right group (confirm + Next) baja a
// una segunda linea si no entra — flex-wrap se encarga.
// =============================================================================

import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '../Button';

// Sub-componente: el boton/check de confirmacion compacto para el
// footer. Es chico y de un solo renglon — pensado para no consumir
// vertical. Estados:
//   - completed: verde con check
//   - pending + showError: rojo (senal de que esto bloquea el Next)
//   - pending default: gris con borde sutil, hover en accent
const ConfirmationButton = ({
  isCompleted,
  onComplete,
  label,
  completedLabel,
  showError = false,
}) => {
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

  // pending: estilos condicionales segun si hay error activo o no.
  const containerClass = showError
    ? 'border-red-500 bg-red-500/10 hover:border-red-400'
    : 'border-dark-700 bg-dark-900 hover:border-accent-secondary/50';
  const circleClass = showError
    ? 'border-red-500'
    : 'border-dark-600 group-hover:border-accent-secondary';
  const textClass = showError ? 'text-red-300' : 'text-text-main';

  return (
    <button
      type="button"
      onClick={onComplete}
      className={`flex items-center gap-2 px-3 py-2 border rounded-lg transition-colors whitespace-nowrap group ${containerClass}`}
    >
      <div className={`shrink-0 w-5 h-5 rounded border-2 transition-colors ${circleClass}`} />
      <span className={`text-sm font-medium ${textClass}`}>{label}</span>
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

  // Estado local: cuando el usuario intenta avanzar sin haber marcado
  // la confirmacion, marcamos esto en true para que la ConfirmationButton
  // se ponga en rojo. Se resetea solo:
  //   - cuando el usuario marca la casilla (isCompleted pasa a true)
  //   - cuando cambia el step (isCompleted cambia, porque el id del
  //     step nuevo no esta en completedSteps)
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    setShowError(false);
  }, [isCompleted]);

  // Handler del boton Next. Siempre se puede hacer click; lo que
  // cambia es la accion: si esta listo avanza, si no, dispara el
  // feedback rojo. Asi el usuario ve claramente QUE es lo que falta.
  const handleNextClick = () => {
    if (canAdvance) {
      onNext();
    } else {
      setShowError(true);
    }
  };

  // Al marcar la casilla, limpiamos el error inmediatamente para
  // que la transicion rojo -> verde se vea natural.
  const handleComplete = () => {
    setShowError(false);
    onComplete();
  };

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
            onComplete={handleComplete}
            label={confirmLabel}
            completedLabel={confirmCompletedLabel}
            showError={showError}
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
            onClick={handleNextClick}
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
