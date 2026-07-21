// src/data/docs-private/frontmatter.js
// =============================================================================
// FRONTMATTER PARSER + HEADING SLUGGER (custom, liviano)
// =============================================================================
// Parsea el bloque YAML al inicio de cada archivo .md entre líneas `---`.
//
// Formato esperado:
//   ---
//   title: Mi título
//   description: Descripción corta
//   order: 1
//   category: intro
//   ---
//
// Soporta solo scalars (string, number, boolean). Si en el futuro se necesita
// soporte para arrays/objetos en frontmatter, considerar gray-matter.
//
// El frontmatter es opcional: si el archivo no tiene, devuelve {}.
// =============================================================================

const FRONTMATTER_REGEX = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

export function parseFrontmatter(raw) {
  const match = raw.match(FRONTMATTER_REGEX);
  if (!match) {
    return { data: {}, content: raw };
  }

  const [, yamlBlock, body] = match;
  const data = {};

  // Parsear línea por línea (formato key: value simple)
  yamlBlock.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) return;

    const key = trimmed.slice(0, colonIdx).trim();
    let value = trimmed.slice(colonIdx + 1).trim();

    // Quitar comillas si las tiene
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Coercionar tipos
    if (value === 'true') data[key] = true;
    else if (value === 'false') data[key] = false;
    else if (value !== '' && !isNaN(Number(value)) && /^[\d.-]+$/.test(value)) {
      data[key] = Number(value);
    } else {
      data[key] = value;
    }
  });

  return { data, content: body };
}

// Slug-compatible con github-slugger (que usa rehype-slug internamente).
// - lowercase + trim
// - NFD normalize: separa diacríticos (á → a + ́, ñ → n + ̃, etc.)
// - remueve las combining marks
// - solo deja [a-z0-9] y espacios
// - espacios → -
// - colapsa guiones repetidos
// - trim guiones al inicio/final
//
// Maneja duplicados con sufijo -1, -2, ... (igual que github-slugger).
// Esto garantiza que los slugs precalculados acá coincidan 1:1 con
// los IDs que rehype-slug pone en el DOM, así el TOC clickeable
// siempre lleva a la sección correcta.
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function extractHeadings(markdown) {
  const headings = [];
  const seenSlugs = new Map(); // slug base → count
  const lines = markdown.split(/\r?\n/);
  let inCodeBlock = false;

  for (const line of lines) {
    // Detectar code blocks para no capturar ## dentro de código
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (!match) continue;

    const level = match[1].length;
    const text = match[2].replace(/[*_`]/g, '').trim();
    let slug = slugify(text);

    // Manejo de duplicados: si ya existe, agregar sufijo numérico
    if (seenSlugs.has(slug)) {
      const count = seenSlugs.get(slug) + 1;
      seenSlugs.set(slug, count);
      slug = `${slug}-${count}`;
    } else {
      seenSlugs.set(slug, 1);
    }

    headings.push({ level, text, slug });
  }

  return headings;
}
