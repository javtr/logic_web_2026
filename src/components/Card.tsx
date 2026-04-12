import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = true, glow = false }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5 } : undefined}
      className={`bg-bg-card border border-white/10 rounded-xl p-6 ${
        hover ? 'hover:border-cyan-500/30 transition-colors duration-300' : ''
      } ${glow ? 'glow' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
