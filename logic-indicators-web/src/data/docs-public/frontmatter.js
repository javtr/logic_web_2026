// src/data/docs-public/frontmatter.js
// =============================================================================
// FRONTMATTER PARSER (custom, liviano) — COPIA para el módulo público
// =============================================================================
// Idéntico a docs-private/frontmatter.js. Se duplica físicamente para
// mantener cada módulo (público/privado) autocontenido — sin imports
// cruzados, sin riesgo de que un cambio en el parser de un lado rompa
// el otro.
//
// Si en el futuro se quiere un parser único compartido, mover a
// src/data/docs-shared/frontmatter.js y re-importar.
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

export function extractHeadings(markdown) {
  const headings = [];
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
