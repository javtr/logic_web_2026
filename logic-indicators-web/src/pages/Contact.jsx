// src/pages/Contact.jsx
import { motion } from 'framer-motion';
import { MessageCircle, AtSign, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ContactForm } from '../components/ContactForm';

// Mapeo de canales. Cada uno tiene un icon, color (accent), glow de hover y url
// (leída desde contact.json para que sea traducible/editable).
// Discord e Instagram abren en nueva pestaña; Email abre el cliente de correo
// (mailto:). El componente ChannelCard detecta el tipo de url y renderiza <a>.
const channelKeys = [
  {
    id: 'discord',
    icon: MessageCircle,
    accent: 'text-indigo-400',
    glow: 'hover:border-indigo-400/40 hover:shadow-[0_0_20px_theme(colors.indigo.400/15%)]',
  },
  {
    id: 'instagram',
    icon: AtSign,
    accent: 'text-pink-400',
    glow: 'hover:border-pink-400/40 hover:shadow-[0_0_20px_theme(colors.pink.400/15%)]',
  },
  {
    id: 'email',
    icon: Mail,
    accent: 'text-accent-primary',
    glow: 'hover:border-accent-primary/40 hover:shadow-[0_0_20px_theme(colors.accent.primary/15%)]',
  },
];

// Todas las cards apuntan a URLs externas (http/https o mailto:), así que se
// renderizan como <a target="_blank" rel="noopener noreferrer">. Si en el
// futuro se agrega un canal interno, se puede condicionar el render por tipo.
//
// El onClick usa window.open en lugar de depender solo de target="_blank",
// porque algunos navegadores no respetan target="_blank" en mailto: y reemplazan
// la pestaña actual. El preventDefault evita el comportamiento default antes
// de que window.open abra la nueva ventana.
const ChannelCard = ({ icon: Icon, name, handle, description, accent, glow, url }) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      aria-label={`${name} — ${handle}`}
      className={`w-full text-left bg-dark-800 border border-dark-700 rounded-xl p-4 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary ${glow}`}
    >
      <div className="flex items-start gap-4">
        <div className={`shrink-0 w-10 h-10 rounded-lg bg-dark-900 border border-dark-700 flex items-center justify-center ${accent} group-hover:scale-110 transition-transform`}>
          <Icon size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-text-main text-sm mb-0.5">{name}</h3>
          <p className="text-xs text-accent-secondary font-medium mb-1.5 truncate">{handle}</p>
          <p className="text-xs text-text-muted leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.a>
  );
};

export const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-dark-900">
      {/* HERO */}
      <section className="relative pt-32 pb-12 px-6 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent-secondary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-text-main tracking-tight mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-lg text-text-muted leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* GRID: Form + Channels */}
      <section className="px-6 container mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Form (3 cols) */}
          <div className="md:col-span-3">
            <ContactForm />
          </div>

          {/* Channels (2 cols) */}
          <aside className="md:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-text-main mb-2">
                {t('contact.channels.title')}
              </h2>
              <p className="text-text-muted text-sm">
                {t('contact.channels.subtitle')}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {channelKeys.map(({ id, icon, accent, glow }) => (
                <ChannelCard
                  key={id}
                  icon={icon}
                  accent={accent}
                  glow={glow}
                  name={t(`contact.channels.${id}.name`)}
                  handle={t(`contact.channels.${id}.handle`)}
                  description={t(`contact.channels.${id}.description`)}
                  url={t(`contact.channels.${id}.url`)}
                />
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
