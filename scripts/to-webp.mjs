// Конвертер растровых ассетов из Figma в webp. Использование:
//   node scripts/to-webp.mjs <input> [output.webp] [quality]
// Берёт sharp из pnpm-стора (он есть как транзитивная зависимость Next).
import { createRequire } from "node:module";
import { readdirSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const pnpmDir = path.resolve("node_modules/.pnpm");
const sharpPkg = readdirSync(pnpmDir).find((d) => /^sharp@/.test(d));
if (!sharpPkg) throw new Error("sharp не найден в node_modules/.pnpm");
const sharp = require(path.join(pnpmDir, sharpPkg, "node_modules/sharp"));

const [input, output, quality, width] = process.argv.slice(2);
if (!input) {
  console.error("usage: node scripts/to-webp.mjs <input> [output] [quality] [maxWidth]");
  process.exit(1);
}
const out = output || input.replace(/\.(jpe?g|png)$/i, ".webp");
const q = quality ? Number(quality) : 82;

let pipeline = sharp(input);
if (width) {
  pipeline = pipeline.resize({ width: Number(width), withoutEnlargement: true });
}
const info = await pipeline.webp({ quality: q }).toFile(out);
console.log(`${input} -> ${out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
