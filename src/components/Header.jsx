import { useEffect, useState } from "react";
import { AnimatePresence, m as motion } from "framer-motion";
import MagicWokLogo from "./MagicWokLogo.jsx";
import Icon from "../icons/Icon.jsx";
import { BUSINESS } from "../data/site.js";
import { OrderButton } from "./Order.jsx";
import { useScrollY } from "../hooks.js";

export const NAV = [
  { href: "#dishes", label: "Popular" },
  { href: "#menu", label: "Menu" },
  { href: "#visit", label: "Find Us" },
  { href: "#kitchen", label: "Kitchen" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const y = useScrollY();
  const [open, setOpen] = useState(false);
  const [vh, setVh] = useState(800);
  useEffect(() => {
    const on = () => setVh(window.innerHeight);
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = y > 24;
  const showMini = y > vh * 0.85;

  return (
    <>
      <header className={`header ${solid ? "header--solid" : ""}`}>
        <div className="container header__row">
          <button
            className="icon-btn header__burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="drawer"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
          <a href="#top" className="header__logo" aria-label="MAGIC WOK, back to top">
            <MagicWokLogo className="logo" />
          </a>
          <div className="header__actions">
            <a href={BUSINESS.phoneHref} className="btn btn--ghost btn--sm header__call">
              <Icon name="phone" size={18} />
              <span>{BUSINESS.phone}</span>
            </a>
            <OrderButton className="btn btn--gold btn--sm header__order" />
          </div>
          <a href={BUSINESS.phoneHref} className="icon-btn icon-btn--gold header__phone" aria-label={`Call ${BUSINESS.phone}`}>
            <Icon name="phone" />
          </a>
        </div>

        {/* Sticky mini nav: slides down directly below the main header, no duplicate logo */}
        <AnimatePresence>
          {showMini && (
            <motion.nav
              className="mininav"
              aria-label="Sections"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="container mininav__list">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href}>{n.label}</a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="drawer"
            className="drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Main">
              <ul className="drawer__list">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} onClick={() => setOpen(false)}>
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <span onClick={() => setOpen(false)}>
              <OrderButton className="btn btn--gold drawer__call" />
            </span>
            <a href={BUSINESS.phoneHref} className="btn btn--outline drawer__call">
              <Icon name="phone" size={18} /> {BUSINESS.phone}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
