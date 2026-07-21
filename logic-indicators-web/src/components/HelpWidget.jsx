// src/components/HelpWidget.jsx
//
// Widget de asistencia flotante. Botón en bottom-right (arriba del back-to-top)
// que abre un panel con 4 opciones:
//   1. FAQ             → /faq (link interno)
//   2. Documentación   → /resources/docs (link interno)
//   3. Contacto        → /contact (link interno)
//   4. WhatsApp        → https://wa.me/573113006826 (link externo, nueva pestaña)
//
// Cierra el panel al:
//   - Click fuera del widget
//   - Tecla Escape
//   - Click en cualquier opción del panel
//   - Click en el botón otra vez

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, FileQuestion, BookOpen, Mail, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const WHATSAPP_URL = 'https://wa.me/573113006826';

// Config de las 4 opciones. El campo `external` determina si se renderiza
// como <a target="_blank"> o como <Link> interno.
const HELP_OPTIONS = [
  {
    id: 'faq',
    icon: FileQuestion,
    labelKey: 'help.items.faq',
    to: '/faq',
    external: false,
  },
  {
    id: 'docs',
    icon: BookOpen,
    labelKey: 'help.items.docs',
    to: '/resources/docs',
    external: false,
  },
  {
    id: 'contact',
    icon: Mail,
    labelKey: 'help.items.contact',
    to: '/contact',
    external: false,
  },
  {
    id: 'whatsapp',
    icon: MessageCircle,
    labelKey: 'help.items.whatsapp',
    to: WHATSAPP_URL,
    external: true,
  },
];

export const HelpWidget = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Cerrar con click fuera del widget
  // Usamos mousedown en vez de click para que se dispare antes que el
  // handler de los links internos, evitando race conditions.
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={`
        fixed bottom-24 right-6 md:bottom-28 z-40
        ${!isOpen ? 'pointer-events-none' : ''}
      `}
    >
      <div className="flex flex-col items-end">
      {/* Panel — aparece arriba del botón cuando isOpen=true */}
      <div
        role="dialog"
        aria-label={t('help.openMenu')}
        aria-hidden={!isOpen}
        className={`
          mb-3 w-72 max-w-[calc(100vw-3rem)]
          bg-dark-800 border border-dark-700 rounded-2xl shadow-2xl
          overflow-hidden
          transition-all duration-300 ease-out origin-bottom-right
          ${isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
          }
        `}
      >
        <div className="p-2">
          {HELP_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const label = t(opt.labelKey);
            const baseClass = `
              w-full flex items-center gap-3 px-4 py-3 rounded-xl
              text-text-main hover:bg-dark-700 hover:text-accent-primary
              transition-colors text-sm font-medium
            `;
            if (opt.external) {
              return (
                <a
                  key={opt.id}
                  href={opt.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className={baseClass}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </a>
              );
            }
            return (
              <Link
                key={opt.id}
                to={opt.to}
                onClick={() => setIsOpen(false)}
                className={baseClass}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Botón trigger — outlined para distinguirse del back-to-top (filled).
          pointer-events-auto explícito: el contenedor padre tiene
          pointer-events-none cuando isOpen=false, así que el botón
          necesita sobreescribir para seguir siendo clickeable. */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? t('help.closeMenu') : t('help.openMenu')}
        aria-expanded={isOpen}
        className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full bg-dark-800 border-2 border-accent-primary text-accent-primary shadow-[0_4px_20px_theme(colors.accent.primary/20%)] hover:bg-accent-primary hover:text-dark-900 hover:scale-110 flex items-center justify-center transition-all duration-300 ease-out"
      >
        {isOpen ? (
          <X size={22} strokeWidth={2.5} />
        ) : (
          <MessageCircle size={22} strokeWidth={2.5} />
        )}
      </button>
      </div>
    </div>
  );
};
