// Injects the server rendered app into dist/index.html so the page paints before JS loads.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const { render } = await import(pathToFileURL(path.join(root, "dist-ssr/entry-server.js")).href);
const file = path.join(root, "dist/index.html");
const html = fs.readFileSync(file, "utf8").replace('<div id="root"></div>', `<div id="root">${render()}</div>`);
fs.writeFileSync(file, html);
fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
console.log("prerendered dist/index.html");
