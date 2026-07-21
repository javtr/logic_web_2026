// src/data/docs/frontmatter.js
// =============================================================================
// FRONTMATTER PARSER (custom, liviano)
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

// Extrae los headings h2 y h3 del markdown (sin renderizar).
// Útil para construir el TOC sin esperar al render.
// Devuelve un array de { level, text, slug }.
export function extractHeadings(markdown) {
  const headings = [];
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
    // rehype-slug genera slugs en kebab-case. Replicamos esa lógica acá
    // para que el TOC funcione antes del render.
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    headings.push({ level, text, slug });
  }

  return headings;
}
