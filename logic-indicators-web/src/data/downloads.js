// src/data/downloads.js
// =============================================================================
// MAPA DE URLs DE DESCARGA POR PRODUCTO
// =============================================================================
// Este archivo es la UNICA fuente de verdad para resolver la URL de descarga
// de cada producto del usuario en el Dashboard.
//
// COMO USAR:
//   import { getDownloadUrl } from '../data/downloads';
//   const url = getDownloadUrl(prod.codigo_producto); // string | null
//
// COMO AGREGAR / CAMBIAR UN PRODUCTO:
//   - Agregá una entrada en PRODUCT_DOWNLOADS con la key = codigo_producto
//     que devuelve el backend (campo productos_activos[].codigo_producto).
//   - Si querés que un producto use un CDN/proveedor diferente al resto,
//     ponele su URL completa propia. Tiene prioridad sobre el fallback.
//
// PARA CAMBIAR DE PROVEEDOR (ej. R2 -> S3):
//   - Si todos los productos van al mismo lugar nuevo, cambiá solo
//     FALLBACK_URL_TEMPLATE (deja el .zip al final si lo querés mantener).
//   - Si solo algunos productos van a otro lado, overridealos en
//     PRODUCT_DOWNLOADS con su URL completa.
//
// AGREGAR UN PRODUCTO NUEVO QUE TODAVIA NO ESTA EN EL MAPA:
//   - No hace falta tocar nada: getDownloadUrl() lo resolverá usando
//     FALLBACK_URL_TEMPLATE con el codigo_producto que mande el backend.
//     Igual te recomiendo agregarlo al mapa para tener control explícito.
// =============================================================================

/**
 * Mapa de URLs de descarga específicas por producto.
 * Key: el `codigo_producto` que viene del backend (es el slug/identificador).
 * Value: la URL completa de descarga para ese producto.
 *
 * Si un producto está acá, SIEMPRE se usa esta URL (ignora el fallback).
 */
export const PRODUCT_DOWNLOADS = {
  // Ejemplos (ajustar a los códigos reales que devuelve el backend):
  'LOGIC_PACK_BASICO':  'https://download.logicindicators.com/LOF_Suite_Beta_04.zip'
};

/**
 * Pattern de fallback para productos que NO están en PRODUCT_DOWNLOADS.
 * Usa un template string con `{codigo}` como placeholder.
 *
 * Ejemplos:
 *   'https://r2.logicindicators.com/dl/{codigo}.zip'
 *   'https://cdn.mi-nuevo-proveedor.com/indicadores/{codigo}.zip'
 */
export const FALLBACK_URL_TEMPLATE = 'https://r2.logicindicators.com/dl/{codigo}.zip';

/**
 * Resuelve la URL de descarga para un producto.
 *
 * Prioridad:
 *   1) Si el codigo está en PRODUCT_DOWNLOADS → devuelve esa URL.
 *   2) Si no, construye la URL con FALLBACK_URL_TEMPLATE reemplazando {codigo}.
 *   3) Si no hay codigo o template → devuelve null.
 *
 * @param {string|undefined|null} codigoProducto
 * @returns {string|null}
 */
export const getDownloadUrl = (codigoProducto) => {
  if (!codigoProducto) return null;

  // 1) Override específico
  if (PRODUCT_DOWNLOADS[codigoProducto]) {
    return PRODUCT_DOWNLOADS[codigoProducto];
  }

  // 2) Fallback con template (loggeamos para que sea fácil detectar
  //    productos que conviene agregar al mapa explícito)
  if (FALLBACK_URL_TEMPLATE) {
    if (typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn(
        `[downloads] No hay mapping explicito para codigo_producto="${codigoProducto}". ` +
        `Usando FALLBACK_URL_TEMPLATE. Si este producto deberia tener su propia URL, ` +
        `agregalo a PRODUCT_DOWNLOADS en src/data/downloads.js.`,
      );
    }
    return FALLBACK_URL_TEMPLATE.replace('{codigo}', codigoProducto);
  }

  // 3) Sin mapping posible
  return null;
};
