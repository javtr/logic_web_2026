// src/components/ContactForm.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './Button';
import { Send, CheckCircle2, AlertCircle, Mail, User, MessageSquare } from 'lucide-react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MIN_LENGTH = 10;

export const ContactForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success

  const validate = (data) => {
    const newErrors = {};

    if (!data.name.trim()) {
      newErrors.name = t('contact.form.errors.required');
    }

    if (!data.email.trim()) {
      newErrors.email = t('contact.form.errors.required');
    } else if (!EMAIL_REGEX.test(data.email)) {
      newErrors.email = t('contact.form.errors.email');
    }

    if (!data.message.trim()) {
      newErrors.message = t('contact.form.errors.required');
    } else if (data.message.trim().length < MESSAGE_MIN_LENGTH) {
      newErrors.message = t('contact.form.errors.messageMinLength');
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    // Re-valida en vivo solo si el campo ya fue tocado (UX amable, no molestar al inicio)
    if (touched[name]) {
      setErrors(validate(newData));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(formData);
    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(newErrors).length > 0) return;

    setStatus('submitting');

    // TODO: Reemplazar con llamada real al backend cuando esté disponible.
    // Por ahora solo simula un envío para poder probar visualmente el front.
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTouched({});

      // Vuelve a idle después de unos segundos para permitir otro envío
      setTimeout(() => {
        setStatus('idle');
      }, 6000);
    }, 1200);
  };

  const isSubmitting = status === 'submitting';
  const isSuccess = status === 'success';

  return (
    <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 md:p-8 shadow-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-main mb-2">
          {t('contact.form.title')}
        </h2>
        <p className="text-text-muted text-sm">
          {t('contact.form.subtitle')}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            role="status"
            aria-live="polite"
            className="flex flex-col items-center text-center py-8"
          >
            <div className="w-16 h-16 rounded-full bg-accent-green/10 border border-accent-green/30 flex items-center justify-center mb-4">
              <CheckCircle2 size={32} className="text-accent-green" />
            </div>
            <p className="text-text-main font-medium max-w-sm">
              {t('contact.form.success')}
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5"
          >
            {/* Honeypot anti-spam: oculto a usuarios reales, visible a bots */}
            <input
              type="text"
              name="bot-field"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute opacity-0 pointer-events-none -left-[9999px]"
            />

            {/* Name */}
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-text-main mb-2">
                {t('contact.form.name')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={16} className={errors.name ? 'text-red-400' : 'text-text-muted'} />
                </div>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  placeholder={t('contact.form.namePlaceholder')}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className={`w-full bg-dark-900 border text-text-main text-sm rounded-lg pl-10 pr-3 py-3 outline-none transition-colors ${
                    errors.name
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50'
                      : 'border-dark-700 focus:border-accent-blue focus:ring-1 focus:ring-accent-blue'
                  }`}
                />
              </div>
              {errors.name && (
                <p id="contact-name-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                  <AlertCircle size={12} />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-text-main mb-2">
                {t('contact.form.email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className={errors.email ? 'text-red-400' : 'text-text-muted'} />
                </div>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  placeholder={t('contact.form.emailPlaceholder')}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className={`w-full bg-dark-900 border text-text-main text-sm rounded-lg pl-10 pr-3 py-3 outline-none transition-colors ${
                    errors.email
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50'
                      : 'border-dark-700 focus:border-accent-blue focus:ring-1 focus:ring-accent-blue'
                  }`}
                />
              </div>
              {errors.email && (
                <p id="contact-email-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                  <AlertCircle size={12} />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-text-main mb-2">
                {t('contact.form.message')}
              </label>
              <div className="relative">
                <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                  <MessageSquare size={16} className={errors.message ? 'text-red-400' : 'text-text-muted'} />
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  placeholder={t('contact.form.messagePlaceholder')}
                  rows={5}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={`w-full bg-dark-900 border text-text-main text-sm rounded-lg pl-10 pr-3 py-3 outline-none transition-colors resize-none ${
                    errors.message
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50'
                      : 'border-dark-700 focus:border-accent-blue focus:ring-1 focus:ring-accent-blue'
                  }`}
                />
              </div>
              {errors.message && (
                <p id="contact-message-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                  <AlertCircle size={12} />
                  {errors.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {t('contact.form.sending')}
                </>
              ) : (
                <>
                  <Send size={16} />
                  {t('contact.form.submit')}
                </>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
