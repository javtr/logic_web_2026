// src/data/downloads.js
// =============================================================================
// DISTRIBUCION SIMPLIFICADA — 1 pack por usuario
// =============================================================================
// En el nuevo modelo, el usuario SIEMPRE baja uno de los 3 packs (Basic,
// Full, Depth). Ya no hay descargas individuales ni archivos Core/Engine.
//
// FLUJO:
//   1. El backend manda `productos_activos` con codes (indicators + packs).
//   2. applyUnlocks() enriquece la lista con los pares (Volume Profile
//      <-> Composite, Footprint <-> Footer) para que la lista del
//      dashboard muestre ambos aunque el backend mande solo uno.
//   3. getAssignedPack() determina cuál de los 3 packs bajar según los
//      productos del usuario (ver reglas más abajo).
//   4. getDownloadFiles() devuelve la lista de archivos a bajar (0 o 1
//      item, siempre el pack asignado).
//   5. getDisplayName() resuelve el nombre visible para la lista del
//      dashboard.
//
// REGLAS DE ASIGNACION (primera que matchea gana):
//   1. user tiene LOGIC_PACK_FULL  -> 'full'
//   2. user tiene [indicator OR LOGIC_PACK_BASICO] AND LOGIC_PACK_DEPTH
//                                  -> 'full'
//   3. user tiene [indicator OR LOGIC_PACK_BASICO]
//                                  -> 'basic'
//   4. user tiene solo LOGIC_PACK_DEPTH
//                                  -> 'depth'
//   5. sin productos               -> null (sin descarga)
//
// INDICATORS: LOGIC_FOOTPRINT, LOGIC_FOOTER, LOGIC_VOLUMEPROFILE,
//             LOGIC_BIGTRADES, LOGIC_ANALYTICS, LOGIC_ALGORITHMS,
//             LOGIC_COMPOSITE.
//
// LICENCIAMIENTO: el backend sigue controlando qué indicators le funcionan
// al usuario. El pack es solo el contenedor de instalación; si el usuario
// licenció 2 de los 7 indicators, el backend le va a permitir usar solo
// esos 2 en NinjaTrader 8, no los 7.
// =============================================================================

// Set de codes de indicators que califican al usuario para el Basic Pack.
const BASIC_QUALIFIER_INDICATORS = new Set([
  'LOGIC_FOOTPRINT',
  'LOGIC_FOOTER',
  'LOGIC_VOLUMEPROFILE',
  'LOGIC_BIGTRADES',
  'LOGIC_ANALYTICS',
  'LOGIC_ALGORITHMS',
  'LOGIC_COMPOSITE',
]);

// Catalogo de los 3 packs descargables (URL + display + key).
// El `key` se usa como id interno en el wizard (no se muestra al usuario).
export const DISTRIBUTION_PACKS = {
  basic: {
    url: 'https://download.logicindicators.com/LOF_3_0/LOF_BasicPack_3.0.0.zip',
    displayName: 'Logic Pack V3.0.0',
    key: 'pack-basic',
  },
  full: {
    url: 'https://download.logicindicators.com/LOF_3_0/LOF_FullPack_3.0.0.zip',
    displayName: 'Logic Full Pack V3.0.0',
    key: 'pack-full',
  },
  depth: {
    url: 'https://download.logicindicators.com/LOF_3_0/LOF_DepthPack_3.0.0.zip',
    displayName: 'Logic Depth Pack V3.0.0',
    key: 'pack-depth',
  },
};

// Display names para los productos que el backend puede mandar en
// `productos_activos`. Se usan en la lista informativa del dashboard
// ("Tus productos"), NO en el wizard (que muestra el pack asignado).
const LICENSED_DISPLAY_NAMES = {
  'LOGIC_FOOTPRINT':     'Logic Footprint',
  'LOGIC_FOOTER':        'Logic Footer',
  'LOGIC_VOLUMEPROFILE': 'Logic Profile',
  'LOGIC_BIGTRADES':     'Logic BigTrades',
  'LOGIC_ANALYTICS':     'Logic Analytics',
  'LOGIC_ALGORITHMS':    'Logic Algorithms',
  'LOGIC_COMPOSITE':     'Logic Composite',
  'LOGIC_PACK_BASICO':   'Logic Pack V3.0.0',
  'LOGIC_PACK_DEPTH':    'Logic Depth Pack V3.0.0',
  'LOGIC_PACK_FULL':     'Logic Full Pack V3.0.0',
};

/**
 * Determina que pack debe descargar el usuario segun sus productos.
 * Retorna 'basic' | 'full' | 'depth' | null.
 *
 * Ver bloque de comentarios al inicio del archivo para las reglas
 * completas. La primera regla que matchea gana.
 *
 * @param {Array<{nombre_producto: string}>} productos
 *   Lista de productos del usuario (post applyUnlocks).
 * @returns {'basic'|'full'|'depth'|null}
 */
export const getAssignedPack = (productos) => {
  if (!Array.isArray(productos) || productos.length === 0) return null;

  const nombres = new Set(productos.map((p) => p.nombre_producto));

  // Regla 1: Full Pack comprado directo.
  if (nombres.has('LOGIC_PACK_FULL')) return 'full';

  const qualifiesForBasic =
    productos.some((p) => BASIC_QUALIFIER_INDICATORS.has(p.nombre_producto)) ||
    nombres.has('LOGIC_PACK_BASICO');

  const hasDepth = nombres.has('LOGIC_PACK_DEPTH');

  // Regla 2: Basic + Depth -> Full (combinacion que arma el Full Pack).
  if (qualifiesForBasic && hasDepth) return 'full';

  // Regla 3: Basic solo.
  if (qualifiesForBasic) return 'basic';

  // Regla 4: solo Depth Pack.
  if (hasDepth) return 'depth';

  // Regla 5: nada matchea.
  return null;
};

/**
 * Resuelve la lista de archivos a descargar para el usuario.
 * En el nuevo modelo siempre es 0 o 1 item (el pack asignado).
 *
 * @param {Array<{nombre_producto: string}>} productos
 * @returns {Array<{url: string, name: string, key: string}>}
 */
export const getDownloadFiles = (productos) => {
  const packKey = getAssignedPack(productos);
  if (!packKey) return [];
  const pack = DISTRIBUTION_PACKS[packKey];
  return [{ url: pack.url, name: pack.displayName, key: pack.key }];
};

/**
 * Resuelve el nombre visible de un producto licenciado para mostrar
 * en la lista informativa del dashboard.
 *
 * @param {string|undefined|null} nombreProducto
 * @returns {string|null}
 *   El display name si hay override, el code original si no, o null
 *   si el input es vacio.
 */
export const getDisplayName = (nombreProducto) => {
  if (!nombreProducto) return null;
  return LICENSED_DISPLAY_NAMES[nombreProducto] || nombreProducto;
};

// =============================================================================
// REGLAS DE DESBLOQUEO (unlocks)
// =============================================================================
// Hay pares de productos que se venden juntos: tener uno desbloquea al otro
// automaticamente en la lista del dashboard, sin importar si el backend lo
// manda o no.
//
//   - LOGIC_VOLUMEPROFILE <-> LOGIC_COMPOSITE
//     (Volume Profile y Composite se venden como uno solo)
//   - LOGIC_FOOTPRINT <-> LOGIC_FOOTER
//     (Footprint siempre viene con su Footer, y vice-versa)
//
// En el nuevo modelo de distribucion, los unlocks ya no afectan QUE archivo
// se descarga (siempre es 1 pack), pero siguen activos para que la lista
// del dashboard muestre ambos si el usuario licenció uno del par.
// =============================================================================
export const UNLOCKS = {
  'LOGIC_VOLUMEPROFILE': ['LOGIC_COMPOSITE'],
  'LOGIC_COMPOSITE':     ['LOGIC_VOLUMEPROFILE'],
  'LOGIC_FOOTPRINT':     ['LOGIC_FOOTER'],
  'LOGIC_FOOTER':        ['LOGIC_FOOTPRINT'],
};

/**
 * Enriquece la lista de productos del usuario aplicando las reglas de
 * desbloqueo. Si el usuario tiene LOGIC_VOLUMEPROFILE, se le agrega
 * LOGIC_COMPOSITE (y vice-versa). Lo mismo para LOGIC_FOOTPRINT <-> FOOTER.
 *
 * COMPORTAMIENTO:
 *   - No muta el array de entrada (devuelve uno nuevo).
 *   - Si el producto desbloqueado ya esta en la lista, no se duplica.
 *   - El producto sintetico hereda `fecha_expiracion` del original
 *     (mismo ciclo de vida).
 *   - Si la lista viene vacia o no es un array, la devuelve tal cual.
 *
 * @param {Array<{nombre_producto: string, fecha_expiracion: string|null}>} productos
 * @returns {Array} Nueva lista con los desbloqueos aplicados.
 */
export const applyUnlocks = (productos) => {
  if (!Array.isArray(productos) || productos.length === 0) return productos;

  const result = [...productos];

  for (const prod of productos) {
    const unlocks = UNLOCKS[prod.nombre_producto];
    if (!unlocks) continue;

    for (const unlockedCode of unlocks) {
      if (result.some((p) => p.nombre_producto === unlockedCode)) continue;
      result.push({
        ...prod,
        nombre_producto: unlockedCode,
        _unlockedFrom: prod.nombre_producto, // solo para debugging
      });
    }
  }

  return result;
};
