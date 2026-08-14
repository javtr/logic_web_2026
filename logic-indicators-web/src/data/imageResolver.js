// src/data/imageResolver.js
// Mapea un imageKey (string) del JSON al asset real que Vite importa y procesa.
// Razón: queremos que los JSON solo contengan strings (no imports de Vite),
// y al mismo tiempo queremos que Vite siga hasheando y optimizando las imágenes.
//
// Cómo agregar una imagen nueva:
//   1. Agregar el import del asset arriba
//   2. Agregar la entrada al imageMap
//   3. En el JSON usar el imageKey correspondiente
import sampleIndicatorImage from '../assets/indicators/sample_image.png';
import suiteImage from '../assets/indicators/suite.png';
import footprintImage from '../assets/indicators/footprint.png';
import footerImage from '../assets/indicators/footer.png';
import profileImage from '../assets/indicators/profile.png';
import compositeImage from '../assets/indicators/composite.png';
import bigtradesImage from '../assets/indicators/bigtrades.png';
import analyticsImage from '../assets/indicators/analytics.png';
import algorithmsImage from '../assets/indicators/algorithms.png';
import footprint_d1Image from '../assets/indicators/footprint_d1.png';
import footprint_d2Image from '../assets/indicators/footprint_d2.png';
import footprint_d3Image from '../assets/indicators/footprint_d3.png';
import footer_d01Image from '../assets/indicators/footer_d01.png';
import footer_d02Image from '../assets/indicators/footer_d02.png';
import footer_d03Image from '../assets/indicators/footer_d03.png';
import profile_d01Image from '../assets/indicators/profile_d1.png';
import profile_d02Image from '../assets/indicators/profile_d2.png';
import profile_d03Image from '../assets/indicators/profile_d3.png';
import composite_d01Image from '../assets/indicators/composite_d1.png';
import composite_d02Image from '../assets/indicators/composite_d2.png';
import composite_d03Image from '../assets/indicators/composite_d3.png';
import bigtrades_d01Image from '../assets/indicators/bigtrades_d1.png';
import bigtrades_d02Image from '../assets/indicators/bigtrades_d2.png';
import bigtrades_d03Image from '../assets/indicators/bigtrades_d3.png';
import analytics_d01Image from '../assets/indicators/analytics_d1.png';
import analytics_d02Image from '../assets/indicators/analytics_d2.png';
import analytics_d03Image from '../assets/indicators/analytics_d3.png';
import algorithms_d01Image from '../assets/indicators/algorithms_d1.png';
import algorithms_d02Image from '../assets/indicators/algorithms_d2.png';
import algorithms_d03Image from '../assets/indicators/algorithms_d3.png';



export const imageMap = {
  // Fallback / placeholder (también usado por deepchart y deeplive hasta tener imagen propia)
  sample_indicator: sampleIndicatorImage,
  // Banner de Home (entre hero y la grilla de la suite premium)
  suite: suiteImage,
  // Indicadores con imagen propia
  footprint: footprintImage,
  footer: footerImage,
  profile: profileImage,
  composite: compositeImage,
  bigtrades: bigtradesImage,
  analytics: analyticsImage,
  algorithms: algorithmsImage,
  // Variantes por profundidad de mercado (depth). Los archivos son *_d1.png,
  // *_d2.png, *_d3.png — las keys siguen esa misma convención.
  footprint_d1: footprint_d1Image,
  footprint_d2: footprint_d2Image,
  footprint_d3: footprint_d3Image,
  footer_d1: footer_d01Image,
  footer_d2: footer_d02Image,
  footer_d3: footer_d03Image,
  profile_d1: profile_d01Image,
  profile_d2: profile_d02Image,
  profile_d3: profile_d03Image,
  composite_d1: composite_d01Image,
  composite_d2: composite_d02Image,
  composite_d3: composite_d03Image,
  bigtrades_d1: bigtrades_d01Image,
  bigtrades_d2: bigtrades_d02Image,
  bigtrades_d3: bigtrades_d03Image,
  analytics_d1: analytics_d01Image,
  analytics_d2: analytics_d02Image,
  analytics_d3: analytics_d03Image,
  algorithms_d1: algorithms_d01Image,
  algorithms_d2: algorithms_d02Image,
  algorithms_d3: algorithms_d03Image,

  // Tutorial de importacion de presets (pagina /resources/presets).
  // PLACEHOLDER — apunta al fallback hasta que subas las capturas reales
  // de NinjaTrader 8. Para reemplazarlas: importa el asset arriba, agrega
  // la entrada aqui, y/o cambia el imageKey en presets.json.
  tutorial_step_1: sampleIndicatorImage,
  tutorial_step_2: sampleIndicatorImage,

  
};

export const resolveImage = (imageKey) => {
  const image = imageMap[imageKey];
  if (!image) {
    if (import.meta.env.DEV) {
      console.warn(`[imageResolver] Unknown imageKey: "${imageKey}". Available: ${Object.keys(imageMap).join(', ')}`);
    }
    // Importación directa: Vite tree-shakea el imageMap pero este asset sigue en el bundle.
    return sampleIndicatorImage; // fallback seguro
  }
  return image;
};
