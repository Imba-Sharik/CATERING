// Ресайз мастер-изображения в jpg (fit inside, без увеличения). Использование:
//   node scripts/resize-jpg.mjs <input> <output> <maxW> <maxH> [quality]
import { createRequire } from "node:module";
import { readdirSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const pnpmDir = path.resolve("node_modules/.pnpm");
const sharpPkg = readdirSync(pnpmDir).find((d) => /^sharp@/.test(d));
const sharp = require(path.join(pnpmDir, sharpPkg, "node_modules/sharp"));

const [input, output, maxW, maxH, quality] = process.argv.slice(2);
const info = await sharp(input)
  .resize({
    width: Number(maxW),
    height: Number(maxH),
    fit: "inside",
    withoutEnlargement: true,
  })
  .jpeg({ quality: quality ? Number(quality) : 90, mozjpeg: true })
  .toFile(output);
console.log(`${output}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
