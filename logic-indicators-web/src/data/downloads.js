// src/data/downloads.js
// =============================================================================
// MAPA DE URLs DE DESCARGA POR PRODUCTO
// =============================================================================
// Este archivo es la UNICA fuente de verdad para resolver la URL de descarga
// de cada producto del usuario en el Dashboard.
//
// La KEY del mapa es el `nombre_producto` (lo que ve el usuario en la card
// del Dashboard), NO el `codigo_producto` (clave interna de licenciamiento
// que el usuario no debe ver). Asi, para agregar un override, copias el
// nombre tal cual aparece en el dashboard.
//
// COMO USAR:
//   import { getDownloadUrl } from '../data/downloads';
//   const url = getDownloadUrl(prod.nombre_producto); // string | null
//
// COMO AGREGAR / CAMBIAR UN PRODUCTO:
//   1. Mirá en el dashboard qué nombre tiene el producto (es lo que ve
//      el usuario en la card de "Tus Productos").
//   2. Agregá una entrada en PRODUCT_DOWNLOADS con ESE string exacto como
//      key (respetando mayusculas, acentos, espacios, etc.).
//   3. Ponele la URL completa que quieras.
//
// PARA CAMBIAR DE PROVEEDOR (ej. R2 -> S3):
//   - Si todos los productos van al mismo lugar nuevo, cambiá solo
//     FALLBACK_URL_TEMPLATE.
//   - Si solo algunos productos van a otro lado, overridealos en
//     PRODUCT_DOWNLOADS con su URL completa.
//
// SI UN PRODUCTO NO ESTA EN EL MAPA:
//   - getDownloadUrl() lo resolvera usando FALLBACK_URL_TEMPLATE.
//     Te recomiendo agregarlo al mapa para tener control explicito y
//     evitar el warn() en consola.
// =============================================================================

/**
 * Mapa de URLs de descarga por producto.
 * Key: el `nombre_producto` que viene del backend y se muestra en la card.
 *      Tiene que matchear EXACTAMENTE (case-sensitive, con acentos y espacios).
 * Value: la URL completa de descarga para ese producto.
 */
export const PRODUCT_DOWNLOADS = {
  // Ejemplos (ajustar a los nombres reales que devuelve el backend):
  'LOGIC_PACK_BASICO':  'https://download.logicindicators.com/LOF_Suite_Beta_04.zip'
};

/**
 * Pattern de fallback para productos que NO estan en PRODUCT_DOWNLOADS.
 * Usa `{nombre}` como placeholder — se reemplaza por una version
 * "slug" del nombre (lowercase, sin acentos, con guiones).
 *
 * Ejemplos:
 *   'https://r2.logicindicators.com/dl/{nombre}.zip'
 *   'https://cdn.mi-nuevo-proveedor.com/indicadores/{nombre}.zip'
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
    if (typeof console !== 'undefined') {
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
