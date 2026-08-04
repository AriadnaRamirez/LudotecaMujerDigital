import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const distIndex = resolve("dist/index.html");
const dist404 = resolve("dist/404.html");

if (!existsSync(distIndex)) {
  console.error("No se encontró dist/index.html. Ejecuta el build primero.");
  process.exit(1);
}

copyFileSync(distIndex, dist404);
console.log("SPA fallback: dist/404.html listo para GitHub Pages.");
