// src/components/Button.jsx
const variants = {
  primary: "bg-accent-green text-dark-900 hover:shadow-[0_0_20px_rgba(0,230,118,0.5)]",
  secondary: "border border-accent-blue text-accent-blue hover:bg-accent-blue/10",
  outline: "border border-dark-700 text-text-muted hover:text-text-main hover:border-text-muted"
};

export const Button = ({ children, variant = "primary", className = "", ...props }) => {
  return (
    <button 
      className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 active:scale-95 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};