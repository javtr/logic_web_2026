// src/data/docs-public/frontmatter.js
// =============================================================================
// FRONTMATTER PARSER + HEADING SLUGGER (custom, liviano) — MÓDULO PÚBLICO
// =============================================================================
// Idéntico en estructura al de docs-private. Ver docs-private/frontmatter.js
// para la documentación completa del algoritmo de slug (github-slugger
// compatible con NFD + manejo de duplicados).
// =============================================================================

const FRONTMATTER_REGEX = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

export function parseFrontmatter(raw) {
  const match = raw.match(FRONTMATTER_REGEX);
  if (!match) {
    return { data: {}, content: raw };
  }

  const [, yamlBlock, body] = match;
  const data = {};

  yamlBlock.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) return;

    const key = trimmed.slice(0, colonIdx).trim();
    let value = trimmed.slice(colonIdx + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

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
