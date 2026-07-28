import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'

// HelmetProvider va por FUERA de <App /> y del <LanguageProvider>.
// Es el "manager" global que colecta los <Helmet> que cada página
// renderiza y los aplica al <head> real del DOM. Solo se necesita
// una vez en toda la app.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
