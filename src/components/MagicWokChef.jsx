// This is the ONLY chef illustration. Do not replace or duplicate.
// Source: public/chef-final.png (864×1152, transparent). The artwork has transparent margins
// (about 19% left, 14% right, 9% top, 8% bottom); layouts that line up the feet allow for them.
export default function MagicWokChef({ className = "", alt = "Magic Wok chef", eager = false }) {
  return (
    <img
      className={className}
      src="/chef-final.png"
      alt={alt}
      width="864"
      height="1152"
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable="false"
    />
  );
}
