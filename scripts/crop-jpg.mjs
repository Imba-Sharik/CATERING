// Кроп в jpg. Использование:
//   node scripts/crop-jpg.mjs <input> <output> <left> <top> <w> <h> [quality]
import { createRequire } from "node:module";
import { readdirSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const pnpmDir = path.resolve("node_modules/.pnpm");
const sharpPkg = readdirSync(pnpmDir).find((d) => /^sharp@/.test(d));
const sharp = require(path.join(pnpmDir, sharpPkg, "node_modules/sharp"));

const [input, output, left, top, w, h, quality] = process.argv.slice(2);
const info = await sharp(input)
  .extract({ left: +left, top: +top, width: +w, height: +h })
  .jpeg({ quality: quality ? +quality : 92, mozjpeg: true })
  .toFile(output);
console.log(`${output}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
