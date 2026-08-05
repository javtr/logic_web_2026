// src/components/PageLoader.jsx
// =============================================================================
// Fallback de Suspense para chunks lazy.
// =============================================================================
// Spinner sutil de 1 solo elemento, GPU-cheap (transform), sin librerías.
// Mantiene el tema dark + accent. Pensado para que se vea "parte de la app",
// no un error.
// =============================================================================
export const PageLoader = () => {
  return (
    <div
      className="flex items-center justify-center min-h-[60vh]"
      role="status"
      aria-label="Loading page"
    >
      <div
        className="w-10 h-10 rounded-full border-2 border-dark-700 border-t-accent-primary"
        style={{ animation: 'spin 0.8s linear infinite' }}
      />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          div[role="status"] > div { animation: none !important; }
        }
      `}</style>
    </div>
  );
};
