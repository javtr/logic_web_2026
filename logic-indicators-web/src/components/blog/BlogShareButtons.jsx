// src/components/blog/BlogShareButtons.jsx
import { useState } from 'react';
import { Share2, Check, Link as LinkIcon, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../context/languageContext';

export const BlogShareButtons = ({ title, slug }) => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/blog/${slug}`
    : `https://logicindicators.com/blog/${slug}`;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const shareLinks = [
    {
      name: 'X (Twitter)',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={15} />,
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-text-muted flex items-center gap-1.5 mr-1 hidden sm:inline-flex">
        <Share2 size={13} className="text-accent-primary" />
        <span>{language === 'es' ? 'Compartir:' : 'Share:'}</span>
      </span>

      {shareLinks.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={`Compartir en ${item.name}`}
          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-accent-primary hover:text-dark-950 text-text-muted transition-all duration-200 flex items-center justify-center border border-white/5 hover:border-accent-primary"
        >
          {item.icon}
        </a>
      ))}

      <button
        onClick={handleCopy}
        title={language === 'es' ? 'Copiar enlace' : 'Copy link'}
        className="h-8 px-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-all duration-200 flex items-center gap-1.5 border border-white/5 text-xs cursor-pointer"
      >
        {copied ? (
          <>
            <Check size={13} className="text-accent-primary" />
            <span className="text-accent-primary font-medium">
              {language === 'es' ? '¡Copiado!' : 'Copied!'}
            </span>
          </>
        ) : (
          <>
            <LinkIcon size={13} />
            <span>{language === 'es' ? 'Copiar' : 'Copy'}</span>
          </>
        )}
      </button>
    </div>
  );
};
