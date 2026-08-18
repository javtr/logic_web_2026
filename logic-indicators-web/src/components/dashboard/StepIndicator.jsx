// src/components/dashboard/StepIndicator.jsx
// =============================================================================
// Indicador visual de progreso del wizard: círculos numerados conectados
// por una línea. Tres estados:
//   - completed: círculo con check + línea rellena
//   - current:   círculo sólido con el número
//   - upcoming:  círculo outlined con el número
// =============================================================================

import { Fragment } from 'react';
import { Check } from 'lucide-react';

export const StepIndicator = ({ steps, currentStepIndex }) => {
  return (
    <ol
      className="flex items-start gap-1.5"
      aria-label="Installation progress"
    >
      {steps.map((step, i) => {
        const isCurrent = i === currentStepIndex;
        const isCompleted = i < currentStepIndex;
        const isLast = i === steps.length - 1;

        // Clases del círculo según estado. w-5/h-5 (20px) en vez de w-7/h-7
        // (28px) para ocupar menos vertical — el indicador suma N circulos
        // y crecia demasiado cuando hay varios pasos.
        const circleClasses = [
          'flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold shrink-0 transition-colors',
          isCurrent
            ? 'bg-accent-secondary text-dark-900'
            : isCompleted
              ? 'bg-accent-secondary/20 text-accent-secondary border border-accent-secondary/40'
              : 'bg-dark-700 text-text-muted border border-dark-600',
        ].join(' ');

        // Clases del connector entre círculos. mt-2 (8px) en vez de
        // mt-3.5 (14px) para alinearse con el centro vertical de los
        // circulos de 20px.
        const connectorClasses = [
          'h-px flex-1 mt-2 min-w-[10px] transition-colors',
          isCompleted ? 'bg-accent-secondary/50' : 'bg-dark-700',
        ].join(' ');

        return (
          <Fragment key={step.id}>
            <li
              className="flex flex-col items-center gap-1.5 shrink-0"
              aria-current={isCurrent ? 'step' : undefined}
            >
              <div className={circleClasses}>
                {isCompleted ? <Check size={14} /> : i + 1}
              </div>
            </li>
            {!isLast && (
              <div
                className={connectorClasses}
                aria-hidden="true"
              />
            )}
          </Fragment>
        );
      })}
    </ol>
  );
};
