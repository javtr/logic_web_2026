// src/components/login/CheckSpamBanner.jsx
// =============================================================================
// BANNER "CHECK YOUR SPAM"
// =============================================================================
// Banner amarillo (atencion) que se muestra debajo del form de OTP para
// recordarle al usuario que revise la carpeta de spam/correo no deseado
// si no le llega el codigo.
//
// Caso real reportado: un usuario penso que el codigo no existia porque
// el mail estaba en su carpeta de spam. Con este banner evitamos esa
// confusion en futuros usuarios.
//
// Diferencia con DidntReceiveCode:
//   - CheckSpamBanner: recordatorio inmediato "antes de buscar mas, mira
//     spam". Color amarillo (warning, no es un problema serio).
//   - DidntReceiveCode: "si no lo encuentras, contactanos". Color azul
//     (info, paso siguiente si el primero no funciono).
// =============================================================================
import { Mail } from 'lucide-react';
import { useLanguage } from '../../context/languageContext';

export const CheckSpamBanner = () => {
  const { t } = useLanguage();

  return (
    <div
      role="note"
      className="flex items-start gap-2.5 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 text-xs leading-relaxed"
    >
      <Mail size={16} className="shrink-0 mt-0.5 text-yellow-400" aria-hidden="true" />
      <span>{t('login.spamWarning')}</span>
    </div>
  );
};
