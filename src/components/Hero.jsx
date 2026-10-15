import Icon from "../icons/Icon.jsx";
import { Lantern, OpenBadge, Photo, RatingPill } from "./ui.jsx";
import { OrderButton } from "./Order.jsx";
import { BUSINESS, IMAGES, SERVICE } from "../data/site.js";

export default function Hero({ status }) {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      {/* Dumplings in a bamboo steamer: the steam is real, in the photo itself */}
      <Photo
        id={IMAGES.hero}
        alt="Steam rising from dumplings in a bamboo steamer"
        eager
        widths={[640, 960, 1440, 2000]}
        className="hero__photo zoomable"
      />
      <div className="hero__shade" aria-hidden="true" />
      <Lantern className="lantern--hero-a" />
      <Lantern className="lantern--hero-b" />

      <div className="container hero__inner">
        <div className="hero__badges">
          <OpenBadge status={status} />
          <RatingPill />
        </div>
        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title depth">
            Magic Wok
          </h1>
          <p className="hero__sub">
            Chinese Takeaway · High Wycombe <span className="zh zh--hero" lang="zh-Hans">外卖</span>
          </p>
          <p className="hero__line">Fresh from the wok, ready when you are.</p>
          <div className="hero__cta">
            <OrderButton />
            <a href={BUSINESS.phoneHref} className="btn btn--outline">
              <Icon name="phone" size={18} /> Call to Order
            </a>
            <a href="#menu" className="btn btn--text">
              <Icon name="utensils" size={18} /> View Menu
            </a>
          </div>
        </div>
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
