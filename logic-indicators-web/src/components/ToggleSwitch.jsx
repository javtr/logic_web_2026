// src/components/ToggleSwitch.jsx
export const ToggleSwitch = ({ isLifetime, onToggle }) => {
  return (
    <div className="flex items-center justify-center gap-5 my-8">
      {/* Texto Yearly */}
      <span className={`text-lg font-semibold transition-colors duration-300 ${!isLifetime ? 'text-text-main' : 'text-text-muted'}`}>
        Yearly
      </span>
      
      {/* Switch Botón */}
      <button
        onClick={onToggle}
        className="relative inline-flex h-8 w-16 items-center rounded-full bg-dark-800 border border-dark-700 transition-colors focus:outline-none"
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-accent-green shadow-[0_0_10px_rgba(0,230,118,0.3)] transition-transform duration-300 ease-in-out ${
            isLifetime ? 'translate-x-9' : 'translate-x-1'
          }`}
        />
      </button>

      {/* Texto Lifetime con Badge */}
      <span className={`flex items-center gap-3 text-lg font-semibold transition-colors duration-300 ${isLifetime ? 'text-text-main' : 'text-text-muted'}`}>
        Lifetime
        <span className="px-2.5 py-1 rounded-md text-[11px] tracking-wider uppercase font-bold bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
          Best Value
        </span>
      </span>
    </div>
  );
};