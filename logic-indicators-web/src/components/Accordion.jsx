// src/components/Accordion.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

// Helper para convertir sintaxis markdown de links [texto](url) en componentes <Link> o <a>
const renderFormattedContent = (content) => {
  if (typeof content !== 'string') return content;

  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  if (!linkRegex.test(content)) {
    return content;
  }

  const parts = [];
  let lastIndex = 0;
  let match;
  linkRegex.lastIndex = 0;

  while ((match = linkRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(content.substring(lastIndex, match.index));
    }
    const label = match[1];
    const href = match[2];
    const isInternal = href.startsWith('/');

    if (isInternal) {
      parts.push(
        <Link
          key={match.index}
          to={href}
          className="text-accent-secondary underline hover:text-accent-primary transition-colors font-medium"
        >
          {label}
        </Link>
      );
    } else {
      parts.push(
        <a
          key={match.index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-secondary underline hover:text-accent-primary transition-colors font-medium"
        >
          {label}
        </a>
      );
    }
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < content.length) {
    parts.push(content.substring(lastIndex));
  }

  return parts;
};

export const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div className="border border-dark-700 rounded-xl mb-4 bg-dark-800 overflow-hidden transition-all duration-300 hover:border-dark-700/80">
      <button
        className="w-full flex items-center justify-between p-5 text-left transition-colors"
        onClick={onClick}
      >
        <span className="font-semibold text-lg text-text-main">{title}</span>
        <ChevronDown
          className={`text-accent-secondary transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[1500px] opacity-100 p-5 pt-0' : 'max-h-0 opacity-0 px-5'
        }`}
      >
        {/* whitespace-pre-line respeta \n en el string del JSON, para
            soportar items con multiples parrafos y bullets simples. */}
        <p className="text-text-muted leading-relaxed whitespace-pre-line">
          {renderFormattedContent(content)}
        </p>
      </div>
    </div>
  );
};

export const Accordion = ({ items }) => {
  // Manejamos qué elemento está abierto. null significa que todos están cerrados.
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};