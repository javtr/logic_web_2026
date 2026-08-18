// src/data/installation.js
// =============================================================================
// Generador de pasos para el wizard de instalación del dashboard.
//
// Convierte la lista de productos del usuario en una secuencia ordenada de
// pasos, cada uno con su archivo y metadata. La logica de prerrequisitos
// (Core, Engine, ambos, ninguno) se delega a getPrerequisites() en
// downloads.js — este modulo solo orquesta la salida.
//
// ORDEN DE PASOS:
//   1. SIEMPRE un paso de tutorial al inicio (como instalar indicadores
//      en NinjaTrader 8). El usuario aprende el proceso general antes
//      de bajar archivos especificos.
//   2. Prerrequisitos (Core, Engine) si getPrerequisites() los devuelve,
//      uno por archivo.
//   3. UN SOLO paso consolidado con TODOS los productos del usuario
//      (packs + individuales). Cada producto se renderiza como un boton
//      de descarga independiente dentro del mismo step.
//   4. Paso de cierre (tipo 'success'): reiniciar NinjaTrader 8. Sin
//      archivo, copy de recordatorio.
//
// SCHEMA DE UN PASO:
//   Prerequisite step:
//     {
//       id, type: 'prerequisite',
//       file: { url, key, version? },
//       titleKey, descriptionKey, imageKey (null por defecto)
//     }
//
//   Products step (consolidado):
//     {
//       id: 'products',
//       type: 'products',
//       files: [{ url, name, key }, ...]   // 1 o mas productos
//       titleKey, descriptionKey, imageKey (null por defecto)
//     }
//
//   Success step:
//     {
//       id: 'success',
//       type: 'success',
//       file: null,
//       titleKey, descriptionKey, imageKey
//     }
//
// imageKey queda null por defecto. Cuando agregues imagenes de instalacion:
//   1) importa el asset en imageResolver.js
//   2) agrega la entrada al imageMap
//   3) referencia la key en el campo imageKey del paso (opcional)
// =============================================================================

import {
  getPrerequisites,
  getDownloadUrl,
  getDisplayName,
  getProductCategory,
} from './downloads';

/**
 * Tipos de paso. Constantes para evitar strings sueltos.
 */
export const STEP_TYPE = {
  TUTORIAL: 'tutorial',          // siempre el primer paso
  PREREQUISITE: 'prerequisite',  // Core / Engine
  PRODUCTS: 'products',          // paso consolidado con N archivos
  SUCCESS: 'success',            // paso de cierre (reiniciar NT8)
};

/**
 * Genera la lista de pasos para el wizard de instalación a partir de los
 * productos del usuario. Devuelve un array (posiblemente vacío) en orden
 * de ejecución.
 *
 * @param {Array<{nombre_producto: string}>} productos
 *   Lista de productos del usuario (post applyUnlocks).
 * @returns {Array<Object>} Pasos del wizard, en orden.
 */
export const generateInstallationSteps = (productos) => {
  if (!Array.isArray(productos) || productos.length === 0) return [];

  const steps = [];

  // 0) Tutorial: SIEMPRE el primer paso. Enseña el proceso general de
  //    instalar indicadores en NinjaTrader 8. Sin download — el contenido
  //    es 100% i18n (substeps array). Las imagenes se referencian por
  //    key dentro del imageResolver.
  steps.push({
    id: 'tutorial',
    type: STEP_TYPE.TUTORIAL,
    titleKey: 'dashboard.installation.steps.tutorial.title',
    descriptionKey: 'dashboard.installation.steps.tutorial.intro',
    substepsKey: 'dashboard.installation.steps.tutorial.substeps',
    closingNoteKey: 'dashboard.installation.steps.tutorial.closingNote',
    importantLabelKey: 'dashboard.installation.steps.tutorial.importantLabel',
  });

  // 1) Prerrequisitos (Core / Engine segun getPrerequisites).
  //    Uno por archivo — cada uno es su propio step con su propio download.
  //    Tambien incluye nameKey para que el StepCard muestre el nombre del
  //    archivo (ej. "Logic Core V3.0.0") como titulo de la card, igual
  //    que en el paso de productos.
  const prerequisites = getPrerequisites(productos);
  prerequisites.forEach((file) => {
    steps.push({
      id: `prereq-${file.key}`,
      type: STEP_TYPE.PREREQUISITE,
      file,
      nameKey: `dashboard.installation.steps.prerequisite.${file.key}.name`,
      titleKey: `dashboard.installation.steps.prerequisite.${file.key}.title`,
      descriptionKey: `dashboard.installation.steps.prerequisite.${file.key}.description`,
      imageKey: null,
    });
  });

  // 2) UN SOLO step consolidado con TODOS los productos del usuario.
  //    Cada producto = una entrada en `files` → un boton de descarga
  //    independiente. Asi el usuario ve todos sus productos juntos
  //    en un unico paso y puede descargar los que necesite (incluyendo
  //    varios a la vez).
  const userProducts = productos.filter(
    (p) => getProductCategory(p.nombre_producto) !== 'system',
  );

  if (userProducts.length > 0) {
    const files = userProducts
      .map((prod) => {
        const url = getDownloadUrl(prod.nombre_producto);
        if (!url) return null; // sin URL resoluble -> descartar
        const name = getDisplayName(prod.nombre_producto) || prod.nombre_producto;
        return { url, name, key: prod.nombre_producto };
      })
      .filter(Boolean);

    if (files.length > 0) {
      steps.push({
        id: 'products',
        type: STEP_TYPE.PRODUCTS,
        files,
        titleKey: 'dashboard.installation.steps.products.title',
        descriptionKey: 'dashboard.installation.steps.products.description',
        imageKey: null,
      });
    }
  }

  // 3) Paso de éxito (cierre).
  steps.push({
    id: 'success',
    type: STEP_TYPE.SUCCESS,
    file: null,
    titleKey: 'dashboard.installation.steps.success.title',
    descriptionKey: 'dashboard.installation.steps.success.description',
    imageKey: null,
  });

  return steps;
};
