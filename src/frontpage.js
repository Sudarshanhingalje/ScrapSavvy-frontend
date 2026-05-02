import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Static/Front.css";

/* ─── DATA ─── */
const TICKER_ITEMS = [
  "Book a free pickup",
  "Sell your scrap today",
  "Best rates guaranteed",
  "Eco-friendly disposal",
  "Same-day collection",
  "Book a free pickup",
  "Sell your scrap today",
  "Best rates guaranteed",
  "Eco-friendly disposal",
  "Same-day collection",
];

const HOW_STEPS = [
  {
    n: "01",
    icon: "📅",
    title: "Schedule",
    desc: "Pick a convenient date and time slot via our app or website. Takes under a minute.",
  },
  {
    n: "02",
    icon: "🚛",
    title: "We Arrive",
    desc: "Our trained team arrives at your doorstep on time — no waiting, no chasing.",
  },
  {
    n: "03",
    icon: "⚖️",
    title: "We Weigh",
    desc: "Every item is weighed on calibrated scales in front of you. Total transparency.",
  },
  {
    n: "04",
    icon: "💸",
    title: "Get Paid",
    desc: "Instant cash or UPI transfer at current market rates. No hidden deductions.",
  },
];

const ABOUT_CARDS = [
  {
    icon: "🏭",
    title: "Built on Innovation",
    text: "We seamlessly blend traditional waste collection with cutting-edge automation — creating a streamlined, professional, and eco-conscious experience for every household and business in Pune.",
  },
  {
    icon: "🌍",
    title: "Committed to Sustainability",
    text: "Our mission is to reduce the environmental impact of waste disposal through state-of-the-art logistics — making responsible waste management accessible, convenient, and genuinely green.",
  },
  {
    icon: "♻️",
    title: "Circular Economy Vision",
    text: "We connect waste generators directly with certified recyclers and processors — because at ScrapSavvy, waste isn't a problem. It's a resource waiting to benefit your community and the planet.",
  },
];

const SERVICES = [
  {
    icon: "🚪",
    title: "Doorstep Pickup",
    desc: "We come to you — homes, offices, factories, and housing societies. No minimum quantity required.",
  },
  {
    icon: "♻️",
    title: "Responsible Recycling",
    desc: "Every item is sorted, segregated, and sent to certified recycling partners. Nothing goes to landfill.",
  },
  {
    icon: "💰",
    title: "Best Market Rates",
    desc: "Live pricing updated daily. We match or beat any competitor — guaranteed.",
  },
];

const MATERIALS = [
  { emoji: "🔩", name: "Iron", price: "₹28/kg" },
  { emoji: "🥫", name: "Steel", price: "₹35/kg" },
  { emoji: "🪙", name: "Copper", price: "₹450/kg" },
  { emoji: "📄", name: "Paper", price: "₹12/kg" },
  { emoji: "🔋", name: "Battery", price: "₹8/kg" },
  { emoji: "📺", name: "E-Waste", price: "₹25/kg" },
];

/* ─── COMPONENT ─── */
function Frontpage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ══════════════ NAV ══════════════ */}
      <header className={`sp-nav${scrolled ? " scrolled" : ""}`}>
        <div className="sp-nav__inner">
          <Link to="/" className="sp-nav__logo">
            <span className="sp-nav__logo-mark">♻</span>
            <span className="sp-nav__logo-text">ScrapSavvy</span>
          </Link>

          <nav className="sp-nav__links">
            <a href="#how">Process</a>
            <a href="#about">About</a>
            <a href="#rates">Rates</a>
            <Link to="/signup">Sign Up</Link>
            <Link to="/signin" className="nav-cta">
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      {/* ══════════════ HERO ══════════════ */}
      <section className="sp-hero">
        <div className="sp-hero__left">
          <div className="sp-hero__tag">
            <span className="sp-hero__tag-dot" />
            🌿 Pune's #1 scrap pickup service
          </div>

          <h1 className="sp-hero__h1">
            Scrap
            <br />
            <span className="accent">Smart.</span>
            <br />
            Live Clean.
          </h1>

          <p className="sp-hero__sub">
            Turn your household scrap into cash — doorstep pickup, instant
            payment, zero hassle. Schedule a collection in under 60 seconds.
          </p>

          <div className="sp-hero__actions">
            <Link to="/signin" className="btn-primary">
              Book Pickup
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                style={{ width: 16, height: 16 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <a href="#rates" className="btn-ghost">
              View rates →
            </a>
          </div>
        </div>

        <div className="sp-hero__right">
          <div className="hero-graphic">
            <div className="hero-orbit">
              <div className="hero-core">
                <span className="hero-emoji">♻️</span>
              </div>
            </div>

            <div className="hero-stats hero-stats--right">
              <div className="stat-pill">
                <span className="stat-pill__num">5K+</span>
                <span className="stat-pill__lbl">Pickups Done</span>
              </div>
              <div className="stat-pill">
                <span className="stat-pill__num">98%</span>
                <span className="stat-pill__lbl">Satisfaction</span>
              </div>
            </div>

            <div className="hero-stats hero-stats--bottom">
              <div className="stat-pill">
                <span className="stat-pill__num">12T</span>
                <span className="stat-pill__lbl">Recycled</span>
              </div>
              <div className="stat-pill">
                <span className="stat-pill__num">₹0</span>
                <span className="stat-pill__lbl">Pickup Fee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ TICKER ══════════════ */}
      <div className="sp-ticker" aria-hidden="true">
        <div className="sp-ticker__track">
          {TICKER_ITEMS.map((t, i) => (
            <span className="sp-ticker__item" key={i}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════ HOW IT WORKS ══════════════ */}
      <section className="sp-how" id="how">
        <div className="container">
          <span className="section-label">How It Works</span>
          <h2 className="section-title">Four steps to a cleaner home</h2>
          <div className="how-grid">
            {HOW_STEPS.map((s) => (
              <div className="how-step" key={s.n}>
                <div className="how-step__num">{s.n}</div>
                <div className="how-step__icon">{s.icon}</div>
                <div className="how-step__title">{s.title}</div>
                <p className="how-step__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ ABOUT ══════════════ */}
      <section className="sp-about" id="about">
        <div className="about-inner">
          <div className="about-left">
            <span className="about-eyebrow">Who We Are</span>
            <h2 className="about-headline">
              Pune's
              <br />
              Cleanest
              <br />
              <span>Mission.</span>
            </h2>
            <div className="about-rule" />
            <p className="about-tagline">
              ScrapSavvy is a Pune-based start-up turning waste into value — one
              doorstep pickup at a time.
            </p>
            <div className="about-stats">
              {[
                { num: "5K", sup: "+", label: "Pickups Done" },
                { num: "12", sup: "T", label: "Recycled" },
                { num: "98", sup: "%", label: "Satisfaction" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="about-stat__num">
                    {s.num}
                    <span>{s.sup}</span>
                  </div>
                  <div className="about-stat__label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-right">
            {ABOUT_CARDS.map((c) => (
              <div className="about-card" key={c.title}>
                <div className="about-card__icon">{c.icon}</div>
                <div>
                  <div className="about-card__title">{c.title}</div>
                  <p className="about-card__text">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SERVICES ══════════════ */}
      <section className="sp-services">
        <div className="container">
          <span
            className="section-label"
            style={{ color: "rgba(200,87,42,0.85)" }}
          >
            What We Offer
          </span>
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            {SERVICES.map((s) => (
              <div className="srv-card" key={s.title}>
                <div className="srv-card__icon">{s.icon}</div>
                <div className="srv-card__title">{s.title}</div>
                <p className="srv-card__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ RATES ══════════════ */}
      <section className="sp-rates" id="rates">
        <div className="container">
          <span className="section-label">Today's Rates</span>
          <h2 className="section-title">What we buy</h2>
          <div className="rates-grid">
            {MATERIALS.map((m) => (
              <div className="rate-card" key={m.name}>
                <div className="rate-card__emoji">{m.emoji}</div>
                <div className="rate-card__name">{m.name}</div>
                <div className="rate-card__price">{m.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA BAND ══════════════ */}
      <div className="sp-cta">
        <div>
          <h2 className="sp-cta__h2">
            Ready to clear
            <br />
            the clutter?
          </h2>
          <p className="sp-cta__p">
            Free pickup · Instant payment · Zero hassle
          </p>
        </div>
        <Link to="/signin" className="btn-white">
          Book a Collection →
        </Link>
      </div>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="sp-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand__logo">
              <span className="footer-brand__mark">♻</span>
              <span className="footer-brand__name">ScrapSavvy</span>
            </div>
            <p className="footer-brand__desc">
              Pune's most reliable scrap pickup service. We turn your waste into
              value while keeping the planet clean.
            </p>
          </div>

          <div className="footer-col">
            <span className="footer-col__heading">Navigation</span>
            <Link to="/">Home</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/signin">Sign In</Link>
            <a href="#rates">Rates</a>
          </div>

          <div className="footer-col">
            <span className="footer-col__heading">Contact</span>
            <a href="mailto:hello@scrapsavvy.in">hello@scrapsavvy.in</a>
            <a href="tel:+919876543210">+91 98765 43210</a>
            <a href="#top">Pune, Maharashtra</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 ScrapSavvy. All rights reserved.</p>
          <p>Made in Pune 🇮🇳</p>
        </div>
      </footer>
    </>
  );
}

export default Frontpage;
