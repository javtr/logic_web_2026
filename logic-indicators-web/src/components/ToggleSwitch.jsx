// src/components/ToggleSwitch.jsx
// Toggle Yearly ⇄ Lifetime. Las etiquetas vienen del JSON vía la prop `labels`.
// Defaults en inglés para mantener compatibilidad con usos que no necesitan i18n.
export const ToggleSwitch = ({
  isLifetime,
  onToggle,
  labels = { yearly: 'Yearly', lifetime: 'Lifetime', bestValue: 'Best Value' },
}) => {
  return (
    <div className="flex items-center justify-center gap-5 my-8">
      {/* Texto Yearly */}
      <span className={`text-lg font-semibold transition-colors duration-300 ${!isLifetime ? 'text-text-main' : 'text-text-muted'}`}>
        {labels.yearly}
      </span>

      {/* Switch Botón */}
      <button
        onClick={onToggle}
        className="relative inline-flex h-8 w-16 items-center rounded-full bg-dark-800 border border-dark-700 transition-colors focus:outline-none"
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-accent-primary shadow-[0_0_10px_theme(colors.accent.primary/30%)] transition-transform duration-300 ease-in-out ${
            isLifetime ? 'translate-x-9' : 'translate-x-1'
          }`}
        />
      </button>

      {/* Texto Lifetime con Badge */}
      <span className={`flex items-center gap-3 text-lg font-semibold transition-colors duration-300 ${isLifetime ? 'text-text-main' : 'text-text-muted'}`}>
        {labels.lifetime}
        <span className="px-2.5 py-1 rounded-md text-[11px] tracking-wider uppercase font-bold bg-accent-secondary/10 text-accent-secondary border border-accent-secondary/20">
          {labels.bestValue}
        </span>
      </span>
    </div>
  );
};
