// Кроп растрового ассета в webp. Использование:
//   node scripts/crop-webp.mjs <input> <output> <left> <top> <width> <height> [resizeWidth] [quality]
import { createRequire } from "node:module";
import { readdirSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const pnpmDir = path.resolve("node_modules/.pnpm");
const sharpPkg = readdirSync(pnpmDir).find((d) => /^sharp@/.test(d));
const sharp = require(path.join(pnpmDir, sharpPkg, "node_modules/sharp"));

const [input, output, left, top, width, height, resizeWidth, quality] =
  process.argv.slice(2);

let pipeline = sharp(input).extract({
  left: Number(left),
  top: Number(top),
  width: Number(width),
  height: Number(height),
});
if (resizeWidth) pipeline = pipeline.resize({ width: Number(resizeWidth) });

const info = await pipeline.webp({ quality: quality ? Number(quality) : 82 }).toFile(output);
console.log(`${output}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
