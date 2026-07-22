// src/components/Button.jsx
const variants = {
  primary: "bg-accent-primary text-dark-900 hover:shadow-[0_0_20px_theme(colors.accent.primary/50%)]",
  secondary: "border border-accent-secondary text-accent-secondary hover:bg-accent-secondary/10",
  outline: "border border-dark-700 text-text-muted hover:text-text-main hover:border-text-muted"
};

export const Button = ({ children, variant = "primary", className = "", ...props }) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 active:scale-95 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};