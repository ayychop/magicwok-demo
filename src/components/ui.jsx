import { useRevealOnce } from "../hooks.js";
import { HOURS_SHORT, RATING, ZH, img } from "../data/site.js";
import Icon from "../icons/Icon.jsx";

export function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...rest }) {
  const [ref, shown] = useRevealOnce();
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={delay ? { "--reveal-delay": `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function OpenBadge({ status, className = "" }) {
  if (!status) {
    // Prerendered placeholder until the live Europe/London status is computed on mount
    return (
      <p className={`badge badge--pending ${className}`} role="status" aria-live="polite">
        <span className="badge__dot" aria-hidden="true" />
        <span>{HOURS_SHORT}</span>
      </p>
    );
  }
  return (
    <p
      className={`badge ${status.open ? "badge--open" : "badge--closed"} ${className}`}
      role="status"
      aria-live="polite"
      title={status.open ? `Closes at ${status.closesAt}` : undefined}
    >
      <span className="badge__dot" aria-hidden="true" />
      {status.open ? (
        <span>OPEN NOW · {status.clock}</span>
      ) : (
        <span>CLOSED{status.opensAt ? ` · OPENS ${/^\d/.test(status.opensAt) ? "AT " : ""}${status.opensAt}` : ""}</span>
      )}
    </p>
  );
}

export function Stars({ n = 5, size = 16, label }) {
  return (
    <span className="stars" role="img" aria-label={label ?? `${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const on = i <= Math.round(n);
        return <Icon key={i} name="star" size={size} filled={on} className={on ? "star--on" : "star--off"} />;
      })}
    </span>
  );
}

// Trust badges link to Reviews. The rating is the shop's Foodhub score, so the label says
// "reviews", not Google.
export const REVIEWS_LABEL = `Rated ${RATING.value} from ${RATING.label} reviews. Read our reviews`;

// Smooth scroll to Reviews (instant with reduced motion), then pulse its heading once the
// scroll arrives so the click visibly lands. Falls back to the plain #reviews jump without JS.
export function goToReviews(e) {
  const section = document.getElementById("reviews");
  if (!section) return;
  e?.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  section.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  if (location.hash !== "#reviews") history.pushState(null, "", "#reviews");

  let fired = false;
  const flash = () => {
    if (fired) return;
    fired = true;
    window.removeEventListener("scrollend", flash);
    section.classList.remove("is-flash");
    void section.offsetWidth; // restart the animation on repeat clicks
    section.classList.add("is-flash");
    setTimeout(() => section.classList.remove("is-flash"), 1100);
  };
  if (reduce) flash();
  else {
    window.addEventListener("scrollend", flash, { once: true });
    setTimeout(flash, 1200); // already in place (no scroll), or no scrollend support
  }
}

// "4.6 ★★★★★ · 700+ reviews", links to the Reviews section
export function RatingPill({ className = "" }) {
  return (
    <a href="#reviews" className={`rating-pill trust-link ${className}`} onClick={goToReviews} aria-label={REVIEWS_LABEL}>
      <strong>{RATING.value}</strong>
      <Stars n={5} size={14} />
      <span>· {RATING.label} reviews</span>
    </a>
  );
}

// Warm amber tint, +5% saturation and a faint vignette (see .photo in styles.css)
export function Photo({ id, alt, sizes = "100vw", widths = [400, 640, 960, 1280], eager = false, className = "", onError }) {
  return (
    <div className={`photo ${className}`}>
      <img
        src={img(id, widths[1] ?? widths[0])}
        srcSet={widths.map((w) => `${img(id, w)} ${w}w`).join(", ")}
        sizes={sizes}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        fetchpriority={eager ? "high" : undefined}
        decoding="async"
        draggable="false"
        onError={onError}
      />
    </div>
  );
}

// Chinese label: English first, Chinese smaller and muted beside it
export function Zh({ children, className = "" }) {
  if (!children) return null;
  return (
    <span className={`zh ${className}`} lang="zh-Hans">
      {children}
    </span>
  );
}

// Red chop seal with gold characters, set slightly askew like a hand stamp
export function Seal({ text = ZH.seal, className = "" }) {
  const chars = [...text];
  return (
    <span className={`seal ${chars.length > 1 ? "seal--two" : ""} ${className}`} lang="zh-Hans" aria-hidden="true">
      {chars.map((c, i) => (
        <span key={i}>{c}</span>
      ))}
    </span>
  );
}

export function SectionHead({ eyebrow, title, zh, id, seal = true }) {
  return (
    <Reveal className="section-head">
      {seal && <Seal className="section-head__seal" />}
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="h2 depth">
        {title} <Zh className="zh--h2">{zh}</Zh>
      </h2>
    </Reveal>
  );
}

// Calligraphic dry brush stroke
export function BrushStroke({ className = "" }) {
  return (
    <svg className={`brush ${className}`} viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6 21C30 14 70 9 122 8C168 7 220 8 268 10C318 12 362 15 394 19C388 22 374 23 356 24C318 27 276 29 230 30C178 31 126 32 82 31C52 30 26 29 10 27C3 26 1 23 6 21Z"
      />
      <path fill="currentColor" opacity=".55" d="M40 12C120 6 240 6 330 12C250 10 140 10 40 14Z" />
      <path fill="currentColor" opacity=".45" d="M60 31C150 35 260 33 340 27C270 31 160 33 60 33Z" />
      <path fill="currentColor" opacity=".35" d="M300 22C330 22 360 21 386 20C362 23 330 24 300 24Z" />
    </svg>
  );
}

export function Divider({ className = "" }) {
  return (
    <div className={`divider ${className}`} role="presentation">
      <BrushStroke className="divider__brush" />
      <Seal className="divider__seal" />
      <BrushStroke className="divider__brush divider__brush--flip" />
    </div>
  );
}

// Paper lantern with a soft warm glow. Decorative, kept at low opacity in CSS.
export function Lantern({ className = "", style }) {
  return (
    <svg className={`lantern ${className}`} style={style} viewBox="0 0 120 260" aria-hidden="true">
      <defs>
        <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#FFB45C" stopOpacity=".55" />
          <stop offset="1" stopColor="#FFB45C" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lanternBody" cx="45%" cy="40%" r="65%">
          <stop offset="0" stopColor="#E0563A" />
          <stop offset=".6" stopColor="#A52A2A" />
          <stop offset="1" stopColor="#5E1210" />
        </radialGradient>
      </defs>
      <line x1="60" y1="0" x2="60" y2="52" stroke="#C9A34E" strokeWidth="1.5" />
      <circle cx="60" cy="120" r="60" fill="url(#lanternGlow)" />
      <rect x="44" y="50" width="32" height="10" rx="2" fill="#C9A34E" />
      <ellipse cx="60" cy="120" rx="46" ry="58" fill="url(#lanternBody)" />
      <g fill="none" stroke="#C9A34E" strokeOpacity=".55" strokeWidth="1.2">
        <path d="M60 62v116" />
        <path d="M44 64c-12 18-12 94 0 112M76 64c12 18 12 94 0 112" />
        <path d="M30 72c-14 22-14 74 0 96M90 72c14 22 14 74 0 96" />
      </g>
      <rect x="44" y="176" width="32" height="10" rx="2" fill="#C9A34E" />
      <path d="M60 186v14" stroke="#C9A34E" strokeWidth="2" />
      <path d="M54 200h12l-2 52h-8z" fill="#A52A2A" opacity=".85" />
    </svg>
  );
}

// A pair of lacquered chopsticks resting across a frame corner
export function Chopsticks({ className = "" }) {
  return (
    <svg className={`chopsticks ${className}`} viewBox="0 0 220 220" aria-hidden="true">
      <path d="M10 188L200 14l6 6L22 200z" fill="#2B140E" />
      <path d="M10 188l30 -27 6 6 -24 33z" fill="#C9A34E" />
      <path d="M30 206L212 40l5 6L40 214z" fill="#3A1A12" />
      <path d="M30 206l29 -26 5 6 -24 28z" fill="#C9A34E" />
    </svg>
  );
}

export function Fuse({ from, to }) {
  return <div className="fuse" style={{ "--from": `var(--${from})`, "--to": `var(--${to})` }} aria-hidden="true" />;
}
