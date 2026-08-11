// src/components/login/LoginExplainer.jsx
// =============================================================================
// EXPLICADOR DEL FLUJO DE LOGIN
// =============================================================================
// Componente que muestra 3 cards numeradas (Email → Code → Access) con un
// divisor "How does it work?" en el medio. Es 100% informativo: ayuda al
// usuario a entender el proceso ANTES de pedir el codigo, y refuerza
// que esta en el lugar correcto despues.
//
// Aparece debajo del form en AMBOS pasos del login (email y OTP), asi el
// usuario tiene la guia a la vista en todo momento.
//
// i18n: todo el texto viene de login.howItWorks.{title, steps[]}.
// =============================================================================
import { Mail, KeyRound, LogIn } from 'lucide-react';
import { useLanguage } from '../../context/languageContext';

// Iconos por indice del step. Mantener el ORDEN consistente con el JSON:
//   0 = Email, 1 = Code, 2 = Access
const STEP_ICONS = [Mail, KeyRound, LogIn];

export const LoginExplainer = () => {
  const { t } = useLanguage();

  // El JSON tiene 3 steps. Usamos .length del array para mantenerlo
  // data-driven: si en el futuro se agrega un paso 4, no hay que tocar
  // este componente.
  const stepsCount = 3;

  return (
    <div className="mt-8">
      {/* Divisor con lineas y titulo centrado */}
      <div className="flex items-center gap-3 mb-6" aria-hidden="true">
        <div className="flex-1 h-px bg-dark-700" />
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
          {t('login.howItWorks.title')}
        </h3>
        <div className="flex-1 h-px bg-dark-700" />
      </div>

      {/* Grid de 3 cards. En mobile stack vertical, en md+ 3 cols */}
      <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: stepsCount }).map((_, i) => {
          const Icon = STEP_ICONS[i] || Mail;
          return (
            <li
              key={i}
              className="relative p-4 bg-dark-800 border border-dark-700 rounded-xl text-center"
            >
              {/* Numero del step (circulo verde) */}
              <div
                className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-dark-900 border-2 border-accent-primary text-accent-primary text-xs font-bold flex items-center justify-center"
                aria-hidden="true"
              >
                {i + 1}
              </div>

              {/* Icono */}
              <div className="mt-2 mb-3 flex justify-center">
                <div className="w-12 h-12 rounded-full bg-dark-900 border border-dark-700 flex items-center justify-center text-accent-primary">
                  <Icon size={22} aria-hidden="true" />
                </div>
              </div>

              {/* Titulo */}
              <h4 className="text-text-main font-semibold text-sm mb-1">
                {t(`login.howItWorks.steps.${i}.title`)}
              </h4>

              {/* Descripcion */}
              <p className="text-text-muted text-xs leading-relaxed">
                {t(`login.howItWorks.steps.${i}.description`)}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
