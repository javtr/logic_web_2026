// scripts/optimize-images.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.resolve(__dirname, '../src/assets');
const SUPPORTED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp']);

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

async function getFilesRecursively(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getFilesRecursively(fullPath)));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (SUPPORTED_EXTENSIONS.has(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

async function optimizeImage(filePath) {
  const originalBuffer = await fs.readFile(filePath);
  const originalSize = originalBuffer.length;
  const ext = path.extname(filePath).toLowerCase();
  const relPath = path.relative(ASSETS_DIR, filePath);

  try {
    const image = sharp(originalBuffer);
    const metadata = await image.metadata();

    let pipeline = image;

    if (ext === '.png') {
      // Compresión PNG de alta fidelidad sin redimensionar
      pipeline = pipeline.png({
        compressionLevel: 9,
        effort: 7,
        palette: true,
        quality: 85,
      });
    } else if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({
        quality: 82,
        mozjpeg: true,
      });
    } else if (ext === '.webp') {
      pipeline = pipeline.webp({
        quality: 85,
        effort: 6,
      });
    }

    const optimizedBuffer = await pipeline.toBuffer();
    const newSize = optimizedBuffer.length;

    if (newSize < originalSize) {
      await fs.writeFile(filePath, optimizedBuffer);
      const savedBytes = originalSize - newSize;
      const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);
      console.log(
        `✓ [${metadata.width}x${metadata.height}] ${relPath}: ${formatBytes(originalSize)} → ${formatBytes(newSize)} (-${savedPercent}%)`
      );
      return {
        path: relPath,
        originalSize,
        optimizedSize: newSize,
        optimized: true,
      };
    } else {
      console.log(`- [${metadata.width}x${metadata.height}] ${relPath}: Ya optimizada (${formatBytes(originalSize)})`);
      return {
        path: relPath,
        originalSize,
        optimizedSize: originalSize,
        optimized: false,
      };
    }
  } catch (err) {
    console.error(`✗ Error optimizando ${relPath}:`, err.message);
    return {
      path: relPath,
      originalSize,
      optimizedSize: originalSize,
      error: true,
    };
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log(`Buscando imágenes en: ${ASSETS_DIR}`);
  console.log('='.repeat(60));

  const files = await getFilesRecursively(ASSETS_DIR);
  console.log(`Se encontraron ${files.length} imágenes para procesar.\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;
  let optimizedCount = 0;

  for (const file of files) {
    const result = await optimizeImage(file);
    totalOriginal += result.originalSize;
    totalOptimized += result.optimizedSize;
    if (result.optimized) optimizedCount++;
  }

  const totalSaved = totalOriginal - totalOptimized;
  const totalPercent = totalOriginal > 0 ? ((totalSaved / totalOriginal) * 100).toFixed(1) : '0.0';

  console.log('\n' + '='.repeat(60));
  console.log('RESUMEN DE OPTIMIZACIÓN');
  console.log('='.repeat(60));
  console.log(`Total de imágenes procesadas: ${files.length}`);
  console.log(`Imágenes reducidas:           ${optimizedCount}`);
  console.log(`Peso original:                ${formatBytes(totalOriginal)}`);
  console.log(`Peso optimizado:              ${formatBytes(totalOptimized)}`);
  console.log(`Ahorro total:                 ${formatBytes(totalSaved)} (-${totalPercent}%)`);
  console.log('='.repeat(60));
}

main().catch((err) => {
  console.error('Error fatal en el script:', err);
  process.exit(1);
});

