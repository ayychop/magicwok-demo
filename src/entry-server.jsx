import { renderToString } from "react-dom/server";
import { LazyMotion, domAnimation } from "framer-motion";
import App from "./App.jsx";

export function render() {
  return renderToString(
    <LazyMotion features={domAnimation} strict>
      <App />
    </LazyMotion>
  );
}
