import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m as motion } from "framer-motion";
import Icon from "../icons/Icon.jsx";
import MagicWokLogo from "./MagicWokLogo.jsx";
import { Divider, Lantern, OpenBadge, Photo, Reveal, SectionHead, Seal, Stars, Zh } from "./ui.jsx";
import { OrderButton, useOrder } from "./Order.jsx";
import { MENU, HIDDEN_ZH, cleanLabel, formatPrice } from "../data/menu.js";
import {
  BUSINESS, DELIVERY_HOURS_NOTE, FAQ, FEATURED, HOURS_TEXT, IMAGES, POPULAR, RATING, RECOMMENDED, REVIEWS, SERVICE, ZH, img,
} from "../data/site.js";
import { useAutoScroll, useRevealOnce, useScrollY } from "../hooks.js";

export { Divider };

/* ---------- Featured dishes: continuous carousel on lacquer red ---------- */
function DishCard({ d, hidden }) {
  const { openDish } = useOrder();
  return (
    <li className="dish sizzle" aria-hidden={hidden || undefined}>
      <button type="button" className="dish__btn zoom-host" onClick={() => openDish(d)} tabIndex={hidden ? -1 : undefined}>
        <Photo id={d.photo} alt={hidden ? "" : d.name} sizes="220px" widths={[240, 440, 660]} className="dish__photo zoomable" />
        <span className="dish__panel">
          <span className="dish__name">{d.name}</span>
          <span className="dish__sub">{d.sub}</span>
          <span className="dish__meta">
            <span className="dish__price">{formatPrice(d.price)}</span>
            <Zh>{d.zh}</Zh>
          </span>
        </span>
      </button>
    </li>
  );
}

export function Featured() {
  const stripRef = useAutoScroll(36);
  return (
    <section id="dishes" className="section section--lacquer" aria-labelledby="dishes-title">
      <div className="container">
        <SectionHead eyebrow="Customer favourites" title="What People Order Most" zh={ZH.popular} id="dishes-title" />
      </div>
      <Reveal>
        <ul className="strip" ref={stripRef} aria-label="Popular dishes">
          {FEATURED.map((d) => (
            <DishCard key={d.name} d={d} />
          ))}
          {/* duplicate run for a seamless loop */}
          {FEATURED.map((d) => (
            <DishCard key={`dup-${d.name}`} d={d} hidden />
          ))}
        </ul>
      </Reveal>
      <div className="container strip__foot">
        <p className="strip__hint">
          <span className="only-desktop">Drag to explore, tap a dish for details</span>
          <span className="only-mobile">Swipe to explore, tap for details</span>
        </p>
        <OrderButton className="btn btn--gold btn--sm" />
      </div>
    </section>
  );
}

/* ---------- Full menu: sticky category sidebar (desktop), chips (tablet / mobile) ---------- */
const CATEGORIES = MENU.map((c) => ({ ...c, zhShown: HIDDEN_ZH.has(c.zh) ? "" : c.zh }));
const ALL_ITEMS = MENU.flatMap((c) => c.items);
const RECOMMENDED_ITEMS = RECOMMENDED.map((n) => ALL_ITEMS.find((i) => i.name === n)).filter(Boolean);

function MenuRow({ it }) {
  const { openDish } = useOrder();
  return (
    <li>
      <button type="button" className="mrow" onClick={() => openDish(it)}>
        <span className="mrow__top">
          <span className="mrow__name">
            {cleanLabel(it.name)}
            {it.v && <abbr className="veg" title="Vegetarian">V</abbr>}
            <Zh className="zh--item">{cleanLabel(it.zh)}</Zh>
            {POPULAR.has(it.name) && <span className="pill-popular">Popular</span>}
          </span>
          <span className="mrow__dots" aria-hidden="true" />
          <span className="mrow__price">{formatPrice(it.price)}</span>
        </span>
        {it.desc && <span className="mrow__desc">{it.desc}</span>}
      </button>
    </li>
  );
}

// Active category = the last one whose heading has passed the line just under the sticky bars
function useActiveCategory(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    let raf = 0;
    const compute = () => {
      const line = Math.max(window.innerHeight * 0.35, 220);
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(`cat-${id}`);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return [active, setActive];
}

export function Menu() {
  const { openDish } = useOrder();
  const ids = CATEGORIES.map((c) => c.id);
  const [active, setActive] = useActiveCategory(ids);
  const chipsRef = useRef(null);

  // keep the active chip in view on small screens
  useEffect(() => {
    const chip = chipsRef.current?.querySelector(`[data-cat="${active}"]`);
    if (chip && chipsRef.current) {
      const box = chipsRef.current;
      box.scrollTo({ left: chip.offsetLeft - box.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" });
    }
  }, [active]);

  const go = (id) => (e) => {
    e.preventDefault();
    setActive(id);
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="menu" className="section section--cream menu" aria-labelledby="menu-title">
      <div className="container">
        <SectionHead eyebrow={`${ALL_ITEMS.length} dishes, cooked to order`} title="The Menu" zh={ZH.menu} id="menu-title" />

        {/* chips: tablet and mobile */}
        <nav className="menu__chips" aria-label="Menu categories" ref={chipsRef}>
          {CATEGORIES.map((c) => (
            <a key={c.id} href={`#cat-${c.id}`} data-cat={c.id} className={`chip ${active === c.id ? "is-active" : ""}`} onClick={go(c.id)}>
              {c.title} <Zh>{c.zhShown}</Zh>
            </a>
          ))}
        </nav>

        <div className="menu__layout">
          {/* sticky sidebar: desktop */}
          <nav className="menu__side" aria-label="Menu categories">
            <ul>
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <a href={`#cat-${c.id}`} className={active === c.id ? "is-active" : ""} aria-current={active === c.id ? "true" : undefined} onClick={go(c.id)}>
                    <span>{c.title}</span> <Zh>{c.zhShown}</Zh>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="menu__main">
            <div className="reco">
              <p className="reco__title">
                Recommended for you <span aria-hidden="true">·</span> <Zh>{ZH.recommended}</Zh>
              </p>
              <ul className="reco__row">
                {RECOMMENDED_ITEMS.map((it) => (
                  <li key={it.name}>
                    <button type="button" className="reco__card" onClick={() => openDish(it)}>
                      <span className="reco__name">{cleanLabel(it.name)}</span>
                      <Zh>{cleanLabel(it.zh)}</Zh>
                      <span className="reco__price">{formatPrice(it.price)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {CATEGORIES.map((c) => (
              <section key={c.id} id={`cat-${c.id}`} className="mcat" aria-labelledby={`cat-h-${c.id}`}>
                <header className="mcat__head">
                  <h3 id={`cat-h-${c.id}`} className="mcat__title">
                    {c.title} <Zh>{c.zhShown}</Zh>
                  </h3>
                  <span className="mcat__count">{c.items.length} {c.items.length === 1 ? "dish" : "dishes"}</span>
                </header>
                <ul className="mcat__grid">
                  {c.items.map((it) => (
                    <MenuRow key={it.name + it.price} it={it} />
                  ))}
                </ul>
              </section>
            ))}

            <div className="menu__foot">
              <p className="menu__note">
                <abbr className="veg" title="Vegetarian">V</abbr> Vegetable dish. All prices include VAT. Please tell us about any allergies when you order and we will talk you through every dish.
              </p>
              <OrderButton className="btn btn--red" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Our Kitchen: wok, flame and prep, no faces ---------- */
export function About() {
  return (
    <section id="kitchen" className="section section--dark about" aria-labelledby="kitchen-title">
      <div className="about__spice" style={{ "--spice": `url(${img(IMAGES.spiceFlatlay, 900)})` }} aria-hidden="true" />
      <div className="container about__grid">
        <Reveal className="about__media">
          <div className="framed kitchen-mosaic">
            <Photo id={IMAGES.wokFlame} alt="A wok engulfed in flame over a high heat burner" sizes="(min-width: 900px) 30vw, 60vw" widths={[480, 800, 1100]} className="kitchen-mosaic__main zoomable" />
            <Photo id={IMAGES.wokKitchen} alt="Wok over a roaring flame in a working kitchen" sizes="(min-width: 900px) 20vw, 40vw" widths={[320, 560, 800]} className="kitchen-mosaic__a zoomable" />
            <Photo id={IMAGES.prep} alt="Hands chopping fresh onion on a wooden board" sizes="(min-width: 900px) 20vw, 40vw" widths={[320, 560, 800]} className="kitchen-mosaic__b zoomable" />
          </div>
        </Reveal>
        <div className="about__copy">
          <SectionHead eyebrow="Fire, timing, fresh produce" title="Our Kitchen" zh={ZH.kitchen} id="kitchen-title" />
          <Reveal as="p" className="lead" delay={80}>
            Every dish starts in a blazing hot wok the moment you order. Nothing sits under a lamp and nothing is cooked ahead.
          </Reveal>
          <Reveal as="p" delay={140}>
            Onion, ginger, garlic and spring onion are prepared fresh each day. They hit the oil first, then the flame does the rest, giving the smoky, caramelised wok hei flavour Cantonese cooking is known for. Sauces are made in our own kitchen on Amersham Road, for neighbours right across High Wycombe.
          </Reveal>
          <Reveal as="ul" className="about__facts" delay={200}>
            <li><Icon name="flame" size={22} /> Cooked to order</li>
            <li><Icon name="utensils" size={22} /> {ALL_ITEMS.length} dishes</li>
            <li><Icon name="delivery" size={22} /> Local delivery</li>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Visit / map ---------- */
const CONSENT_KEY = "magicwok-maps-consent";
const readConsent = () => {
  try {
    return localStorage.getItem(CONSENT_KEY) === "granted";
  } catch {
    return false;
  }
};

function MapConsent() {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    setAllowed(readConsent());
    const reset = () => setAllowed(readConsent());
    window.addEventListener("magicwok:consent-change", reset);
    return () => window.removeEventListener("magicwok:consent-change", reset);
  }, []);
  const allow = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "granted");
    } catch {}
    setAllowed(true);
  };
  const src = `https://www.google.com/maps?q=${encodeURIComponent(BUSINESS.mapsQuery)}&output=embed`;

  return (
    <div className="map">
      {allowed ? (
        <iframe title="Map showing Magic Wok on Amersham Road, High Wycombe" src={src} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <div className="map__placeholder">
          <Photo id={IMAGES.spiceMarket} alt="" sizes="(min-width: 900px) 50vw, 100vw" widths={[480, 800, 1200]} className="map__bg" />
          <div className="map__consent">
            <span className="map__pin"><Icon name="pin" size={28} /></span>
            <p>Google Maps sets cookies once loaded. Show the map to see exactly where we are.</p>
            <button className="btn btn--gold btn--sm" onClick={allow}>
              Show Map
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function DeliveryCard() {
  return (
    <Reveal className="deliver">
      <Seal text={ZH.delivery} className="deliver__seal" />
      <h3 className="deliver__title">
        Delivery and Pickup <Zh>{ZH.delivery}</Zh>
      </h3>
      <ul className="deliver__list">
        <li>
          <Icon name="delivery" size={24} />
          <span><strong>Delivery: approximately {SERVICE.deliveryMins} minutes</strong>, across High Wycombe</span>
        </li>
        <li>
          <Icon name="pickup" size={24} />
          <span><strong>Pickup: approximately {SERVICE.pickupMins} minutes</strong>, ready when you arrive</span>
        </li>
        <li>
          <Icon name="card" size={24} />
          <span><strong>£{SERVICE.deliveryMinOrder} minimum</strong> for delivery, £{SERVICE.deliveryCharge} delivery charge</span>
        </li>
      </ul>
      <OrderButton />
    </Reveal>
  );
}

export function Visit({ status }) {
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(BUSINESS.mapsQuery)}`;
  return (
    <section id="visit" className="section section--cream visit" aria-labelledby="visit-title">
      <div className="visit__spice" style={{ "--spice": `url(${img(IMAGES.flatlay, 900)})` }} aria-hidden="true" />
      <Lantern className="lantern--visit" />
      <div className="container visit__grid">
        <div className="visit__info">
          <SectionHead eyebrow="Collection and delivery" title="Find Us" zh={ZH.visit} id="visit-title" />
          <Reveal className="visit__block">
            <OpenBadge status={status} className="badge--light" />
          </Reveal>
          <Reveal as="address" className="visit__block visit__addr" delay={60}>
            <Icon name="pin" size={22} />
            <span>
              {BUSINESS.street}
              <br />
              {BUSINESS.town}, {BUSINESS.county} {BUSINESS.postcode}
            </span>
          </Reveal>
          <Reveal className="visit__block" delay={120}>
            <a className="visit__phone depth" href={BUSINESS.phoneHref}>
              {BUSINESS.phone}
            </a>
          </Reveal>
          <Reveal className="visit__block visit__hours" delay={180}>
            <Icon name="clock" size={22} />
            <div>
              <dl>
                {HOURS_TEXT.map((h) => (
                  <div key={h.days}>
                    <dt>{h.days}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="visit__note">{DELIVERY_HOURS_NOTE}</p>
            </div>
          </Reveal>
          <Reveal as="p" className="visit__trust" delay={200}>
            <Icon name="card" size={18} /> Card and cash both welcome
          </Reveal>
          <Reveal className="visit__cta" delay={240}>
            <a className="btn btn--dark" href={directions} target="_blank" rel="noopener">
              <Icon name="directions" size={18} /> Get Directions
            </a>
            <a className="btn btn--red" href={BUSINESS.phoneHref}>
              <Icon name="phone" size={18} /> Call Us
            </a>
          </Reveal>
        </div>
        <div className="visit__side">
          <DeliveryCard />
          <Reveal className="visit__map" delay={100}>
            <MapConsent />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Reviews (lacquer red) ---------- */
export function Reviews() {
  // Background texture only loads once the section approaches the viewport
  const [bgRef, bgShown] = useRevealOnce({ rootMargin: "400px 0px", threshold: 0 });
  return (
    <section id="reviews" ref={bgRef} className="section section--lacquer reviews" aria-labelledby="reviews-title">
      <div className="reviews__bg" style={bgShown ? { "--bg": `url(${img(IMAGES.spiceFlatlay, 1200)})` } : undefined} aria-hidden="true" />
      <div className="container">
        <SectionHead eyebrow="Local favourite" title="What High Wycombe Says" zh={ZH.reviews} id="reviews-title" />
        <Reveal className="rating">
          <span className="rating__num depth">{RATING.value}</span>
          <span>
            <Stars n={5} size={20} label={`Rated ${RATING.value} out of 5`} />
            <small>{RATING.label} reviews</small>
          </span>
        </Reveal>
        <ul className="reviews__grid">
          {REVIEWS.map((r, i) => (
            <Reveal as="li" key={i} className="review" delay={i * 80}>
              {r.sample && <span className="review__tag">Sample</span>}
              <Stars n={r.stars} />
              <blockquote>
                <p>{r.text}</p>
              </blockquote>
              <p className="review__by">
                <strong>{r.name}</strong> · {r.area}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="section section--cream" aria-labelledby="faq-title">
      <div className="container container--narrow">
        <SectionHead eyebrow="Good to know" title="Questions" zh={ZH.faq} id="faq-title" />
        <Reveal as="ul" className="faq">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className={`faq__item ${isOpen ? "is-open" : ""}`}>
                <h3>
                  <button className="faq__q" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span>{f.q}</span>
                    <Icon name="chevron" className="faq__chev" />
                  </button>
                </h3>
                <div id={`faq-${i}`} className="collapse" role="region" aria-label={f.q}>
                  <div className="collapse__inner">
                    <p className="faq__a">{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  const resetCookies = (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem(CONSENT_KEY);
    } catch {}
    window.dispatchEvent(new Event("magicwok:consent-change"));
    document.getElementById("visit")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <MagicWokLogo className="footer__logo" />
          <p className="footer__rating">
            <Stars n={5} size={14} label={`Rated ${RATING.value} out of 5`} /> Rated {RATING.value} from {RATING.label} reviews
          </p>
        </div>
        <address className="footer__col">
          <p><Icon name="pin" size={18} /> {BUSINESS.street}, {BUSINESS.town} {BUSINESS.postcode}</p>
          <p><Icon name="phone" size={18} /> <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a></p>
          <p><OrderButton className="footer__order" showCount={false} iconSize={18} /></p>
        </address>
        <div className="footer__col">
          {HOURS_TEXT.map((h) => (
            <p key={h.days}><Icon name="clock" size={18} /> {h.days}: {h.time}</p>
          ))}
        </div>
      </div>
      <div className="container footer__base">
        <ul className="footer__links">
          {/* TODO(owner): Privacy and Terms pages. Until they exist these open the cookie / contact info. */}
          <li><a href="#visit">Contact</a></li>
          <li><a href="#cookies" onClick={resetCookies}>Cookie Settings</a></li>
        </ul>
        <p className="footer__credit">
          © {new Date().getFullYear()} {BUSINESS.fullName}. Website by BOA Network
        </p>
      </div>
    </footer>
  );
}

/* ---------- Floating controls ---------- */
export function MobileBar() {
  return (
    <nav className="mobilebar" aria-label="Quick actions">
      <a href={BUSINESS.phoneHref} className="btn btn--outline-light">
        <Icon name="phone" size={18} /> Call
      </a>
      <OrderButton label="Order" />
    </nav>
  );
}

export function BackToTop() {
  const y = useScrollY();
  const [vh, setVh] = useState(800);
  useEffect(() => setVh(window.innerHeight), []);
  return (
    <AnimatePresence>
      {y > vh * 0.9 && (
        <motion.button
          className="totop"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
        >
          <Icon name="arrowUp" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ---------- Marquee: CSS keyframes, translateX(-50%), duplicated content, 40s loop, no hover pause ---------- */
const MARQUEE_NAMES = [
  "Chicken Chow Mein", "Crispy Shredded Chilli Beef", "Singapore Rice Noodles", "Salt & Pepper King Prawn",
  "Sweet & Sour Chicken Balls In Batter", "Satay Chicken On Skewers", "Salt Pepper Chicken Wings", "Cantonese Spring Rolls",
];
const MARQUEE = MARQUEE_NAMES.map((n) => ALL_ITEMS.find((i) => i.name === n)).filter(Boolean);

export function Marquee() {
  const run = (hidden) => (
    <ul className="marquee__run" aria-hidden={hidden || undefined}>
      {MARQUEE.map((m) => (
        <li key={m.name}>
          {cleanLabel(m.name)} <Zh>{cleanLabel(m.zh)}</Zh>
          <Icon name="flame" size={16} className="marquee__sep" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee" aria-label="Popular dishes">
      <div className="marquee__track">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
