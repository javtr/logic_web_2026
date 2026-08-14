// src/components/Accordion.jsx
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
        <p className="text-text-muted leading-relaxed whitespace-pre-line">{content}</p>
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