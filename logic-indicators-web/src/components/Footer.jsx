// src/components/Footer.jsx
//
// Footer del sitio. Toda la data (textos, links, redes sociales) viene de
// footer.json + data/index.js (INDICATOR_ORDER + getActiveIndicatorIds).
// Cero hardcoded: agregar/quitar indicadores, links o redes es solo editar
// el JSON correspondiente.
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getActiveIndicatorIds } from '../data';
import { MessageCircle, Mail, ShieldCheck } from 'lucide-react';
import logoSvg from '../assets/logo_logic.svg';

// Handler para los links externos (social, mailto, etc.). Usa window.open en
// lugar de depender solo de target="_blank", porque algunos navegadores no
// respetan target="_blank" en mailto: y reemplazan la pestaña actual.
// El `e.preventDefault()` evita que el click navegue la pestaña actual antes
// de que window.open abra la nueva.
const handleExternalClick = (e, url) => {
  e.preventDefault();
  window.open(url, '_blank', 'noopener,noreferrer');
};

// Redes sociales: si agregás una red nueva, agregás una entrada acá.
// `url` se lee desde el JSON de contacto para mantener una sola fuente de verdad.
const socialLinks = [
  {
    id: 'discord',
    label: 'Discord',
    icon: MessageCircle,
    urlKey: 'https://discord.gg/EWFehJ9dFu',
  },
  {
    id: 'email',
    label: 'Email',
    icon: Mail,
    urlKey: 'mailto:info@logicindicators.com',
  },
];

export const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  // Productos: dinámicos desde getActiveIndicatorIds. Cada link va a la página
  // de detalle del indicador correspondiente. Si en el futuro agregás un
  // indicador nuevo, aparece solo en el footer.
  const activeIndicators = getActiveIndicatorIds(language);

  return (
    <footer className="bg-dark-900 border-t border-dark-700 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Columna 1: Branding */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" aria-label="Logic Indicators - Inicio">
              <img
                src={logoSvg}
                alt="Logic Indicators"
                className="h-14 w-auto"
              />
            </Link>
            <p className="mt-4 text-text-muted text-sm leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map(({ id, label, icon: Icon, urlKey }) => (
                <a
                  key={id}
                  href={urlKey}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleExternalClick(e, urlKey)}
                  aria-label={label}
                  className="text-text-muted hover:text-accent-secondary transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Columna 2: Productos (dinámico) */}
          <div>
            <h4 className="text-text-main font-bold mb-6">{t('footer.products')}</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              {activeIndicators.map((id) => (
                <li key={id}>
                  <Link
                    to={`/indicators/${t(`indicators.${id}.slug`)}`}
                    className="hover:text-accent-primary transition-colors"
                  >
                    {t(`indicators.${id}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Soporte */}
          <div>
            <h4 className="text-text-main font-bold mb-6">{t('footer.support')}</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li>
                <Link to="/resources/docs" className="hover:text-accent-primary transition-colors">
                  {t('footer.resources')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent-primary transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-accent-primary transition-colors">
                  {t('footer.faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Legal */}
          <div>
            <h4 className="text-text-main font-bold mb-6">{t('footer.legal')}</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li>
                <Link to="/privacy" className="hover:text-text-main transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-text-main transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-lg bg-dark-800 border border-dark-700 flex items-center gap-3">
              <ShieldCheck className="text-accent-primary" size={24} />
              <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">
                Secure SSL Encryption
              </span>
            </div>
          </div>
        </div>

        {/* Copyright (i18n) */}
        <div className="border-t border-dark-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <p>{t('footer.copyright').replace('{year}', currentYear)}</p>
          <p>{t('footer.tagline')}</p>
        </div>
      </div>
    </footer>
  );
};
