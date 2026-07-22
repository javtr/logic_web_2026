// src/components/ToggleSwitch.jsx
// Toggle Yearly ⇄ Lifetime. Las etiquetas vienen del JSON vía la prop `labels`.
// Defaults en inglés para mantener compatibilidad con usos que no necesitan i18n.
export const ToggleSwitch = ({
  isLifetime,
  onToggle,
  labels = { yearly: 'Yearly', lifetime: 'Lifetime' },
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

      {/* Texto Lifetime (sin badge — el "Mejor Opción" se conserva solo en la card recomendada) */}
      <span className={`text-lg font-semibold transition-colors duration-300 ${isLifetime ? 'text-text-main' : 'text-text-muted'}`}>
        {labels.lifetime}
      </span>
    </div>
  );
};
