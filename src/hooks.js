import { useEffect, useRef, useState } from "react";
import { HOURS } from "./data/site.js";

// Fires once: adds `is-in` the first time the element enters the viewport, then disconnects.
export function useRevealOnce(options = { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShown(true);
        io.disconnect();
      }
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);
  return [ref, shown];
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const toMin = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const fmt12 = (hhmm) => {
  let [h, m] = hhmm.split(":").map(Number);
  h = h % 24;
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return m ? `${h12}:${String(m).padStart(2, "0")}${suffix}` : `${h12}${suffix}`;
};

function londonNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t)?.value;
  const day = DAY_NAMES.indexOf(get("weekday"));
  const hh = get("hour");
  const mm = get("minute");
  return { day, minutes: Number(hh) * 60 + Number(mm), clock: `${hh}:${mm}` };
}

export function computeStatus(hours = HOURS) {
  const { day, minutes, clock } = londonNow();
  const today = hours[day];
  const yesterday = hours[(day + 6) % 7];

  // Still open from yesterday's past midnight session
  if (yesterday && toMin(yesterday.close) > 1440 && minutes < toMin(yesterday.close) - 1440) {
    return { open: true, clock, closesAt: fmt12(yesterday.close) };
  }
  if (today && minutes >= toMin(today.open) && minutes < toMin(today.close)) {
    return { open: true, clock, closesAt: fmt12(today.close) };
  }
  if (today && minutes < toMin(today.open)) {
    return { open: false, clock, opensAt: fmt12(today.open) };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    if (hours[d]) {
      const label = i === 1 ? "TOMORROW " : `${DAY_NAMES[d].toUpperCase()} `;
      return { open: false, clock, opensAt: label + fmt12(hours[d].open) };
    }
  }
  return { open: false, clock, opensAt: null };
}

// Live status in Europe/London, re-evaluated at the top of every minute.
export function useOpenStatus() {
  const [status, setStatus] = useState(null);
  useEffect(() => {
    let interval;
    const tick = () => setStatus(computeStatus());
    tick();
    const align = setTimeout(() => {
      tick();
      interval = setInterval(tick, 60_000);
    }, 60_000 - (Date.now() % 60_000));
    return () => {
      clearTimeout(align);
      clearInterval(interval);
    };
  }, []);
  return status;
}

// Continuous carousel: scrolls at a constant speed and loops seamlessly over a duplicated
// track. It does NOT pause on hover. Mouse users can drag; touch users get native swipe with
// scroll snap (auto scroll steps aside while a finger is down, then resumes). It also rests
// while keyboard focus is inside, when off screen, and for prefers-reduced-motion.
export function useAutoScroll(speed = 40) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pos = el.scrollLeft;
    let last = 0;
    let raf = 0;
    let visible = true;
    let dragging = false;
    let touching = false;
    let focused = false;
    let resumeTimer = 0;
    let startX = 0, startLeft = 0, moved = false;

    const half = () => el.scrollWidth / 2;
    const wrap = () => {
      const h = half();
      if (h <= 0) return;
      if (pos >= h) pos -= h;
      if (pos < 0) pos += h;
    };
    const running = () => !reduce && visible && !dragging && !touching && !focused && !document.hidden;

    const frame = (t) => {
      const dt = last ? Math.min(t - last, 64) / 1000 : 0;
      last = t;
      if (running()) {
        el.classList.add("is-auto");
        pos += speed * dt;
        wrap();
        el.scrollLeft = pos;
      } else {
        el.classList.remove("is-auto");
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    // Keep our position in sync with manual scrolling (wheel, swipe, keyboard)
    const onScroll = () => {
      if (!running()) {
        pos = el.scrollLeft;
        if (!touching) {
          wrap();
          if (Math.abs(el.scrollLeft - pos) > 1) el.scrollLeft = pos;
        }
      }
    };

    const onTouchStart = () => {
      touching = true;
      clearTimeout(resumeTimer);
    };
    const onTouchEnd = () => {
      clearTimeout(resumeTimer);
      // let the snap settle, then carry on from wherever the user left it
      resumeTimer = setTimeout(() => {
        touching = false;
        pos = el.scrollLeft;
        last = 0;
      }, 2500);
    };

    const onDown = (e) => {
      if (e.pointerType !== "mouse") return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
    };
    const onMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      // only a real drag disables card clicks; a plain click must still reach the card
      if (!moved && Math.abs(dx) > 4) {
        moved = true;
        el.classList.add("is-dragging");
      }
      if (!moved) return;
      pos = startLeft - dx;
      wrap();
      el.scrollLeft = pos;
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      last = 0;
      el.classList.remove("is-dragging");
    };
    const onClick = (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    const onFocusIn = (e) => (focused = e.target.matches(":focus-visible"));
    const onFocusOut = () => (focused = false);

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClick, true);
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resumeTimer);
      io.disconnect();
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClick, true);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
    };
  }, [speed]);
  return ref;
}

export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return y;
}
