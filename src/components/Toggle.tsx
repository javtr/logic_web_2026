import React from 'react';
import { motion } from 'framer-motion';

interface ToggleProps {
  leftLabel: string;
  rightLabel: string;
  isRight: boolean;
  onToggle: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ leftLabel, rightLabel, isRight, onToggle }) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <span className={`text-sm font-medium transition-colors ${!isRight ? 'text-white' : 'text-text-muted'}`}>
        {leftLabel}
      </span>
      
      <button
        onClick={onToggle}
        className="relative w-16 h-8 bg-bg-tertiary rounded-full border border-white/10 focus:outline-none"
      >
        <motion.div
          animate={{ x: isRight ? 32 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 left-1 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
        />
      </button>
      
      <span className={`text-sm font-medium transition-colors ${isRight ? 'text-white' : 'text-text-muted'}`}>
        {rightLabel}
      </span>
    </div>
  );
};

export default Toggle;
