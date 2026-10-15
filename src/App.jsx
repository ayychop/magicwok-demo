import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Intro from "./components/Intro.jsx";
import { Fuse } from "./components/ui.jsx";
import { OrderProvider, WhatsAppOrb } from "./components/Order.jsx";
import { About, BackToTop, Divider, Faq, Featured, Footer, Marquee, Menu, MobileBar, Reviews, Visit } from "./components/Sections.jsx";
import { useOpenStatus } from "./hooks.js";

export default function App() {
  // One status source so the hero and Find Us badges always agree
  const status = useOpenStatus();
  return (
    <OrderProvider>
      <Intro />
      <a className="skip" href="#menu">Skip to menu</a>
      <Header />
      <main>
        <Hero status={status} />
        <div className="band section--dark" aria-hidden="false">
          <Marquee />
          <Divider />
        </div>
        <Fuse from="night" to="lacquer" />
        <Featured />
        <Fuse from="lacquer" to="cream" />
        <Menu />
        <Visit status={status} />
        <Fuse from="cream" to="night" />
        <About />
        <Fuse from="night" to="lacquer" />
        <Reviews />
        <Fuse from="lacquer" to="cream" />
        <Faq />
        <Fuse from="cream" to="night" />
      </main>
      <Footer />
      <MobileBar />
      <WhatsAppOrb />
      <BackToTop />
    </OrderProvider>
  );
}
