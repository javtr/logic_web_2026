// src/data/downloads.js
// =============================================================================
// CONFIGURACION DE PRODUCTOS DEL DASHBOARD
// =============================================================================
// Fuente unica de verdad para resolver, de cada producto del usuario:
//
//   1. La URL de descarga        → ver PRODUCTS / getDownloadUrl
//   2. El nombre visible en la UI → ver PRODUCTS / getDisplayName
//   3. La categoria (pack/individual/system) → ver getProductCategory
//
// La KEY de PRODUCTS es el `nombre_producto` que viene del backend
// (es lo que el usuario ve en la card si no hay override). NO es el
// `codigo_producto` (clave interna de licenciamiento que el usuario
// no debe ver).
//
// ESTRUCTURA DE UN PRODUCTO:
//   {
//     url:         string  (requerido) — URL completa de descarga
//     displayName: string  (opcional)  — override del nombre en la UI
//     category:    'pack' | 'individual' | 'system'  (requerido)
//   }
//
// CATEGORIAS:
//   - 'pack'       → producto bundle autocontenido (no requiere system base)
//   - 'individual' → indicador suelto (requiere system base)
//   - 'system'     → archivo de sistema base (configurations + engine).
//                    No es un producto que el usuario compra; es un
//                    prerequisito que el dashboard muestra automaticamente
//                    cuando el usuario tiene al menos un individual activo.
//
// COMO USAR:
//   import { getDownloadUrl, getDisplayName, getProductCategory, isSystemProduct, SYSTEM_PRODUCTS }
//     from '../data/downloads';
//
//   const url      = getDownloadUrl(prod.nombre_producto);   // string | null
//   const nombre   = getDisplayName(prod.nombre_producto);   // string | null
//   const category = getProductCategory(prod.nombre_producto);// 'pack'|'individual'|'system'|'unknown'
//   const isSys    = isSystemProduct(prod.nombre_producto);  // boolean
//
// PARA AGREGAR / CAMBIAR UN PRODUCTO:
//   1. Mirá en el dashboard qué nombre tiene el producto.
//   2. Agregá una entrada en PRODUCTS con ESE string exacto como key
//      (case-sensitive, con acentos).
//   3. Completá url + category. displayName es opcional.
//
// PARA RENOMBRAR UN PRODUCTO EN LA UI:
//   - Agregá/modificá `displayName` en la entrada de PRODUCTS.
//   - El backend queda intacto; el cambio es solo cosmético.
// =============================================================================

/**
 * Categorias de producto. Constantes para evitar strings sueltos
 * por el código. Si agregás una categoría nueva, también tenés
 * que contemplarla en getProductCategory() (devolver string literal).
 */
export const PRODUCT_CATEGORY = {
  PACK: 'pack',
  INDIVIDUAL: 'individual',
  SYSTEM: 'system',
};

/**
 * Productos del sistema. El dashboard los renderiza automaticamente
 * como prerequisito cuando el usuario tiene indicadores individuales
 * activos y ningun pack activo.
 *
 * El orden del array define el orden de visualizacion.
 */
export const SYSTEM_PRODUCTS = ['LOGIC_CONFIGURATIONS', 'LOGIC_ENGINE'];

/**
 * Archivo Core del sistema. Unico, estatico, sin clave de producto.
 * Lo descarga TODO usuario con al menos un producto (activo o vencido)
 * antes de instalar cualquier otro archivo del suite.
 *
 * No es un producto del backend: no aparece en productos_activos.
 * El dashboard lo renderiza como pre-requisito universal dentro del
 * card de "Tus Productos", en la misma sub-seccion donde antes se
 * listaban los productos del sistema.
 */
export const CORE_FILE = {
  url: 'https://download.logicindicators.com/LOF_Core_Beta_05_02.zip',
  version: 'Beta V05.02',
  required: true,
};

/**
 * Catalogo de productos. Cada key es el `nombre_producto` que viene
 * del backend. Ver comentario al inicio del archivo para la forma
 * del value.
 */
export const PRODUCTS = {
  'LOGIC_PACK_BASICO':    { url: 'https://download.logicindicators.com/LOF_Suite_Beta_05_02.zip', displayName: 'Logic Pack Beta V05.02', category: 'pack' },
  'LOGIC_PACK_DEPTH':     { url: 'https://download.logicindicators.com/LOF_Suite_Depth_Beta_02.zip', displayName: 'Logic Depth Pack V0.1', category: 'pack' },
  'LOGIC_FOOTPRINT':      { url: 'https://download.logicindicators.com/lof_footprint.zip',  category: 'individual' },
  'LOGIC_FOOTER':         { url: 'https://download.logicindicators.com/lof_footer.zip',     category: 'individual' },
  'LOGIC_VOLUMEPROFILE':  { url: 'https://download.logicindicators.com/lof_profile.zip',     category: 'individual' },
  'LOGIC_BIGTRADES':      { url: 'https://download.logicindicators.com/lof_bigtrades.zip',   category: 'individual' },
  'LOGIC_ANALYTICS':      { url: 'https://download.logicindicators.com/lof_analytics.zip',   category: 'individual' },
  'LOGIC_ALGORITHMS':     { url: 'https://download.logicindicators.com/lof_algorithms.zip',  category: 'individual' },
  'LOGIC_COMPOSITE':      { url: 'https://download.logicindicators.com/lof_composite.zip',   category: 'individual' },
  'LOGIC_CONFIGURATIONS': { url: 'https://download.logicindicators.com/lof_configurations.zip', displayName: 'Configurations', category: 'system' },
  'LOGIC_ENGINE':         { url: 'https://download.logicindicators.com/lof_engine.zip',         displayName: 'Engine',         category: 'system' },
};

/**
 * Pattern de fallback para productos que NO estan en PRODUCTS.
 * Usa `{nombre}` como placeholder — se reemplaza por una version
 * "slug" del nombre (lowercase, sin acentos, con guiones).
 */
export const FALLBACK_URL_TEMPLATE = 'https://r2.logicindicators.com/dl/{nombre}.zip';

/**
 * Resuelve la URL de descarga para un producto, dado su nombre.
 *
 * Prioridad:
 *   1) Si el nombre está en PRODUCTS → devuelve PRODUCTS[nombre].url.
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
  const product = PRODUCTS[nombreProducto];
  if (product?.url) {
    return product.url;
  }

  // 2) Fallback con template
  if (FALLBACK_URL_TEMPLATE) {
    if (import.meta.env.DEV && typeof console !== 'undefined') {
      console.warn(
        `[downloads] No hay mapping explicito para nombre_producto="${nombreProducto}". ` +
        `Usando FALLBACK_URL_TEMPLATE. Si este producto deberia tener su propia URL, ` +
        `agregalo a PRODUCTS en src/data/downloads.js.`,
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
 *   1) Si el nombre está en PRODUCTS con `displayName` → devuelve ese override.
 *   2) Si no, devuelve el nombre original (el que vino del backend).
 *   3) Si el input es null/undefined → devuelve null.
 *
 * @param {string|undefined|null} nombreProducto
 * @returns {string|null}
 */
export const getDisplayName = (nombreProducto) => {
  if (!nombreProducto) return null;
  return PRODUCTS[nombreProducto]?.displayName || nombreProducto;
};

/**
 * Devuelve la categoría de un producto.
 *
 * @param {string|undefined|null} nombreProducto
 * @returns {'pack'|'individual'|'system'|'unknown'}
 *   - 'unknown' si el nombre no esta catalogado en PRODUCTS.
 */
export const getProductCategory = (nombreProducto) => {
  if (!nombreProducto) return 'unknown';
  return PRODUCTS[nombreProducto]?.category || 'unknown';
};

/**
 * Helper de conveniencia: true si el producto es del sistema base.
 *
 * @param {string|undefined|null} nombreProducto
 * @returns {boolean}
 */
export const isSystemProduct = (nombreProducto) => {
  return getProductCategory(nombreProducto) === 'system';
};

// =============================================================================
// REGLAS DE DESBLOQUEO (unlocks)
// =============================================================================
// Hay pares de productos que se venden juntos: tener uno desbloquea al otro
// automaticamente en el dashboard, sin importar si el backend lo manda o no.
//
//   - LOGIC_VOLUMEPROFILE <-> LOGIC_COMPOSITE
//     (Volume Profile y Composite se venden como uno solo)
//   - LOGIC_FOOTPRINT <-> LOGIC_FOOTER
//     (Footprint siempre viene con su Footer, y vice-versa)
//
// Estas son las unicas excepciones al modelo "1 producto = 1 entrada en
// productos_activos". Todo lo nuevo va por packs. Si en el futuro se agregan
// mas pares, solo hay que anadir entradas a este mapa.
//
// SIMETRIA: ambos lados del par desbloquean al otro. Si llega solo
// VOLUMEPROFILE, se agrega COMPOSITE. Si llega solo COMPOSITE, se
// agrega VOLUMEPROFILE. Lo mismo para FOOTPRINT/FOOTER.
// =============================================================================
export const UNLOCKS = {
  'LOGIC_VOLUMEPROFILE': ['LOGIC_COMPOSITE'],
  'LOGIC_COMPOSITE':     ['LOGIC_VOLUMEPROFILE'],
  'LOGIC_FOOTPRINT':     ['LOGIC_FOOTER'],
  'LOGIC_FOOTER':        ['LOGIC_FOOTPRINT'],
};

/**
 * Enriquece la lista de productos del usuario aplicando las reglas de
 * desbloqueo. Si el usuario tiene LOGIC_VOLUMEPROFILE, esta funcion le
 * agrega LOGIC_COMPOSITE a la lista (y vice-versa). Lo mismo para
 * LOGIC_FOOTPRINT <-> LOGIC_FOOTER.
 *
 * COMPORTAMIENTO:
 *   - No muta el array de entrada (devuelve uno nuevo).
 *   - Si el producto desbloqueado ya esta en la lista (vino del backend
 *     con ambos codigos), no se duplica.
 *   - El producto sintetico hereda la `fecha_expiracion` del original:
 *     mismo ciclo de vida. Si el original vence, el desbloqueado tambien.
 *   - Si la lista viene vacia o no es un array, la devuelve tal cual.
 *
 * @param {Array<{nombre_producto: string, fecha_expiracion: string|null}>} productos
 * @returns {Array} Nueva lista con los desbloqueos aplicados.
 */
export const applyUnlocks = (productos) => {
  if (!Array.isArray(productos) || productos.length === 0) return productos;

  // Trabajamos sobre una copia para no mutar el array del backend.
  const result = [...productos];

  for (const prod of productos) {
    const unlocks = UNLOCKS[prod.nombre_producto];
    if (!unlocks) continue;

    for (const unlockedCode of unlocks) {
      // Si el producto ya esta en la lista (caso comun: el backend lo
      // mando junto con el original), no duplicar.
      if (result.some((p) => p.nombre_producto === unlockedCode)) continue;

      // Sintetizar el producto desbloqueado, heredando la expiracion
      // del original (venden juntos, mismo ciclo de vida).
      result.push({
        ...prod,
        nombre_producto: unlockedCode,
        _unlockedFrom: prod.nombre_producto,  // solo para debugging
      });
    }
  }

  return result;
};
