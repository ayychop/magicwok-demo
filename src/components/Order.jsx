import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, m as motion } from "framer-motion";
import Icon from "../icons/Icon.jsx";
import { Photo, Seal, Zh } from "./ui.jsx";
import { MENU, cleanLabel, formatPrice } from "../data/menu.js";
import { BUSINESS, SERVICE, WHATSAPP, img, waLink } from "../data/site.js";

// Ordering stays on this site.
// TODO: Link to real ordering system once shop owner approves the new site.
// TODO: When integrating ordering system, support both sign-in AND new account creation for existing customers.

const OrderCtx = createContext(null);
export const useOrder = () => useContext(OrderCtx);

// Basket lives in this browser only (localStorage), never on a server
const CART_KEY = "magicwok-cart";
const MODE_KEY = "magicwok-cart-mode";
const MAX_QTY = 20;
const keyOf = (d) => `${d.name}|${d.price}`;
const read = (k, fallback) => {
  try {
    const v = localStorage.getItem(k);
    return v == null ? fallback : JSON.parse(v);
  } catch {
    return fallback;
  }
};
const write = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {}
};

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
    photo: d.photo ?? menu?.photo,
  };
}

const ease = [0.33, 1, 0.68, 1]; // easeOutCubic
const drawerEase = [0.16, 1, 0.3, 1];

// Nested overlays (basket -> checkout) share one scroll lock
let locks = 0;
const lockScroll = () => {
  locks += 1;
  document.body.classList.add("no-scroll");
};
const unlockScroll = () => {
  locks = Math.max(0, locks - 1);
  if (!locks) document.body.classList.remove("no-scroll");
};

// Esc to close, focus moved in, Tab kept inside, focus restored on close
function useDialog(open, onClose, ref) {
  useEffect(() => {
    if (!open) return;
    const lastFocus = document.activeElement;
    lockScroll();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => (ref.current?.querySelector("[data-autofocus]") ?? ref.current)?.focus(), 60);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      unlockScroll();
      // the button that opened us may have gone (e.g. Checkout inside the basket): fall back to a visible basket button
      const back = lastFocus?.isConnected ? lastFocus : [...document.querySelectorAll("[data-cart-button]")].find((b) => b.offsetParent);
      back?.focus?.();
    };
  }, [open, onClose, ref]);
}

// Shared modal shell: fade + scale
function Modal({ open, onClose, label, className = "", children }) {
  const cardRef = useRef(null);
  useDialog(open, onClose, cardRef);
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
            tabIndex={-1}
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

// Food photo for the modal; if it is missing or fails to load, a lacquer panel with the name in gold
function DishPhoto({ d }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [d.photo]);
  if (!d.photo || failed) {
    return (
      <div className="dishmodal__plate" role="img" aria-label={d.name}>
        <span className="dishmodal__plate-name">{d.name}</span>
        {d.zh && <span className="dishmodal__glyphs" lang="zh-Hans">{d.zh}</span>}
        <Seal />
      </div>
    );
  }
  return (
    <Photo
      id={d.photo}
      alt={d.name}
      sizes="(min-width: 768px) 450px, 100vw"
      widths={[480, 720, 960]}
      className="dishmodal__photo zoomable"
      eager
      onError={() => setFailed(true)}
    />
  );
}

function DishModal({ dish, onClose, onAdd }) {
  const [qty, setQty] = useState(1);
  useEffect(() => setQty(1), [dish]);
  const d = dish;
  return (
    <Modal open={!!d} onClose={onClose} label={d ? d.name : "Dish"} className="dishmodal">
      {d && (
        <motion.div className="dishmodal__grid" variants={stagger} initial="hidden" animate="show">
          <motion.div className="dishmodal__media" variants={item}>
            <DishPhoto d={d} />
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
              <button onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))} aria-label="Increase quantity">+</button>
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

const deliveryFee = (mode) => (mode === "delivery" ? SERVICE.deliveryCharge : 0);

function orderText(cart, subtotal, mode) {
  if (!cart.length) return WHATSAPP.greeting;
  const lines = cart.map((c) => `- ${c.qty} × ${c.name} (${formatPrice(c.price * c.qty)})`);
  const fee = deliveryFee(mode);
  return [
    "Hi Magic Wok, I'd like to order:",
    ...lines,
    ...(fee ? [`Delivery charge: ${formatPrice(fee)}`] : []),
    `Total: ${formatPrice(subtotal + fee)}`,
    "",
    "Name: ",
    `Delivery/Pickup: ${mode === "delivery" ? "Delivery" : "Pickup"}`,
    ...(mode === "delivery" ? ["Address: "] : []),
  ].join("\n");
}

function OrderModal({ open, onClose, cart, count, subtotal, mode }) {
  const fee = deliveryFee(mode);
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

        {count > 0 && (
          <motion.p variants={item} className="ordermodal__summary">
            <Icon name="basket" size={18} />
            <span>
              Your basket: {count} {count === 1 ? "item" : "items"} · <strong>{formatPrice(subtotal + fee)}</strong>
              {fee ? " incl. delivery" : ""}
            </span>
          </motion.p>
        )}

        <motion.div variants={item} className="ordermodal__actions">
          <a className="btn btn--red btn--block" href={BUSINESS.phoneHref} data-autofocus>
            <Icon name="phone" size={18} /> Call to Order · {BUSINESS.phone}
          </a>
          <a className="btn btn--wa btn--block" href={waLink(orderText(cart, subtotal, mode))} target="_blank" rel="noopener">
            <Icon name="whatsapp" size={18} /> {cart.length ? "Send my basket via WhatsApp" : "Order via WhatsApp"}
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

/* ---------- Basket drawer ---------- */
function CartLine({ c, setQty, remove }) {
  return (
    <motion.li
      className="cartline"
      initial={false}
      exit={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
      transition={{ duration: 0.28, ease }}
    >
      <div className="cartline__inner">
        {c.photo ? (
          <img className="cartline__thumb" src={img(c.photo, 160)} alt="" loading="lazy" decoding="async" />
        ) : (
          <span className="cartline__thumb cartline__thumb--plain" aria-hidden="true" />
        )}
        <div className="cartline__info">
          <p className="cartline__name">
            {c.name} <Zh>{c.zh}</Zh>
          </p>
          <p className="cartline__each">{formatPrice(c.price)} each</p>
          <span className="qty qty--sm" role="group" aria-label={`Quantity of ${c.name}`}>
            <button onClick={() => setQty(c.key, c.qty - 1)} aria-label={`One less ${c.name}`} disabled={c.qty <= 1}>−</button>
            <output aria-live="polite">{c.qty}</output>
            <button onClick={() => setQty(c.key, c.qty + 1)} aria-label={`One more ${c.name}`} disabled={c.qty >= MAX_QTY}>+</button>
          </span>
        </div>
        <div className="cartline__end">
          <button className="cartline__remove" onClick={() => remove(c.key)} aria-label={`Remove ${c.name} from basket`}>
            <Icon name="close" size={16} />
          </button>
          <span className="cartline__price">{formatPrice(c.price * c.qty)}</span>
        </div>
      </div>
    </motion.li>
  );
}

function CartDrawer({ open, onClose, cart, count, subtotal, mode, setMode, setQty, remove, clear, onCheckout }) {
  const panelRef = useRef(null);
  useDialog(open, onClose, panelRef);
  const fee = deliveryFee(mode);
  const short = mode === "delivery" && subtotal < SERVICE.deliveryMinOrder;
  const browse = () => {
    onClose();
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cart"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: drawerEase }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.aside
            ref={panelRef}
            className="cart__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            tabIndex={-1}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: drawerEase }}
          >
            <header className="cart__head">
              <h2 id="cart-title" className="cart__title">
                Your Basket <Zh>购物篮</Zh>
              </h2>
              <span className="cart__count">{count} {count === 1 ? "item" : "items"}</span>
              <button className="modal__close cart__close" onClick={onClose} aria-label="Close basket">
                <Icon name="close" />
              </button>
            </header>

            {cart.length === 0 ? (
              <div className="cart__empty">
                <span className="cart__empty-icon" aria-hidden="true"><Icon name="basket" size={36} /></span>
                <p className="cart__empty-title">Your basket is empty</p>
                <p className="cart__empty-text">Tap any dish on the menu to add it here.</p>
                <button className="btn btn--red" onClick={browse} data-autofocus>
                  <Icon name="utensils" size={18} /> Browse Menu
                </button>
              </div>
            ) : (
              <>
                <ul className="cart__list">
                  <AnimatePresence initial={false}>
                    {cart.map((c) => (
                      <CartLine key={c.key} c={c} setQty={setQty} remove={remove} />
                    ))}
                  </AnimatePresence>
                </ul>

                <footer className="cart__foot">
                  <div className="cart__mode" role="radiogroup" aria-label="Delivery or pickup">
                    {["delivery", "pickup"].map((m) => (
                      <button key={m} role="radio" aria-checked={mode === m} className={mode === m ? "is-active" : ""} onClick={() => setMode(m)}>
                        <Icon name={m} size={16} /> {m === "delivery" ? "Delivery" : "Pickup"}
                      </button>
                    ))}
                  </div>
                  <dl className="cart__sums">
                    <div><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
                    <div>
                      <dt>{mode === "delivery" ? "Delivery fee" : "Pickup"}</dt>
                      <dd>{fee ? formatPrice(fee) : "Free"}</dd>
                    </div>
                    <div className="cart__total"><dt>Total</dt><dd>{formatPrice(subtotal + fee)}</dd></div>
                  </dl>
                  {short && (
                    <p className="cart__hint">
                      Delivery needs a £{SERVICE.deliveryMinOrder} minimum, add {formatPrice(SERVICE.deliveryMinOrder - subtotal)} more or choose pickup.
                    </p>
                  )}
                  <div className="cart__actions">
                    <button className="btn btn--gold btn--block" onClick={onCheckout} data-autofocus>
                      Checkout · {formatPrice(subtotal + fee)}
                    </button>
                    <a className="btn btn--wa-outline btn--block" href={waLink(orderText(cart, subtotal, mode))} target="_blank" rel="noopener">
                      <Icon name="whatsapp" size={18} /> Order via WhatsApp
                    </a>
                  </div>
                  <button className="cart__clear" onClick={clear}>Clear basket</button>
                </footer>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function OrderProvider({ children }) {
  const [orderOpen, setOrderOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [dish, setDish] = useState(null);
  const [cart, setCart] = useState([]);
  const [mode, setMode] = useState("delivery");
  const [toast, setToast] = useState(null);
  const [bump, setBump] = useState(0);
  const [restored, setRestored] = useState(false);

  // restore a saved basket after hydration, then keep it saved (per-browser convenience only);
  // saving waits for the restore so the empty first render never overwrites a saved basket
  useEffect(() => {
    const saved = read(CART_KEY, []);
    if (Array.isArray(saved)) setCart(saved.filter((c) => c && c.key && c.qty > 0));
    if (read(MODE_KEY, "delivery") === "pickup") setMode("pickup");
    setRestored(true);
  }, []);
  useEffect(() => {
    if (restored) write(CART_KEY, cart);
  }, [cart, restored]);
  useEffect(() => {
    if (restored) write(MODE_KEY, mode);
  }, [mode, restored]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const add = useCallback((d, qty) => {
    const key = keyOf(d);
    setCart((c) => {
      const hit = c.find((x) => x.key === key);
      if (hit) return c.map((x) => (x.key === key ? { ...x, qty: Math.min(MAX_QTY, x.qty + qty) } : x));
      return [...c, { key, name: d.name, zh: d.zh, price: Number(d.price), qty, photo: d.photo ?? null }];
    });
    setDish(null);
    setBump((b) => b + 1);
    setToast({ id: Date.now(), text: `Added ${qty > 1 ? `${qty} × ` : ""}${d.name} to your basket` });
  }, []);
  const setQty = useCallback(
    (key, qty) => setCart((c) => (qty <= 0 ? c.filter((x) => x.key !== key) : c.map((x) => (x.key === key ? { ...x, qty: Math.min(MAX_QTY, qty) } : x)))),
    []
  );
  const remove = useCallback((key) => setCart((c) => c.filter((x) => x.key !== key)), []);
  const clear = useCallback(() => setCart([]), []);

  const count = cart.reduce((n, c) => n + c.qty, 0);
  const subtotal = cart.reduce((n, c) => n + c.qty * c.price, 0);

  const value = useMemo(
    () => ({
      openOrder: () => setOrderOpen(true),
      openCart: () => setCartOpen(true),
      openDish: (d) => setDish(toDish(d)),
      count,
      subtotal,
      bump,
    }),
    [count, subtotal, bump]
  );
  const closeOrder = useCallback(() => setOrderOpen(false), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const closeDish = useCallback(() => setDish(null), []);
  const checkout = useCallback(() => {
    setCartOpen(false);
    setOrderOpen(true);
  }, []);

  return (
    <OrderCtx.Provider value={value}>
      {children}
      <DishModal dish={dish} onClose={closeDish} onAdd={add} />
      <CartDrawer
        open={cartOpen}
        onClose={closeCart}
        cart={cart}
        count={count}
        subtotal={subtotal}
        mode={mode}
        setMode={setMode}
        setQty={setQty}
        remove={remove}
        clear={clear}
        onCheckout={checkout}
      />
      <OrderModal open={orderOpen} onClose={closeOrder} cart={cart} count={count} subtotal={subtotal} mode={mode} />
      <div className="toast-region" role="status" aria-live="polite">
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              className="toast"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25, ease }}
            >
              <Icon name="basket" size={18} className="toast__icon" />
              <span>{toast.text}</span>
              <button onClick={() => { setToast(null); setCartOpen(true); }}>View basket</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </OrderCtx.Provider>
  );
}

// Basket icon with a gold count badge; pulses each time something is added
export function CartButton({ className = "" }) {
  const { openCart, count, bump } = useOrder();
  return (
    <button
      type="button"
      className={`cartbtn ${className}`}
      onClick={openCart}
      data-cart-button
      aria-label={count ? `Basket, ${count} ${count === 1 ? "item" : "items"}` : "Basket, empty"}
    >
      <motion.span
        key={bump}
        className="cartbtn__icon"
        initial={{ scale: 1 }}
        animate={bump ? { scale: [1, 1.22, 1] } : undefined}
        transition={{ duration: 0.45, ease }}
      >
        <Icon name="basket" size={22} />
      </motion.span>
      {count > 0 && (
        <span className="cartbtn__badge" aria-hidden="true">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}

// Every "Order" button in the site uses this, so none of them leave the site
export function OrderButton({ className = "btn btn--gold", label = "Order Online", iconSize = 18 }) {
  const { openOrder } = useOrder();
  return (
    <button type="button" className={className} onClick={openOrder}>
      <Icon name="pickup" size={iconSize} />
      <span>{label}</span>
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
