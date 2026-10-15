import { useEffect, useRef } from "react";
import { m as motion, useSpring } from "framer-motion";
import Icon from "../icons/Icon.jsx";
import { Lantern, OpenBadge, Photo, RatingPill } from "./ui.jsx";
import { OrderButton, useOrder } from "./Order.jsx";
import MagicWokChef from "./MagicWokChef.jsx";
import { BUSINESS, HERO_PLATES, SERVICE } from "../data/site.js";

// The chef walks in from the right after the headline, then idles with a slow float.
// On desktop he leans 2-3 degrees toward the cursor anywhere in the hero (spring, stiffness 100,
// damping 15). Every layer animates transform or opacity only; reduced motion gets a static chef.
//   .hero-chef        entrance: slide in from +80px and fade (CSS)
//     motion.div      lean toward the cursor (framer spring on rotate)
//       .hero-chef__float   idle float (CSS), carries the image and the sparkle glow
//     .hero-chef__shadow    stays on the ground, eases in and out with the float
function HeroChef({ heroRef }) {
  const rotate = useSpring(0, { stiffness: 100, damping: 15 });
  const chefRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!hero || !fine.matches || reduce.matches) return;
    let box = null;
    const measure = () => (box = chefRef.current?.getBoundingClientRect());
    const onMove = (e) => {
      if (!box) measure();
      if (!box) return;
      // -1 (far left of the hero) .. 1 (far right), measured from the chef's centre
      const t = Math.max(-1, Math.min(1, (e.clientX - (box.left + box.width / 2)) / (hero.clientWidth * 0.6)));
      rotate.set(t * 3);
    };
    const onLeave = () => rotate.set(0);
    hero.addEventListener("pointerenter", measure);
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      hero.removeEventListener("pointerenter", measure);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, [heroRef, rotate]);

  return (
    <div className="hero-chef" ref={chefRef} aria-hidden="true">
      <span className="hero-chef__shadow" />
      <motion.div className="hero-chef__lean" style={{ rotate }}>
        <div className="hero-chef__float">
          <MagicWokChef className="hero-chef__img" alt="" eager />
          <span className="hero-chef__sparkle" />
        </div>
      </motion.div>
    </div>
  );
}

function Plates() {
  const { openDish } = useOrder();
  return (
    <div className="hero__plates">
      <p className="hero__plates-label">Most ordered</p>
      <ul className="plates">
        {HERO_PLATES.map((p) => (
          <li key={p.name}>
            <button type="button" className="plate zoom-host" onClick={() => openDish({ name: p.name, photo: p.photo })} aria-label={`${p.label}, see details`}>
              <Photo id={p.photo} alt="" sizes="112px" widths={[160, 240, 320]} className="plate__photo zoomable" />
              <span className="plate__name">{p.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Hero({ status }) {
  const heroRef = useRef(null);
  return (
    <section id="top" className="hero" aria-labelledby="hero-title" ref={heroRef}>
      <div className="hero__pattern" aria-hidden="true" />
      <Lantern className="lantern--hero-a" />
      <Lantern className="lantern--hero-b" />

      <div className="container hero__inner">
        <div className="hero__badges">
          <OpenBadge status={status} />
          <RatingPill />
        </div>

        <div className="hero__grid">
          <div className="hero__head">
            <h1 id="hero-title" className="hero__title depth">
              Magic Wok
            </h1>
            <p className="hero__sub">
              Chinese Takeaway · High Wycombe <span className="zh zh--hero" lang="zh-Hans">外卖</span>
            </p>
          </div>
          <p className="hero__line">
            <span>Cooked to order.</span> <span>Collected hot.</span> <span>Delivered to your door.</span>
          </p>

          <div className="hero__actions">
            <div className="hero__cta">
              <OrderButton />
              <a href={BUSINESS.phoneHref} className="btn btn--outline">
                <Icon name="phone" size={18} /> Call to Order
              </a>
              <a href="#menu" className="btn btn--text">
                <Icon name="utensils" size={18} /> View Menu
              </a>
            </div>
            <p className="hero__human">Call us, order online, or message us on WhatsApp. We'll take it from there.</p>
            <Plates />
          </div>
        </div>
        <HeroChef heroRef={heroRef} />
      </div>

      <div className="hero__bar">
        <div className="container hero__bar-row">
          <span>
            <Icon name="delivery" size={16} /> Delivery {SERVICE.deliveryMins} min
          </span>
          <span className="hero__bar-sep" aria-hidden="true">·</span>
          <span>
            <Icon name="pickup" size={16} /> Pickup {SERVICE.pickupMins} min
          </span>
          <span className="hero__bar-sep" aria-hidden="true">·</span>
          <a href={BUSINESS.phoneHref}>
            <Icon name="phone" size={16} /> {BUSINESS.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
