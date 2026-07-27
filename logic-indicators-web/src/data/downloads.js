// src/data/downloads.js
// =============================================================================
// CONFIGURACION DE PRODUCTOS DEL DASHBOARD
// =============================================================================
// Fuente unica de verdad para resolver dos cosas de cada producto del
// usuario en el Dashboard:
//
//   1. La URL de descarga        → ver PRODUCT_DOWNLOADS / getDownloadUrl
//   2. El nombre visible en la UI → ver PRODUCT_DISPLAY_NAMES / getDisplayName
//
// La KEY de ambos mapas es el `nombre_producto` que viene del backend
// (es lo que el usuario ve en la card si no hay override). NO es el
// `codigo_producto` (clave interna de licenciamiento que el usuario
// no debe ver).
//
// COMO USAR:
//   import { getDownloadUrl, getDisplayName } from '../data/downloads';
//   const url    = getDownloadUrl(prod.nombre_producto);   // string | null
//   const nombre = getDisplayName(prod.nombre_producto);   // string | null
//
// PARA AGREGAR / CAMBIAR UN PRODUCTO:
//   1. Mirá en el dashboard qué nombre tiene el producto.
//   2. Agregá una entrada en PRODUCT_DOWNLOADS y/o PRODUCT_DISPLAY_NAMES
//      con ESE string exacto como key (case-sensitive, con acentos).
//   3. Ponele la URL y/o el nombre visible que quieras.
//
// PARA CAMBIAR DE PROVEEDOR (ej. R2 -> S3):
//   - Si todos van al mismo lugar, cambiá solo FALLBACK_URL_TEMPLATE.
//   - Si solo algunos, overridealos en PRODUCT_DOWNLOADS con su URL.
//
// PARA RENOMBRAR UN PRODUCTO EN LA UI:
//   - Agregá entrada en PRODUCT_DISPLAY_NAMES con el nombre original
//     como key y el nombre que querés mostrar como value.
//   - El backend queda intacto; el cambio es solo cosmético.
// =============================================================================

/**
 * Mapa de URLs de descarga por producto.
 * Key: el `nombre_producto` que viene del backend.
 * Value: la URL completa de descarga para ese producto.
 */
export const PRODUCT_DOWNLOADS = {
  'LOGIC_PACK_BASICO':  'https://download.logicindicators.com/LOF_Suite_Beta_04.zip'
};

/**
 * Mapa de nombres visibles custom para el dashboard.
 * Key: el `nombre_producto` que viene del backend (tal cual).
 * Value: el texto que querés que vea el usuario en la card.
 *
 * Si el nombre original ya está bien, no hace falta agregar entrada.
 * getDisplayName() hace fallback al nombre original.
 */
export const PRODUCT_DISPLAY_NAMES = {
  'LOGIC_PACK_BASICO':  'Logic Pack Beta V04'
};

/**
 * Pattern de fallback para productos que NO estan en PRODUCT_DOWNLOADS.
 * Usa `{nombre}` como placeholder — se reemplaza por una version
 * "slug" del nombre (lowercase, sin acentos, con guiones).
 */
export const FALLBACK_URL_TEMPLATE = 'https://r2.logicindicators.com/dl/{nombre}.zip';

/**
 * Resuelve la URL de descarga para un producto, dado su nombre.
 *
 * Prioridad:
 *   1) Si el nombre está en PRODUCT_DOWNLOADS → devuelve esa URL.
 *   2) Si no, construye la URL con FALLBACK_URL_TEMPLATE reemplazando
 *      {nombre} por una version slug del nombre.
 *   3) Si no hay nombre o template → devuelve null.
 *
 * @param {string|undefined|null} nombreProducto
 * @returns {string|null}
 */
export const getDownloadUrl = (nombreProducto) => {
  if (!nombreProducto) return null;

  // 1) Override específico
  if (PRODUCT_DOWNLOADS[nombreProducto]) {
    return PRODUCT_DOWNLOADS[nombreProducto];
  }

  // 2) Fallback con template
  if (FALLBACK_URL_TEMPLATE) {
    if (import.meta.env.DEV && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn(
        `[downloads] No hay mapping explicito para nombre_producto="${nombreProducto}". ` +
        `Usando FALLBACK_URL_TEMPLATE. Si este producto deberia tener su propia URL, ` +
        `agregalo a PRODUCT_DOWNLOADS en src/data/downloads.js.`,
      );
    }
    // Slug-ificamos el nombre para generar URLs razonables.
    // Ej: "Logic Footprint" -> "logic-footprint"
    const slug = nombreProducto
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // sin acentos
      .replace(/[^a-z0-9]+/g, '-')                      // separadores -> "-"
      .replace(/^-+|-+$/g, '');                          // trim
    return FALLBACK_URL_TEMPLATE.replace('{nombre}', slug);
  }

  // 3) Sin mapping posible
  return null;
};

/**
 * Resuelve el nombre visible para mostrar en el dashboard.
 *
 * Prioridad:
 *   1) Si el nombre está en PRODUCT_DISPLAY_NAMES → devuelve ese override.
 *   2) Si no, devuelve el nombre original (el que vino del backend).
 *   3) Si el input es null/undefined → devuelve null.
 *
 * @param {string|undefined|null} nombreProducto
 * @returns {string|null}
 */
export const getDisplayName = (nombreProducto) => {
  if (!nombreProducto) return null;
  return PRODUCT_DISPLAY_NAMES[nombreProducto] || nombreProducto;
};
