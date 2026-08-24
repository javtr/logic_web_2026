// src/data/installation.js
// =============================================================================
// Generador de pasos para el wizard de instalación del dashboard.
//
// En el modelo simplificado de distribución, todos los usuarios con
// productos reciben UN SOLO pack para descargar (Basic / Full / Depth).
// No hay mas Core/Engine como prereq, ni multiples downloads por usuario.
//
// La logica de que pack le corresponde al usuario vive en
// `getAssignedPack()` en downloads.js — este modulo solo orquesta
// la salida del wizard.
//
// ORDEN DE PASOS (3 pasos, siempre):
//   1. Tutorial: como instalar indicadores en NinjaTrader 8.
//   2. Pack asignado: 1 FileCard con el archivo del pack (0 si el
//      usuario no tiene productos).
//   3. Cierre: reiniciar NinjaTrader 8.
//
// SCHEMA DE UN PASO:
//   Tutorial step:
//     {
//       id: 'tutorial',
//       type: 'tutorial',
//       titleKey, descriptionKey, substepsKey,
//       closingNoteKey, importantLabelKey,
//     }
//
//   Products step:
//     {
//       id: 'products',
//       type: 'products',
//       files: [{ url, name, key }],  // 0 o 1 archivo
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
// =============================================================================

import { getDownloadFiles } from './downloads';

/**
 * Tipos de paso. Constantes para evitar strings sueltos.
 */
export const STEP_TYPE = {
  TUTORIAL: 'tutorial',
  PRODUCTS: 'products',
  SUCCESS: 'success',
};

/**
 * Genera la lista de pasos para el wizard a partir de los productos
 * del usuario. Devuelve un array (posiblemente vacio) en orden de
 * ejecucion.
 *
 * @param {Array<{nombre_producto: string}>} productos
 *   Lista de productos del usuario (post applyUnlocks).
 * @returns {Array<Object>} Pasos del wizard, en orden.
 */
export const generateInstallationSteps = (productos) => {
  if (!Array.isArray(productos) || productos.length === 0) return [];

  const steps = [];

  // 1) Tutorial: SIEMPRE el primer paso. Enseña el proceso general de
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

  // 2) Pack asignado al usuario. En el modelo simplificado siempre es
  //    UN solo archivo (0 si el usuario no tiene productos, pero en ese
  //    caso generateInstallationSteps ya retorno [] arriba).
  const downloadFiles = getDownloadFiles(productos);
  if (downloadFiles.length > 0) {
    steps.push({
      id: 'products',
      type: STEP_TYPE.PRODUCTS,
      files: downloadFiles,
      titleKey: 'dashboard.installation.steps.products.title',
      descriptionKey: 'dashboard.installation.steps.products.description',
      imageKey: null,
    });
  }

  // 3) Paso de cierre: reiniciar NT8.
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
