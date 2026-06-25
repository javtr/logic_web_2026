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

export const imageMap = {
  sample_indicator: sampleIndicatorImage,
};

export const resolveImage = (imageKey) => {
  const image = imageMap[imageKey];
  if (!image) {
    // eslint-disable-next-line no-console
    console.warn(`[imageResolver] Unknown imageKey: "${imageKey}". Available: ${Object.keys(imageMap).join(', ')}`);
    return imageMap.sample_indicator; // fallback seguro
  }
  return image;
};
