// src/pages/Contact.jsx
import { motion } from 'framer-motion';
import { MessageCircle, Send, Mail, AtSign } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ContactForm } from '../components/ContactForm';

// Mapeo de canales. Los href quedan vacíos a propósito: el usuario conectará
// los links reales más adelante. Cada card es un <button> en vez de <a> para
// que NO naveguen a ningún lado y sea explícito que no hacen nada todavía.
const channelKeys = [
  { id: 'discord', icon: MessageCircle, accent: 'text-indigo-400', glow: 'hover:border-indigo-400/40 hover:shadow-[0_0_20px_theme(colors.indigo.400/15%)]' },
  { id: 'telegram', icon: Send, accent: 'text-sky-400', glow: 'hover:border-sky-400/40 hover:shadow-[0_0_20px_theme(colors.sky.400/15%)]' },
  { id: 'email', icon: Mail, accent: 'text-accent-primary', glow: 'hover:border-accent-primary/40 hover:shadow-[0_0_20px_theme(colors.accent.primary/15%)]' },
  { id: 'twitter', icon: AtSign, accent: 'text-text-main', glow: 'hover:border-text-muted/40 hover:shadow-[0_0_20px_theme(colors.text.main/8%)]' },
];

const ChannelCard = ({ icon: Icon, name, handle, description, accent, glow, onClick }) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
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
    </motion.button>
  );
};

export const Contact = () => {
  const { t } = useLanguage();

  // TODO: Reemplazar con window.open(url, '_blank', 'noopener,noreferrer') o
  // <a href={url} target="_blank" rel="noopener noreferrer"> cuando se conecten
  // los links reales. Por ahora solo registra el click en consola.
  const handleChannelClick = (channelId) => {
    // eslint-disable-next-line no-console
    console.log(`[Contact] Channel clicked: ${channelId} (link not connected yet)`);
  };

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
                  onClick={() => handleChannelClick(id)}
                />
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
