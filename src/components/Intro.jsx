import { useEffect, useState } from "react";
import MagicWokWordmark from "./MagicWokWordmark.jsx";
import MagicWokChef from "./MagicWokChef.jsx";

// First-visit intro: the Magic Wok chef rises in, nods hello,
// then the curtain lifts on the hero. The inline script in index.html decides before first paint
// whether it plays (once per browser session, never with reduced motion), by setting
// <html data-intro="play">. The whole timeline is CSS, so it also runs and ends without JS.
export const INTRO_MS = 2500;

export default function Intro() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.intro !== "play") {
      setMounted(false);
      return;
    }
    document.body.classList.add("no-scroll");
    // data-intro stays on <html>: the hero's entrance delays read it, and changing them mid-animation would jump
    const end = () => {
      document.body.classList.remove("no-scroll");
      setMounted(false);
    };
    const t = setTimeout(end, INTRO_MS);
    return () => {
      clearTimeout(t);
      document.body.classList.remove("no-scroll");
    };
  }, []);

  if (!mounted) return null;
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro__stage">
        <div className="intro__chef-rise">
          <MagicWokChef className="intro__chef" alt="" eager />
        </div>
        <MagicWokWordmark className="intro__wordmark" tone="gold" title="" />
        <p className="intro__sub">Chinese Takeaway · High Wycombe</p>
      </div>
    </div>
  );
}
