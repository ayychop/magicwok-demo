import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { MENU, HIDDEN_ZH } from "./src/data/menu.js";
import { FEATURED, ZH } from "./src/data/site.js";

// Loads Ma Shan Zheng (brush script) subset to exactly the Chinese characters the site uses,
// so the CJK font costs a few KB instead of several MB.
function chineseFontSubset() {
  const text = [
    ...MENU.flatMap((c) => [HIDDEN_ZH.has(c.zh) ? "" : c.zh, ...c.items.map((i) => i.zh)]),
    ...FEATURED.map((f) => f.zh),
    ...Object.values(ZH),
  ].join("");
  const chars = [...new Set([...text].filter((ch) => /\p{Script=Han}/u.test(ch)))].join("");
  const href = `https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap&text=${encodeURIComponent(chars)}`;
  return {
    name: "chinese-font-subset",
    transformIndexHtml: { order: "pre", handler: (html) => html.replaceAll("%ZH_FONT_HREF%", href) },
  };
}

export default defineConfig({
  plugins: [react(), chineseFontSubset()],
  server: { port: 5173, host: true },
});
