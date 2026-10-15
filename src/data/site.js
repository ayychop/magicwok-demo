// Magic Wok business facts. Sources, checked 15 Oct 2026:
//   [web]   the shop's ordering site https://magicwokwycombe.co.uk (store feed + schema.org data)
//   [flyer] the printed menu, public/logo-reference.png (July 2020, older, used only where noted)
// Edit values here and the whole site updates.

export const BUSINESS = {
  name: "Magic Wok",
  fullName: "Magic Wok Chinese Takeaway",
  street: "122 Amersham Road", // [web]
  town: "High Wycombe",
  county: "Buckinghamshire",
  postcode: "HP13 5AB", // [web] and [flyer]
  phone: "01494 440678", // [web] and [flyer]
  phoneHref: "tel:+441494440678",
  geo: { lat: 51.643603, lng: -0.73393 }, // [web]
  mapsQuery: "Magic Wok Chinese Takeaway, 122 Amersham Road, High Wycombe HP13 5AB",
};

// Ordering stays on this site. Until the new system is live, "Order" opens a modal offering
// phone or WhatsApp (see components/Order.jsx).
// TODO: Link to real ordering system once shop owner approves the new site.
// TODO: When integrating ordering system, support both sign-in AND new account creation for existing customers.
export const WHATSAPP = {
  number: "447921654755", // +44 7921 654755
  display: "07921 654755",
  greeting: "Hi Magic Wok, I'd like to place an order.",
};
export const waLink = (text = WHATSAPP.greeting) => `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(text)}`;

// [web] aggregateRating on their ordering site: 4.6 from 736 reviews
export const RATING = { value: 4.6, count: 736, label: "700+" };

// [web] Ordering system estimates and charges
export const SERVICE = {
  deliveryMins: 75,
  pickupMins: 30,
  deliveryMinOrder: 16, // £16 minimum order for delivery
  deliveryCharge: 2, // £2 delivery charge
  card: true, // card_payment: YES
  cash: true, // cash_payment: ENABLED
};

// [web] Opening hours (collection / restaurant). Europe/London, 24h.
// Days use JS numbering: 0 = Sunday ... 6 = Saturday. null = closed.
// This drives the live OPEN/CLOSED badge.
export const HOURS = {
  0: { open: "17:00", close: "21:45" },
  1: { open: "17:00", close: "21:45" },
  2: null,
  3: { open: "17:00", close: "21:45" },
  4: { open: "17:00", close: "21:45" },
  5: { open: "16:30", close: "22:30" },
  6: { open: "16:30", close: "22:30" },
};

export const HOURS_TEXT = [
  { days: "Mon, Wed, Thu, Sun", time: "5:00pm to 9:45pm" },
  { days: "Friday and Saturday", time: "4:30pm to 10:30pm" },
  { days: "Tuesday", time: "Closed" },
];
// [web] Delivery stops a little earlier on the shorter days
export const DELIVERY_HOURS_NOTE = "Delivery until 9:30pm Sunday to Thursday, 10:30pm Friday and Saturday.";
export const HOURS_SHORT = "OPEN 6 DAYS · CLOSED TUE";

// Section labels in Chinese (standard terms) shown beside the English headings
export const ZH = {
  popular: "人气推荐",
  menu: "菜单",
  kitchen: "厨房",
  visit: "地址",
  delivery: "外卖",
  recommended: "推荐",
  reviews: "好评",
  faq: "常见问题",
  seal: "镬气", // "wok hei", the breath of the wok
};

const u = (id, w = 800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=72`;
export const img = u;

// Unsplash photography (no images are taken from the shop's current site, no people's faces)
export const IMAGES = {
  hero: "1523905330026-b8bd1f5f320e", // dumplings in a bamboo steamer, natural steam, dark
  wokFlame: "1717321302149-3c6c9c76de67", // wok engulfed in flame, hands only
  wokKitchen: "1723967052599-93403a001bb1", // wok over the burner in a working kitchen
  prep: "1690944250252-71a40fa6fccf", // hands chopping onion
  flatlay: "1506368249639-73a05d6f6488", // spices on spoons
  spiceMarket: "1532336414038-cf19250c5757",
  spiceFlatlay: "1596040033229-a9821ebd058d", // dried chillies, cinnamon, seeds
};

// The shop's own "Recommended for you" list [web]; the first four get a Popular badge in the menu
export const RECOMMENDED = [
  "Egg Fried Rice (Normal)",
  "Chicken Chow Mein",
  "Sweet & Sour Chicken Balls In Batter",
  "Crispy Shredded Chilli Beef",
  "Satay Chicken On Skewers",
];
export const POPULAR = new Set(RECOMMENDED.slice(0, 4));

// Most ordered dishes. Names, Chinese labels and prices are the shop's own [web];
// the five marked `popular` come from their "Recommended for you" list.
export const FEATURED = [
  { name: "Chicken Chow Mein", zh: "鸡面", price: "7.60", sub: "Wok tossed egg noodles", photo: "1585032226651-759b368d7246", popular: true },
  { name: "Sweet & Sour Chicken Balls", menuName: "Sweet & Sour Chicken Balls In Batter", zh: "鸡球", price: "7.80", sub: "In crisp batter", photo: "1525755662778-989d0524087e", popular: true },
  { name: "Salt & Pepper Chicken Wings", menuName: "Salt Pepper Chicken Wings", zh: "椒盐鸡翅", price: "6.90", sub: "Chilli, garlic, spring onion", photo: "1569058242253-92a9c755a0ec" },
  { name: "Cantonese Spring Rolls", zh: "春卷", price: "5.30", sub: "Golden and crisp", photo: "1606525437679-037aca74a3e9" },
  { name: "Egg Fried Rice", menuName: "Egg Fried Rice (Normal)", zh: "蛋炒饭", price: "4.90", sub: "The essential side", photo: "1603133872878-684f208fb84b", popular: true },
  { name: "Chicken Dumplings (6)", menuName: "Chicken Dumpling With Sweet & Sour Sauce (6)", zh: "鸡饺", price: "6.30", sub: "With sweet & sour sauce", photo: "1563245372-f21724e3856d" },
  { name: "Singapore Rice Noodles", zh: "星米", price: "7.90", sub: "Egg, shrimp, roast pork, chicken", photo: "1626804475297-41608ea09aeb" },
  { name: "Salt & Pepper Chips", zh: "椒盐条", price: "4.90", sub: "Onion, pepper, chilli", photo: "1630384060421-cb20d0e0649d" },
];

// TODO(owner): PLACEHOLDER REVIEWS, written for layout only. They are NOT real customers.
// Each card shows a "Sample" tag while `sample: true`. Replace with genuine reviews
// (first name + initial, with permission) and remove `sample` before launch.
// Publishing invented reviews as real is unlawful in the UK (DMCC Act 2024).
export const REVIEWS = [
  { name: "Sample customer", area: "Totteridge", stars: 5, sample: true, text: "Food arrived piping hot and the salt and pepper chicken wings were perfect, proper wok flavour. Our new Friday night order." },
  { name: "Sample customer", area: "Downley", stars: 5, sample: true, text: "Rang through our order, picked up thirty minutes later and it was ready and waiting. Generous portions and the chow mein is the best in Wycombe." },
  { name: "Sample customer", area: "Terriers", stars: 4, sample: true, text: "Fresh, not greasy, and great value. Singapore noodles have a real kick. Delivery took a while on a Saturday but worth the wait." },
  { name: "Sample customer", area: "Hazlemere", stars: 5, sample: true, text: "Crispy duck was spot on and the sweet and sour sauce tastes homemade. Lovely to have a reliable local Chinese." },
];

export const FAQ = [
  { q: "Do you deliver?", a: "Yes, delivery available across High Wycombe, usually in around 75 minutes. Call 01494 440678 or WhatsApp us to order." },
  { q: "Can I collect?", a: "Yes, collection available and usually ready in around 30 minutes. Preorder by phone or WhatsApp for pickup." },
  { q: "Is there a minimum order?", a: "Delivery orders have a £16 minimum and a £2 delivery charge. Your total is confirmed at checkout." },
  { q: "Do you have vegetarian options?", a: "Yes, we have a full section of vegetable dishes and several more can be made vegetarian. Just ask when ordering." },
  { q: "Can I order ahead or for a group?", a: "Yes. Tell us the time you would like when you call or message, and for a group just send the whole list in one WhatsApp message." },
  { q: "Do you take card payments?", a: "Yes, card and cash accepted." },
];
