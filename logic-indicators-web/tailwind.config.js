/** @type {import('tailwindcss').Config} */
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
        accent: {
          green: '#00E676', // Verde brillante para CTAs principales (compras, subidas)
          blue: '#2979FF',  // Azul tecnológico para enlaces o acentos secundarios
        },
        text: {
          main: '#F3F4F6',  // Texto principal (casi blanco)
          muted: '#9CA3AF', // Texto secundario (gris claro)
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Fuente limpia y moderna
      }
    },
  },
  plugins: [],
}