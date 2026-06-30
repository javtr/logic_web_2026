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
};

export const resolveImage = (imageKey) => {
  const image = imageMap[imageKey];
  if (!image) {
    // eslint-disable-next-line no-console
    console.warn(`[imageResolver] Unknown imageKey: "${imageKey}". Available: ${Object.keys(imageMap).join(', ')}`);
    // Importación directa: Vite tree-shakea el imageMap pero este asset sigue en el bundle.
    return sampleIndicatorImage; // fallback seguro
  }
  return image;
};
