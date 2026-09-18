// src/components/LicenseForm.jsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../context/languageContext';
import { Button } from './Button';
import { 
  User, 
  Cpu, 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ShieldAlert, 
  RotateCcw,
  MessageCircle
} from 'lucide-react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Claves de producción oficiales para el formulario de Licencia (template_6r8ymzt)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_g9gfwit';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_LIC_TEMPLATE_ID || 'template_6r8ymzt';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'QyQP72Hg4ObCGjDYM';
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LdmJucpAAAAAPN--0vzj_7NuxLvMHqsRDrOkpxO';

const IS_LOCAL_TESTING = import.meta.env.VITE_IS_LOCAL_TESTING === 'true';

export const LicenseForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    idmachine: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const [captchaValue, setCaptchaValue] = useState(null);
  const [bannedEmails, setBannedEmails] = useState([]);
  const recaptchaRef = useRef(null);

  useEffect(() => {
    const fetchBannedEmails = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/javtr/Vba/main/rcd.ob');
        const data = await response.text();
        const banned = data
          .trim()
          .split(',')
          .map((e) => e.trim())
          .filter((e) => e.length > 0);
        setBannedEmails(banned);
      } catch (error) {
        if (import.meta.env.DEV) console.error('Error fetching banned emails:', error);
      }
    };
    fetchBannedEmails();
  }, []);

  const validate = (data) => {
    const newErrors = {};

    if (!data.name.trim()) {
      newErrors.name = t('license.form.errors.required');
    }

    if (!data.idmachine.trim()) {
      newErrors.idmachine = t('license.form.errors.required');
    } else if (data.idmachine.trim().length < 5) {
      newErrors.idmachine = t('license.form.errors.machineIdMin');
    }

    if (!data.email.trim()) {
      newErrors.email = t('license.form.errors.required');
    } else if (!EMAIL_REGEX.test(data.email)) {
      newErrors.email = t('license.form.errors.email');
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    if (touched[name]) {
      setErrors(validate(newData));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  };

  const onCaptchaChange = (value) => {
    setCaptchaValue(value);
    if (value) {
      setErrors((prev) => {
        const newE = { ...prev };
        delete newE.captcha;
        return newE;
      });
    }
  };

  const handleSuccess = () => {
    setStatus('success');
    setFormData({ name: '', idmachine: '', email: '', message: '' });
    setTouched({});
    setCaptchaValue(null);
    if (recaptchaRef.current) recaptchaRef.current.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(formData);

    if (!captchaValue && !IS_LOCAL_TESTING) {
      newErrors.captcha = t('license.form.errors.captcha');
    }

    setErrors(newErrors);
    setTouched({ name: true, idmachine: true, email: true, message: true });

    if (Object.keys(newErrors).length > 0) return;

    setStatus('submitting');

    // Validación de lista negra (silenciosa)
    if (bannedEmails.includes(formData.email.trim())) {
      setTimeout(() => {
        handleSuccess();
      }, 1500);
      return;
    }

    // Parámetros para template_6r8ymzt
    const templateParams = {
      name: formData.name.trim(),
      idmachine: formData.idmachine.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then(() => {
        handleSuccess();
      })
      .catch((error) => {
        console.error('Error EmailJS License:', error);
        setStatus('error');
      });
  };

  const isSubmitting = status === 'submitting';
  const isSuccess = status === 'success';

  return (
    <div className="bg-dark-800 border border-dark-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Header del formulario */}
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent-primary/10 text-accent-primary border border-accent-primary/25 mb-3">
          {t('license.step2.badge')}
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-text-main mb-2">
          {t('license.step2.title')}
        </h2>
        <p className="text-text-muted text-sm leading-relaxed">
          {t('license.step2.subtitle')}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="license-success"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.3 }}
            role="status"
            aria-live="polite"
            className="space-y-6 py-4"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-xl font-bold text-text-main mb-2">
                {t('license.form.success.title')}
              </h3>
              <p className="text-text-muted text-sm max-w-md mb-6 leading-relaxed">
                {t('license.form.success.description')}
              </p>
            </div>

            {/* Tarjeta de tiempo de entrega */}
            <div className="p-4 rounded-xl bg-dark-900/80 border border-dark-700 flex items-start gap-3.5">
              <Clock size={20} className="text-accent-primary shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-text-main leading-relaxed">
                <p className="font-semibold text-accent-primary mb-1">
                  Tiempo estimado de entrega:
                </p>
                <p className="text-text-muted">
                  {t('license.form.success.deliveryTime')}
                </p>
              </div>
            </div>

            {/* Aviso de Spam */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3.5">
              <ShieldAlert size={20} className="text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                {t('license.form.success.spamWarning')}
              </p>
            </div>

            {/* Botón para enviar otra solicitud */}
            <div className="pt-2 flex justify-center">
              <Button
                variant="outline"
                className="gap-2 text-sm"
                onClick={() => setStatus('idle')}
              >
                <RotateCcw size={16} />
                <span>{t('license.form.success.sendAnother')}</span>
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="license-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5"
          >
            {/* Mensaje de error general si falla el envío */}
            {status === 'error' && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-sm flex items-start gap-2.5">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span className="leading-snug">{t('license.form.errors.generic')}</span>
              </div>
            )}

            {/* Campo: Nombre Completo */}
            <div>
              <label htmlFor="lic-name" className="block text-sm font-medium text-text-main mb-1.5">
                {t('license.form.name')} <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
                  <User size={18} className={errors.name ? 'text-red-400' : ''} />
                </div>
                <input
                  id="lic-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  placeholder={t('license.form.namePlaceholder')}
                  className={`w-full bg-dark-900 border text-text-main text-sm rounded-xl pl-10 pr-3.5 py-3 outline-none transition-all ${
                    errors.name
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50'
                      : 'border-dark-700 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                  <AlertCircle size={12} />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Campo: Machine ID */}
            <div>
              <label htmlFor="lic-machine" className="block text-sm font-medium text-text-main mb-1.5">
                {t('license.form.machineId')} <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
                  <Cpu size={18} className={errors.idmachine ? 'text-red-400' : ''} />
                </div>
                <input
                  id="lic-machine"
                  name="idmachine"
                  type="text"
                  value={formData.idmachine}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  placeholder={t('license.form.machineIdPlaceholder')}
                  className={`w-full bg-dark-900 border text-text-main font-mono text-sm rounded-xl pl-10 pr-3.5 py-3 outline-none transition-all tracking-wider ${
                    errors.idmachine
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50'
                      : 'border-dark-700 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary'
                  }`}
                />
              </div>
              {errors.idmachine && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                  <AlertCircle size={12} />
                  {errors.idmachine}
                </p>
              )}
            </div>

            {/* Campo: Correo Electrónico */}
            <div>
              <label htmlFor="lic-email" className="block text-sm font-medium text-text-main mb-1.5">
                {t('license.form.email')} <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
                  <Mail size={18} className={errors.email ? 'text-red-400' : ''} />
                </div>
                <input
                  id="lic-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  placeholder={t('license.form.emailPlaceholder')}
                  className={`w-full bg-dark-900 border text-text-main text-sm rounded-xl pl-10 pr-3.5 py-3 outline-none transition-all ${
                    errors.email
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50'
                      : 'border-dark-700 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                  <AlertCircle size={12} />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Campo: Mensaje / Notas Opcionales */}
            <div>
              <label htmlFor="lic-message" className="block text-sm font-medium text-text-main mb-1.5">
                {t('license.form.message')}
              </label>
              <div className="relative">
                <div className="absolute top-3.5 left-0 pl-3.5 flex items-start pointer-events-none text-text-muted">
                  <MessageSquare size={18} />
                </div>
                <textarea
                  id="lic-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  placeholder={t('license.form.messagePlaceholder')}
                  rows={3}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary text-text-main text-sm rounded-xl pl-10 pr-3.5 py-3 outline-none transition-all resize-none"
                />
              </div>
            </div>

            {/* Google reCAPTCHA */}
            <div className="flex flex-col items-center pt-1">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={onCaptchaChange}
                size={typeof window !== 'undefined' && window.innerWidth < 640 ? 'compact' : 'normal'}
                theme="dark"
              />
              {errors.captcha && (
                <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5">
                  <AlertCircle size={12} />
                  {errors.captcha}
                </p>
              )}
            </div>

            {/* Botón Submit */}
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="w-full justify-center py-3.5 text-base gap-2 font-semibold shadow-lg shadow-accent-primary/20"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-dark-900"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>{t('license.form.sending')}</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>{t('license.form.submit')}</span>
                </>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
