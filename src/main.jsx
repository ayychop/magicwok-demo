import { StrictMode } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

const app = (
  <StrictMode>
    <LazyMotion features={domAnimation} strict>
      <App />
    </LazyMotion>
  </StrictMode>
);
const root = document.getElementById("root");
// Production HTML is prerendered (scripts/prerender.mjs), so hydrate it; dev renders fresh
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
