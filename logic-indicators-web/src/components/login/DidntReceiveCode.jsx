// src/components/login/DidntReceiveCode.jsx
// =============================================================================
// BANNER "DIDN'T RECEIVE THE CODE?"
// =============================================================================
// Banner azul que se muestra debajo del form de OTP para recordarle al
// usuario que revise spam/promociones si no le llega el codigo. Reemplaza
// al banner amarillo anterior (`login.spamWarning`) porque este es mas
// completo: ademas de avisar del spam, sugiere contactar a soporte.
//
// Por ahora NO tiene link a soporte (decision del usuario: "si mas
// adelante veo que es necesario, lo ponemos"). El texto dice "contact our
// support team" como placeholder para que cuando se agregue el link
// solo haya que envolver esa frase en un <a>.
// =============================================================================
import { HelpCircle } from 'lucide-react';
import { useLanguage } from '../../context/languageContext';

export const DidntReceiveCode = () => {
  const { t } = useLanguage();

  return (
    <div
      role="note"
      className="flex items-start gap-2.5 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-200 text-xs leading-relaxed"
    >
      <HelpCircle size={16} className="shrink-0 mt-0.5 text-blue-400" aria-hidden="true" />
      <div>
        <p className="font-semibold text-blue-100 mb-0.5">
          {t('login.didntReceiveCode.title')}
        </p>
        <p>
          {t('login.didntReceiveCode.description')}
        </p>
      </div>
    </div>
  );
};
