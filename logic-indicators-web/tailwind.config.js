/** @type {import('tailwindcss').Config} */
// =============================================================================
// SISTEMA DE COLORES — fuente única de verdad
// =============================================================================
// Todos los colores de la app se definen acá. Para usarlos en clases
// estándar de Tailwind: bg-accent-primary, text-accent-secondary, etc.
//
// Para usarlos en arbitrary values (shadow-[...], bg-[...], text-[...]):
//   NUNCA hardcodear hex/rgba. Usar theme() para que siga al theme:
//
//     ❌  shadow-[0_0_20px_rgba(0,230,118,0.5)]
//     ✅  shadow-[0_0_20px_theme(colors.accent.primary/50%)]
//
// Cuando cambies un color acá, TODO lo que lo use se actualiza solo:
//   - bg-accent-primary, text-accent-secondary, border-accent-primary
//   - Cualquier arbitrary value con theme(colors.accent.primary/...)
//
// Nombres semánticos (primary/secondary) en vez de por color, para que
// se puedan reasignar los valores hex sin tocar código de componentes.
// =============================================================================
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fondos oscuros (Dark Mode)
        dark: {
          900: '#0B0E14', // Fondo principal de la web
          800: '#151A23', // Fondo para tarjetas y Navbar
          700: '#222A38', // Hover en tarjetas o bordes sutiles
        },
        // Colores de acento (Tecnológicos/Trading)
        // primary   = CTA principal, badges "best value", glows destacados
        // secondary = links, acentos secundarios, highlights de cards
        accent: {
          primary:   '#0163f1', // magenta vibrante — CTAs principales
          secondary: '#05fde4', // amarillo eléctrico — acentos secundarios
        },
        text: {
          main: '#F3F4F6',  // Texto principal (casi blanco)
          muted: '#9CA3AF', // Texto secundario (gris claro)
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Fuente limpia y moderna
      },
      keyframes: {
        // Grid drift: anima background-position de un gradiente de cuadrícula.
        // GPU-composited, no causa reflow ni repaint del contenido. Costo
        // despreciable incluso en mobile.
        'grid-drift': {
          from: { 'background-position': '0 0' },
          to: { 'background-position': '60px 60px' },
        },
      },
      animation: {
        // 20s por loop = 3px/s. Velocidad suficiente para que el ojo perciba
        // el movimiento sin que distraiga del contenido.
        'grid-drift': 'gridDrift 20s linear infinite',
      },
    },
  },
  plugins: [],
};
