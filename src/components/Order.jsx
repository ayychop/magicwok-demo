import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, m as motion } from "framer-motion";
import Icon from "../icons/Icon.jsx";
import { Photo, Seal, Zh } from "./ui.jsx";
import { MENU, cleanLabel, formatPrice } from "../data/menu.js";
import { BUSINESS, FEATURED, SERVICE, WHATSAPP, waLink } from "../data/site.js";

// Ordering stays on this site.
// TODO: Link to real ordering system once shop owner approves the new site.
// TODO: When integrating ordering system, support both sign-in AND new account creation for existing customers.

const OrderCtx = createContext(null);
export const useOrder = () => useContext(OrderCtx);

const CART_KEY = "magicwok-cart";
const keyOf = (d) => `${d.name}|${d.price}`;

// Dish photos we have (featured dishes); other dishes show a typographic panel instead of
// a photo of something else.
const PHOTO_BY_NAME = Object.fromEntries(FEATURED.map((f) => [f.menuName ?? f.name, f.photo]));
const MENU_BY_NAME = Object.fromEntries(MENU.flatMap((c) => c.items.map((i) => [i.name, { ...i, category: c.title }])));

// Normalise anything clickable (featured card or menu row) into one dish shape
export function toDish(d) {
  const menu = MENU_BY_NAME[d.menuName ?? d.name];
  return {
    name: cleanLabel(menu?.name ?? d.name),
    zh: cleanLabel(menu?.zh ?? d.zh ?? ""),
    desc: menu?.desc || d.desc || d.sub || "",
    price: menu?.price ?? d.price,
    v: menu?.v ?? d.v,
    category: menu?.category,
    photo: d.photo ?? PHOTO_BY_NAME[d.menuName ?? d.name],
  };
}

const ease = [0.33, 1, 0.68, 1]; // easeOutCubic

// Shared modal shell: fade + scale, Esc to close, focus moved in and restored on close
function Modal({ open, onClose, label, className = "", children }) {
  const cardRef = useRef(null);
  const lastFocus = useRef(null);
  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement;
    document.body.classList.add("no-scroll");
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && cardRef.current) {
        const f = cardRef.current.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => cardRef.current?.querySelector("[data-autofocus]")?.focus(), 60);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
      lastFocus.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            ref={cardRef}
            className={`modal__card ${className}`}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease }}
          >
            <button className="modal__close" onClick={onClose} aria-label="Close">
              <Icon name="close" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease } },
};

function DishModal({ dish, onClose, onAdd }) {
  const [qty, setQty] = useState(1);
  useEffect(() => setQty(1), [dish]);
  const d = dish;
  return (
    <Modal open={!!d} onClose={onClose} label={d ? d.name : "Dish"} className="dishmodal">
      {d && (
        <motion.div className="dishmodal__grid" variants={stagger} initial="hidden" animate="show">
          <motion.div className="dishmodal__media" variants={item}>
            {d.photo ? (
              <Photo id={d.photo} alt={d.name} sizes="(min-width: 900px) 450px, 100vw" widths={[480, 720, 960]} className="dishmodal__photo zoomable" eager />
            ) : (
              <div className="dishmodal__plate" aria-hidden="true">
                <span className="dishmodal__glyphs" lang="zh-Hans">{d.zh || "镬气"}</span>
                <Seal />
              </div>
            )}
          </motion.div>
          <div className="dishmodal__body">
            {d.category && <motion.p className="eyebrow" variants={item}>{d.category}</motion.p>}
            <motion.h2 className="dishmodal__name" variants={item}>
              {d.name} <Zh>{d.zh}</Zh>
            </motion.h2>
            {d.desc && <motion.p className="dishmodal__desc" variants={item}>{d.desc}</motion.p>}
            {d.v && <motion.p className="dishmodal__tag" variants={item}><abbr className="veg" title="Vegetarian">V</abbr> Vegetable dish</motion.p>}
            <motion.p className="dishmodal__price" variants={item}>
              {formatPrice(d.price)} <small>per portion</small>
            </motion.p>
            <motion.div className="qty" variants={item} role="group" aria-label="Quantity">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" disabled={qty <= 1}>−</button>
              <output aria-live="polite">{qty}</output>
              <button onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Increase quantity">+</button>
            </motion.div>
            <motion.button variants={item} className="btn btn--gold btn--block" data-autofocus onClick={() => onAdd(d, qty)}>
              Add to Cart · {formatPrice(d.price * qty)}
            </motion.button>
            <motion.p className="dishmodal__note" variants={item}>
              Cooked to order · Pickup in about {SERVICE.pickupMins} min
            </motion.p>
            <motion.a variants={item} className="dishmodal__wa" href={waLink(`${WHATSAPP.greeting}\n\n${qty} x ${d.name}`)} target="_blank" rel="noopener">
              <Icon name="whatsapp" size={16} /> Order via WhatsApp
            </motion.a>
          </div>
        </motion.div>
      )}
    </Modal>
  );
}

function orderText(cart, total) {
  if (!cart.length) return WHATSAPP.greeting;
  const lines = cart.map((c) => `${c.qty} x ${c.name} (${formatPrice(c.price * c.qty)})`);
  return `${WHATSAPP.greeting}\n\n${lines.join("\n")}\n\nTotal: ${formatPrice(total)}\nCollection or delivery: `;
}

function OrderModal({ open, onClose, cart, total, setQty, clear }) {
  return (
    <Modal open={open} onClose={onClose} label="Order" className="ordermodal">
      <motion.div variants={stagger} initial="hidden" animate="show">
        <motion.div variants={item} className="ordermodal__head">
          <Seal text="外卖" />
          <div>
            <p className="eyebrow">Order</p>
            <h2 className="ordermodal__title">Online ordering coming soon</h2>
          </div>
        </motion.div>
        <motion.p variants={item} className="ordermodal__lead">
          Our new ordering system is being set up. For now, call or WhatsApp us and we'll take your order personally.
        </motion.p>

        {cart.length > 0 && (
          <motion.div variants={item} className="basket">
            <p className="basket__title">Your order</p>
            <ul>
              {cart.map((c) => (
                <li key={c.key}>
                  <span className="basket__name">{c.name} <Zh>{c.zh}</Zh></span>
                  <span className="qty qty--sm" role="group" aria-label={`Quantity of ${c.name}`}>
                    <button onClick={() => setQty(c.key, c.qty - 1)} aria-label={`Remove one ${c.name}`}>−</button>
                    <output>{c.qty}</output>
                    <button onClick={() => setQty(c.key, c.qty + 1)} aria-label={`Add one ${c.name}`}>+</button>
                  </span>
                  <span className="basket__price">{formatPrice(c.price * c.qty)}</span>
                </li>
              ))}
            </ul>
            <p className="basket__total">
              <span>Total</span> <strong>{formatPrice(total)}</strong>
            </p>
            {total < SERVICE.deliveryMinOrder && (
              <p className="basket__hint">Delivery orders have a £{SERVICE.deliveryMinOrder} minimum.</p>
            )}
            <button className="basket__clear" onClick={clear}>Clear order</button>
          </motion.div>
        )}

        <motion.div variants={item} className="ordermodal__actions">
          <a className="btn btn--red btn--block" href={BUSINESS.phoneHref} data-autofocus>
            <Icon name="phone" size={18} /> Call to Order · {BUSINESS.phone}
          </a>
          <a className="btn btn--wa btn--block" href={waLink(orderText(cart, total))} target="_blank" rel="noopener">
            <Icon name="whatsapp" size={18} /> {cart.length ? "Send this order via WhatsApp" : "Order via WhatsApp"}
          </a>
        </motion.div>
        <motion.ul variants={item} className="ordermodal__facts">
          <li><Icon name="delivery" size={18} /> Delivery about {SERVICE.deliveryMins} min · Pickup about {SERVICE.pickupMins} min</li>
          <li><Icon name="clock" size={18} /> Ordering for later or for a group? Tell us the time and send the whole list in one message.</li>
        </motion.ul>
      </motion.div>
    </Modal>
  );
}

export function OrderProvider({ children }) {
  const [orderOpen, setOrderOpen] = useState(false);
  const [dish, setDish] = useState(null);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState("");

  // restore a saved basket (per-browser convenience only)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      if (Array.isArray(saved)) setCart(saved);
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const add = useCallback((d, qty) => {
    const key = keyOf(d);
    setCart((c) => {
      const hit = c.find((x) => x.key === key);
      if (hit) return c.map((x) => (x.key === key ? { ...x, qty: Math.min(20, x.qty + qty) } : x));
      return [...c, { key, name: d.name, zh: d.zh, price: Number(d.price), qty }];
    });
    setDish(null);
    setToast(`${qty} x ${d.name} added`);
  }, []);
  const setQty = useCallback((key, qty) => setCart((c) => (qty <= 0 ? c.filter((x) => x.key !== key) : c.map((x) => (x.key === key ? { ...x, qty: Math.min(20, qty) } : x)))), []);
  const clear = useCallback(() => setCart([]), []);

  const count = cart.reduce((n, c) => n + c.qty, 0);
  const total = cart.reduce((n, c) => n + c.qty * c.price, 0);

  const value = useMemo(
    () => ({ openOrder: () => setOrderOpen(true), openDish: (d) => setDish(toDish(d)), count, total }),
    [count, total]
  );
  const closeOrder = useCallback(() => setOrderOpen(false), []);
  const closeDish = useCallback(() => setDish(null), []);

  return (
    <OrderCtx.Provider value={value}>
      {children}
      <DishModal dish={dish} onClose={closeDish} onAdd={add} />
      <OrderModal open={orderOpen} onClose={closeOrder} cart={cart} total={total} setQty={setQty} clear={clear} />
      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease }}
          >
            <span>{toast}</span>
            <button onClick={() => { setToast(""); setOrderOpen(true); }}>View order</button>
          </motion.div>
        )}
      </AnimatePresence>
    </OrderCtx.Provider>
  );
}

// Every "Order" button in the site uses this, so none of them leave the site
export function OrderButton({ className = "btn btn--gold", label = "Order Online", showCount = true, iconSize = 18 }) {
  const { openOrder, count } = useOrder();
  return (
    <button type="button" className={className} onClick={openOrder}>
      <Icon name="pickup" size={iconSize} />
      <span>{label}</span>
      {showCount && count > 0 && <span className="count" aria-label={`${count} items in your order`}>{count}</span>}
    </button>
  );
}

// Always visible on desktop; on phones it appears after the hero so it never covers the hero bar
export function WhatsAppOrb() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 899px)");
    const on = () => setShow(!mq.matches || window.scrollY > window.innerHeight * 0.85);
    on();
    window.addEventListener("scroll", on, { passive: true });
    mq.addEventListener("change", on);
    return () => {
      window.removeEventListener("scroll", on);
      mq.removeEventListener("change", on);
    };
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          className="wa-orb"
          href={waLink()}
          target="_blank"
          rel="noopener"
          aria-label="Order via WhatsApp"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25, ease }}
        >
          <Icon name="whatsapp" size={26} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
