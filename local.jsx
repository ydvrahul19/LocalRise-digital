import { useState, useEffect, useRef } from "react";

// ============================================================
// MOCK DATA
// ============================================================
const SERVICES = [
  {
    id: 1,
    title: "Google Maps Optimization",
    emoji: "📍",
    description: "Dominate local search results and get found by customers near you. We optimize your Google Business Profile for maximum visibility and ranking.",
    features: [
      "Complete Google Business Profile setup & verification",
      "Local SEO keyword optimization",
      "Review generation & reputation management",
      "Photo optimization & geotagging",
      "Competitor analysis & ranking strategy",
      "Monthly performance tracking",
    ],
  },
  {
    id: 2,
    title: "Website Creation",
    emoji: "🌐",
    description: "Get a stunning, mobile-first website that turns visitors into loyal customers. Fast, beautiful, and built to convert — we even buy your domain for you!",
    features: [
      "We buy your domain name for you",
      "Custom responsive design (mobile-first)",
      "Lightning-fast loading speed",
      "SEO-friendly structure & meta tags",
      "Contact forms & booking sections",
      "Google Analytics integration",
    ],
  },
  {
    id: 3,
    title: "WhatsApp Integration",
    emoji: "💬",
    description: "Connect with customers instantly through WhatsApp Business. Automate replies, capture leads, and close more bookings directly on WhatsApp.",
    features: [
      "WhatsApp Business API setup",
      "Click-to-chat button on website",
      "Automated greeting & away messages",
      "Catalog setup for services",
      "Quick reply templates",
      "Customer broadcast list setup",
    ],
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh Kumar",
    business: "FitZone Gym, Mumbai",
    rating: 5,
    text: "LocalRise Digital transformed our online presence! Our Google Maps visibility increased by 300% and we're getting more walk-ins than ever before. Best investment for our gym!",
    initials: "RK",
  },
  {
    id: 2,
    name: "Priya Sharma",
    business: "Paws & Claws Pet Shop, Pune",
    rating: 5,
    text: "The website they created is beautiful and our WhatsApp integration has made customer communication so much easier. They even bought our domain for us! Highly recommend!",
    initials: "PS",
  },
  {
    id: 3,
    name: "Amit Patel",
    business: "Zen Wellness Center, Bangalore",
    rating: 5,
    text: "Professional service and excellent results. Our online bookings have doubled since working with LocalRise Digital. Fast delivery, no drama — just results!",
    initials: "AP",
  },
];

const STATS = [
  { end: 150, suffix: "+", label: "Happy Clients", emoji: "😊" },
  { end: 200, suffix: "+", label: "Projects Completed", emoji: "🚀" },
  { end: 250, suffix: "%", label: "Avg. Visibility Increase", emoji: "📈" },
  { end: 99, suffix: "%", label: "Customer Satisfaction", emoji: "⭐" },
];

const PACKAGE_FEATURES = [
  { text: "Google Maps Optimization", icon: "📍" },
  { text: "Professional Website Creation", icon: "🌐" },
  { text: "We Buy Your Domain Name", icon: "🔗" },
  { text: "WhatsApp Business Integration", icon: "💬" },
  { text: "Mobile Responsive Design", icon: "📱" },
  { text: "SEO-Friendly Setup", icon: "🔍" },
  { text: "1 Month Free Support", icon: "🛠️" },
  { text: "Training & Documentation", icon: "📚" },
  { text: "Fast Delivery (7–10 Days)", icon: "⚡" },
];

const FAQS = [
  { q: "How long does it take to see results?", a: "Most clients start seeing improved visibility within 2–4 weeks. Google Maps optimization results can be seen even sooner — sometimes within 7 days!" },
  { q: "Is the ₹5,000 a monthly fee?", a: "No! It's a one-time investment. You get all three services — Google Maps optimization, website creation, and WhatsApp integration — for just ₹5,000. No hidden charges, ever." },
  { q: "Do you buy the domain for us?", a: "Yes! Domain purchase and setup is included in our website creation service. We handle everything — you don't need any technical knowledge." },
  { q: "What businesses do you work with?", a: "We specialize in gyms, wellness centers, pet shops, salons, cafes, clinics, tutoring centers, and all local service-based businesses." },
  { q: "How long does the full project take?", a: "We deliver everything within 7–10 business days. We work efficiently without compromising quality." },
  { q: "Do you provide ongoing support?", a: "Yes! Every package includes 1 month of free support. We answer questions, fix issues, and guide you on best practices after delivery." },
];

const WHATSAPP_NUMBER = "918094285616";
const WHATSAPP_MSG = encodeURIComponent("Hi LocalRise Digital! I am interested in your digital services package.");

// ============================================================
// ANIMATED COUNTER
// ============================================================
function AnimatedCounter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime;
    let frame;
    const animate = (now) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) frame = requestAnimationFrame(animate);
      else setCount(end);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ============================================================
// LOGO SVG COMPONENT
// ============================================================
function LogoSVG({ height = 46, darkText = true }) {
  const textColor = darkText ? "#111827" : "white";
  const accentColor = "#137FEC";
  const w = height * (300 / 75);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 75" width={w} height={height}>
      <defs>
        <linearGradient id="pinBgL" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A90E2"/>
          <stop offset="100%" stopColor="#137FEC"/>
        </linearGradient>
        <radialGradient id="glowBgL" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#137FEC" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#137FEC" stopOpacity="0"/>
        </radialGradient>
        <filter id="pinShadowL" x="-40%" y="-20%" width="180%" height="180%">
          <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#137FEC" floodOpacity="0.4"/>
        </filter>
        <filter id="arrowGlowL" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Soft glow halo */}
      <ellipse cx="37" cy="32" rx="28" ry="28" fill="url(#glowBgL)"/>

      {/* Map pin */}
      <path
        d="M37 6 C25 6 15 16 15 28 C15 42 37 66 37 66 C37 66 59 42 59 28 C59 16 49 6 37 6 Z"
        fill="url(#pinBgL)"
        filter="url(#pinShadowL)"
      />

      {/* Inner circle highlight */}
      <circle cx="37" cy="27" r="12" fill="white" opacity="0.12"/>

      {/* Rising trend arrow inside pin */}
      <g filter="url(#arrowGlowL)">
        <polyline
          points="26,35 31,27 37,31 44,20"
          fill="none" stroke="white" strokeWidth="3"
          strokeLinecap="round" strokeLinejoin="round"
        />
        <polyline
          points="40,18 44,20 42,25"
          fill="none" stroke="white" strokeWidth="3"
          strokeLinecap="round" strokeLinejoin="round"
        />
      </g>

      {/* "LocalRise" bold */}
      <text
        x="70" y="40"
        fontFamily="'Segoe UI', 'Arial Black', Arial, sans-serif"
        fontSize="27" fontWeight="800"
        fill={textColor} letterSpacing="-0.5"
      >LocalRise</text>

      {/* "Digital" blue accent */}
      <text
        x="214" y="40"
        fontFamily="'Segoe UI', Arial, sans-serif"
        fontSize="27" fontWeight="400"
        fill={accentColor} letterSpacing="-0.5"
      >Digital</text>
    </svg>
  );
}

// ============================================================
// NAVBAR
// ============================================================
function NavBar({ activeSection }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "pricing", label: "Pricing" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(255,255,255,0.98)" : "white",
      backdropFilter: "blur(16px)",
      boxShadow: scrolled ? "0 2px 24px rgba(0,69,52,0.1)" : "0 1px 4px rgba(0,0,0,0.05)",
      transition: "all 0.3s",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          {/* Logo */}
          <div style={{ cursor: "pointer", display: "flex", alignItems: "center" }} onClick={() => go("home")}>
            <LogoSVG height={46} darkText={true} />
          </div>

          {/* Desktop Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }} className="desk-nav">
            {links.map(l => (
              <button key={l.id} onClick={() => go(l.id)} style={{
                background: activeSection === l.id ? "#ecfdf5" : "transparent",
                color: activeSection === l.id ? "#004534" : "#4b5563",
                border: "none", borderRadius: 8, padding: "8px 14px",
                fontSize: 14, fontWeight: activeSection === l.id ? 700 : 500,
                cursor: "pointer", transition: "all 0.2s",
              }}>{l.label}</button>
            ))}
            <button onClick={() => go("contact")} style={{
              background: "linear-gradient(135deg, #D3FF62, #b8e832)",
              color: "#004534", border: "none", borderRadius: 20,
              padding: "10px 22px", fontSize: 14, fontWeight: 700,
              cursor: "pointer", marginLeft: 10,
              boxShadow: "0 2px 10px rgba(211,255,98,0.5)",
            }}>
              Get Started →
            </button>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setOpen(!open)} className="mob-btn" style={{
            background: "transparent", border: "none", fontSize: 22, cursor: "pointer", color: "#374151", display: "none"
          }}>
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div style={{ borderTop: "1px solid #e5e7eb", padding: "12px 0 16px", display: "flex", flexDirection: "column", gap: 4 }}>
            {links.map(l => (
              <button key={l.id} onClick={() => go(l.id)} style={{
                background: "transparent", border: "none", textAlign: "left",
                padding: "12px 8px", fontSize: 15, fontWeight: 500, color: "#374151", cursor: "pointer"
              }}>{l.label}</button>
            ))}
            <button onClick={() => go("contact")} style={{
              background: "linear-gradient(135deg, #D3FF62, #b8e832)", color: "#004534",
              border: "none", borderRadius: 16, padding: "12px", fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 8
            }}>Get Started →</button>
          </div>
        )}
      </div>
    </nav>
  );
}

// ============================================================
// WHATSAPP FLOATING BUTTON
// ============================================================
function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`} target="_blank" rel="noreferrer"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 9999,
        width: 60, height: 60, borderRadius: "50%",
        background: "#25D366", color: "white",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
        textDecoration: "none", fontSize: 28,
        transform: hovered ? "scale(1.12)" : "scale(1)",
        transition: "transform 0.3s",
        animation: "wa-bounce 2.5s ease-in-out infinite",
      }}>
      💬
      {hovered && (
        <span style={{
          position: "absolute", right: 70, background: "#004534", color: "white",
          padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600,
          whiteSpace: "nowrap", boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
        }}>Chat with us!</span>
      )}
    </a>
  );
}

// ============================================================
// HERO SECTION
// ============================================================
function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 120); }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      background: "linear-gradient(155deg, #FAFFEE 0%, #f0ffe8 50%, #FAFAFF 100%)",
      paddingTop: 68, position: "relative", overflow: "hidden"
    }}>
      {/* Orbs */}
      {[
        { w: 420, h: 420, top: "-180px", left: "-100px", bg: "rgba(211,255,98,0.18)", delay: "0s" },
        { w: 500, h: 500, top: "50%", right: "-160px", bg: "rgba(12,105,81,0.1)", delay: "7s" },
        { w: 280, h: 280, bottom: "-80px", left: "35%", bg: "rgba(202,202,252,0.25)", delay: "14s" },
      ].map((o, i) => (
        <div key={i} style={{
          position: "absolute", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none",
          width: o.w, height: o.h, top: o.top, bottom: o.bottom, left: o.left, right: o.right,
          background: o.bg, animation: `floatOrb 20s ease-in-out ${o.delay} infinite`
        }} />
      ))}

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="hero-grid">
          {/* Text */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "all 0.8s ease" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#FAFAFF", border: "1px solid #CACAFC",
              borderRadius: 20, padding: "9px 18px", fontSize: 13, fontWeight: 600,
              color: "#004534", marginBottom: 24,
            }}>
              <span style={{ animation: "sparkle 2s ease-in-out infinite", display: "inline-block" }}>✨</span>
              Boost Your Local Business
            </div>

            <h1 style={{
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 800, color: "#004534",
              lineHeight: 1.12, marginBottom: 20, letterSpacing: "-1px"
            }}>
              Transform Your Local Business with{" "}
              <span style={{
                background: "linear-gradient(135deg, #D3FF62 0%, #0C6951 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
              }}>
                Digital Excellence
              </span>
            </h1>

            <p style={{ fontSize: 17, color: "#0C6951", lineHeight: 1.75, marginBottom: 32, maxWidth: 520 }}>
              We help gyms, wellness centers, pet shops, and local businesses dominate Google Maps,
              create stunning websites, and connect with customers through WhatsApp —
              all for <strong style={{ color: "#004534" }}>₹5,000 one-time</strong>.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
              <button onClick={() => go("contact")} style={{
                background: "#D3FF62", color: "#004534", border: "none", borderRadius: 28,
                padding: "16px 32px", fontSize: 17, fontWeight: 800, cursor: "pointer",
                boxShadow: "0 4px 16px rgba(211,255,98,0.5)", display: "flex", alignItems: "center", gap: 10,
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(211,255,98,0.6)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 16px rgba(211,255,98,0.5)"; }}
              >
                Get Started Today →
              </button>
              <button onClick={() => go("services")} style={{
                background: "transparent", color: "#004534", border: "2px solid #004534",
                borderRadius: 28, padding: "14px 28px", fontSize: 16, fontWeight: 700, cursor: "pointer",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#004534"; e.currentTarget.style.color = "white"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#004534"; }}
              >
                Our Services
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="stats-grid">
              {STATS.map((s, i) => (
                <div key={i} style={{
                  opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s ease ${0.3 + i * 0.1}s`, textAlign: "center"
                }}>
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{s.emoji}</div>
                  <div style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 800, color: "#004534" }}>
                    <AnimatedCounter end={s.end} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: 12, color: "#807979", fontWeight: 500, lineHeight: 1.3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(32px)", transition: "all 0.8s ease 0.2s" }} className="hero-visual">
            <div style={{
              background: "white", borderRadius: 28, padding: 28,
              boxShadow: "0 20px 60px rgba(0,69,52,0.12)", border: "1px solid #CACAFC"
            }}>
              {/* Mock Maps card */}
              <div style={{
                background: "linear-gradient(135deg, #FAFFEE, #FAFAFF)",
                borderRadius: 20, padding: 20, marginBottom: 14, position: "relative", overflow: "hidden",
                border: "1px solid #CACAFC"
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#807979", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.5px" }}>📍 Google Maps Results</div>
                {["FitZone Gym", "Paws & Claws", "Zen Wellness"].map((name, i) => (
                  <div key={i} style={{
                    background: "white", borderRadius: 12, padding: "12px 16px",
                    marginBottom: i < 2 ? 8 : 0, display: "flex", alignItems: "center",
                    justifyContent: "space-between", boxShadow: "0 2px 8px rgba(0,69,52,0.06)",
                    border: "1px solid #EDEDFE"
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: "#004534" }}>{name}</div>
                      <div style={{ fontSize: 11, color: "#f59e0b", marginTop: 2 }}>★★★★★ <span style={{ color: "#807979" }}>4.9</span></div>
                    </div>
                    <div style={{
                      background: i === 0 ? "#D3FF62" : "#EDEDFE",
                      color: i === 0 ? "#004534" : "#807979",
                      borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700
                    }}>{i === 0 ? "#1 Ranked" : `#${i + 1}`}</div>
                  </div>
                ))}
              </div>

              {/* Float cards */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { emoji: "📍", label: "Maps Optimized", value: "250+ Rankings", bg: "#FAFFEE" },
                  { emoji: "🌐", label: "Websites Built", value: "200+ Sites", bg: "#FAFAFF" },
                  { emoji: "💬", label: "WhatsApp", value: "Connected", bg: "#ecfdf5" },
                  { emoji: "⭐", label: "Avg. Reviews", value: "4.9 Stars", bg: "#fef3c7" },
                ].map((c, i) => (
                  <div key={i} style={{
                    background: c.bg, borderRadius: 14, padding: "14px",
                    border: "1px solid #CACAFC",
                    animation: `floatCard 3s ease-in-out ${i * 0.7}s infinite`
                  }}>
                    <div style={{ fontSize: 20, marginBottom: 6 }}>{c.emoji}</div>
                    <div style={{ fontSize: 11, color: "#807979", fontWeight: 600 }}>{c.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "#004534" }}>{c.value}</div>
                  </div>
                ))}
              </div>

              {/* Center pulse */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: 80, height: 80, borderRadius: "50%",
                    border: "2px solid #D3FF62", opacity: 0,
                    animation: `pulseRing 3s ease-out ${i}s infinite`
                  }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SERVICES
// ============================================================
function Services() {
  return (
    <section id="services" style={{ padding: "100px 24px", background: "white" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#FAFFEE", border: "1px solid #CACAFC", borderRadius: 20, padding: "8px 16px", fontSize: 13, fontWeight: 600, color: "#004534", marginBottom: 16 }}>🛠️ What We Do</div>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, color: "#004534", marginBottom: 16, letterSpacing: "-0.5px" }}>
            Three Powerful Services,{" "}
            <span style={{ background: "linear-gradient(135deg,#D3FF62,#0C6951)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              One Package
            </span>
          </h2>
          <p style={{ fontSize: 17, color: "#0C6951", maxWidth: 540, margin: "0 auto", lineHeight: 1.65 }}>
            Everything a local business needs to dominate their neighborhood online
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: 24 }}>
          {SERVICES.map((s, i) => (
            <div key={s.id} style={{
              background: "#FAFAFF", borderRadius: 28, padding: 32,
              border: "1px solid #CACAFC", position: "relative", overflow: "hidden",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,69,52,0.12)";
                e.currentTarget.querySelector(".card-bar").style.transform = "scaleX(1)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.querySelector(".card-bar").style.transform = "scaleX(0)";
              }}
            >
              {/* Gradient bar */}
              <div className="card-bar" style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 4,
                background: "linear-gradient(90deg,#D3FF62,#0C6951)",
                transform: "scaleX(0)", transformOrigin: "left", transition: "transform 0.4s ease"
              }} />
              <div style={{
                width: 60, height: 60, borderRadius: 18, background: "#EDEDFE",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, marginBottom: 20
              }}>{s.emoji}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#004534", marginBottom: 12 }}>{s.title}</h3>
              <p style={{ fontSize: 15, color: "#0C6951", lineHeight: 1.65, marginBottom: 24 }}>{s.description}</p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {s.features.map((f, fi) => (
                  <li key={fi} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#374151" }}>
                    <span style={{ color: "#0C6951", fontWeight: 700, marginTop: 2, flexShrink: 0 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          background: "linear-gradient(135deg,#004534,#0C6951)", borderRadius: 24,
          padding: "32px 40px", marginTop: 48, display: "flex",
          alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20
        }}>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#D3FF62", marginBottom: 6 }}>All 3 services, one affordable package</h3>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15 }}>No picking and choosing — you get everything to grow your business</p>
          </div>
          <button onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })} style={{
            background: "#D3FF62", color: "#004534", border: "none", borderRadius: 20,
            padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer",
            boxShadow: "0 4px 14px rgba(211,255,98,0.4)"
          }}>View Pricing →</button>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TESTIMONIALS (with slider)
// ============================================================
function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const t = setInterval(() => setIdx(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, [autoPlay]);

  const goTo = (i) => {
    setIdx(i);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const colors = ["#D3FF62", "#0C6951", "#004534"];

  return (
    <section style={{ padding: "100px 24px", background: "#FAFFEE" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fef3c7", color: "#92400e", borderRadius: 20, padding: "8px 16px", fontSize: 13, fontWeight: 600, marginBottom: 16 }}>⭐ Success Stories</div>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, color: "#004534", letterSpacing: "-0.5px" }}>
            What Our Clients Say
          </h2>
        </div>

        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", minHeight: 280 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.id} style={{
              position: i === idx ? "relative" : "absolute",
              top: 0, width: "100%",
              opacity: i === idx ? 1 : 0,
              transform: i === idx ? "translateX(0) scale(1)" : i < idx ? "translateX(-60px) scale(0.96)" : "translateX(60px) scale(0.96)",
              transition: "all 0.5s ease",
              pointerEvents: i === idx ? "all" : "none",
              background: "white", borderRadius: 28, padding: 40,
              boxShadow: "0 8px 32px rgba(0,69,52,0.1)",
              border: "2px solid #CACAFC",
            }}>
              {/* Stars */}
              <div style={{ display: "flex", gap: 4, color: "#f59e0b", fontSize: 20, marginBottom: 20 }}>
                {"★★★★★".split("").map((s, si) => <span key={si}>{s}</span>)}
              </div>
              <p style={{ fontSize: 17, color: "#0C6951", lineHeight: 1.75, fontStyle: "italic", marginBottom: 28 }}>
                "{t.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 54, height: 54, borderRadius: "50%",
                  background: colors[i % 3],
                  color: i === 1 ? "white" : "#004534",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, fontWeight: 800, flexShrink: 0
                }}>{t.initials}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "#004534" }}>{t.name}</div>
                  <div style={{ fontSize: 14, color: "#807979" }}>{t.business}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 32 }}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: i === idx ? 28 : 12, height: 12, borderRadius: 6, border: "none", cursor: "pointer",
              background: i === idx ? "#004534" : "#CACAFC",
              transition: "all 0.3s", padding: 0
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ABOUT
// ============================================================
function About() {
  const values = [
    { emoji: "🎯", title: "Result-Focused", desc: "We measure success by your growth — more customers, more visibility, more revenue." },
    { emoji: "⚡", title: "Fast Delivery", desc: "Your complete digital setup is live within 7–10 business days." },
    { emoji: "🤝", title: "Local Expertise", desc: "We understand the specific needs and challenges of local Indian businesses." },
    { emoji: "💰", title: "Truly Affordable", desc: "No hidden fees, no monthly surprises. One fair price, complete service." },
  ];

  return (
    <section id="about" style={{ padding: "100px 24px", background: "white" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }} className="about-grid">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#FAFFEE", border: "1px solid #CACAFC", borderRadius: 20, padding: "8px 16px", fontSize: 13, fontWeight: 600, color: "#004534", marginBottom: 20 }}>👋 About Us</div>
            <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 800, color: "#004534", marginBottom: 20, letterSpacing: "-0.5px", lineHeight: 1.2 }}>
              We Speak the Language of <span style={{ color: "#0C6951" }}>Local Business</span>
            </h2>
            <p style={{ fontSize: 16, color: "#0C6951", lineHeight: 1.8, marginBottom: 20 }}>
              LocalRise Digital was born from a simple observation: most local businesses in India have incredible
              products and services, but struggle to be found online. We bridge that gap.
            </p>
            <p style={{ fontSize: 16, color: "#0C6951", lineHeight: 1.8, marginBottom: 36 }}>
              Our team visits businesses directly, understands their unique needs, and delivers a tailored
              digital presence — Google Maps, professional websites with domain, and WhatsApp communication.
            </p>
            <div style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
              {[{ v: "150+", l: "Happy Clients" }, { v: "200+", l: "Projects Done" }, { v: "250%", l: "Avg. Visibility" }].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#004534" }}>{s.v}</div>
                  <div style={{ fontSize: 13, color: "#807979", fontWeight: 600 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {values.map((v, i) => (
              <div key={i} style={{
                background: "#FAFAFF", borderRadius: 20, padding: 24,
                border: "1px solid #CACAFC", transition: "transform 0.2s, box-shadow 0.2s"
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,69,52,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
              >
                <div style={{ fontSize: 28, marginBottom: 12 }}>{v.emoji}</div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: "#004534", marginBottom: 8 }}>{v.title}</h4>
                <p style={{ fontSize: 13, color: "#0C6951", lineHeight: 1.55 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div style={{ marginTop: 80, textAlign: "center" }}>
          <h3 style={{ fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 700, color: "#004534", marginBottom: 48 }}>How We Work</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
            {[
              { n: "01", emoji: "📞", t: "We Meet You", d: "Our team visits or calls to understand your business goals" },
              { n: "02", emoji: "📋", t: "We Plan", d: "We create a custom strategy for your specific business and area" },
              { n: "03", emoji: "⚡", t: "We Execute", d: "Everything set up within 7–10 business days" },
              { n: "04", emoji: "📈", t: "You Grow", d: "Watch your visibility soar and customers start finding you" },
            ].map((step, i) => (
              <div key={i} style={{ background: "#FAFAFF", borderRadius: 20, padding: "28px 20px", border: "1px solid #CACAFC" }}>
                <div style={{
                  background: "linear-gradient(135deg,#004534,#0C6951)", color: "#D3FF62",
                  width: 32, height: 32, borderRadius: 10, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 12, fontWeight: 800, margin: "0 auto 16px"
                }}>{step.n}</div>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{step.emoji}</div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: "#004534", marginBottom: 8 }}>{step.t}</h4>
                <p style={{ fontSize: 13, color: "#0C6951", lineHeight: 1.5 }}>{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PRICING
// ============================================================
function Pricing() {
  return (
    <section id="pricing" style={{ padding: "100px 24px", background: "linear-gradient(160deg,#FAFFEE,#FAFAFF)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#FAFFEE", border: "1px solid #CACAFC", borderRadius: 20, padding: "8px 16px", fontSize: 13, fontWeight: 600, color: "#004534", marginBottom: 16 }}>💰 Pricing</div>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, color: "#004534", marginBottom: 16, letterSpacing: "-0.5px" }}>
            Simple, Transparent Pricing
          </h2>
          <p style={{ fontSize: 17, color: "#0C6951" }}>One investment. Three powerful services. Unlimited growth potential.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }} className="pricing-grid">
          {/* Main Card */}
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)",
              background: "#D3FF62", color: "#004534", borderRadius: 20,
              padding: "9px 22px", fontSize: 13, fontWeight: 800,
              whiteSpace: "nowrap", boxShadow: "0 4px 14px rgba(211,255,98,0.5)",
              display: "flex", alignItems: "center", gap: 6, zIndex: 10
            }}>✨ Most Popular — Best Value</div>

            <div style={{
              background: "white", borderRadius: 28, padding: "50px 36px 36px",
              boxShadow: "0 16px 60px rgba(0,69,52,0.12)", border: "2px solid #004534",
              position: "relative", overflow: "hidden"
            }}>
              {/* Shine effect */}
              <div style={{
                position: "absolute", top: "-50%", right: "-50%", bottom: "-50%", left: "-50%",
                background: "linear-gradient(to bottom, rgba(229,229,229,0) 0%, rgba(255,255,255,0.04) 50%, rgba(229,229,229,0) 100%)",
                transform: "rotateZ(60deg) translateY(-100%)",
                animation: "shine 6s ease-in-out infinite", pointerEvents: "none"
              }} />

              <h3 style={{ textAlign: "center", fontSize: 20, fontWeight: 700, color: "#004534", marginBottom: 8 }}>Complete Digital Package</h3>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <div style={{ fontSize: "clamp(3rem,6vw,4.5rem)", fontWeight: 800, color: "#004534", lineHeight: 1 }}>₹5,000</div>
                <div style={{ fontSize: 15, color: "#807979", fontWeight: 500, marginTop: 8 }}>One-time investment • No monthly fees</div>
              </div>

              <ul style={{ listStyle: "none", padding: 0, marginBottom: 32 }}>
                {PACKAGE_FEATURES.map((f, i) => (
                  <li key={i} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 0", fontSize: 15, color: "#374151",
                    borderBottom: i < PACKAGE_FEATURES.length - 1 ? "1px solid #EDEDFE" : "none"
                  }}>
                    <span style={{ fontSize: 16 }}>{f.icon}</span>
                    {f.text}
                    <span style={{ marginLeft: "auto", color: "#0C6951", fontWeight: 700 }}>✓</span>
                  </li>
                ))}
              </ul>

              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{
                width: "100%", background: "#D3FF62", color: "#004534", border: "none", borderRadius: 16,
                padding: "16px", fontSize: 17, fontWeight: 800, cursor: "pointer",
                boxShadow: "0 4px 14px rgba(211,255,98,0.4)",
                transition: "transform 0.2s, box-shadow 0.2s"
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(211,255,98,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 14px rgba(211,255,98,0.4)"; }}
              >
                Get Started Now →
              </button>
              <p style={{ textAlign: "center", marginTop: 14, fontSize: 13, color: "#807979", fontStyle: "italic" }}>
                No hidden fees. No monthly charges. Ever.
              </p>
            </div>
          </div>

          {/* Right */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ background: "white", borderRadius: 20, padding: 28, border: "1px solid #CACAFC" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🛡️</div>
              <h4 style={{ fontSize: 18, fontWeight: 700, color: "#004534", marginBottom: 10 }}>Satisfaction Guarantee</h4>
              <p style={{ fontSize: 14, color: "#0C6951", lineHeight: 1.7 }}>
                Not happy with our work? We'll revise until you are. Your investment is protected by our commitment to quality.
              </p>
            </div>

            <div style={{ background: "white", borderRadius: 20, padding: 28, border: "1px solid #CACAFC" }}>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: "#374151", marginBottom: 16 }}>💡 What these cost elsewhere:</h4>
              {[
                { s: "Website Design (Agency)", c: "₹15,000–50,000" },
                { s: "Google Maps SEO/month", c: "₹3,000–8,000/mo" },
                { s: "WhatsApp Business Setup", c: "₹5,000–10,000" },
                { s: "Domain + Hosting Setup", c: "₹2,000–5,000" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 3 ? "1px solid #EDEDFE" : "none" }}>
                  <span style={{ fontSize: 14, color: "#807979" }}>{c.s}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#dc2626" }}>{c.c}</span>
                </div>
              ))}
              <div style={{ marginTop: 14, background: "#FAFFEE", borderRadius: 12, padding: "13px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #CACAFC" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#004534" }}>With LocalRise Digital</span>
                <span style={{ fontSize: 20, fontWeight: 800, color: "#004534" }}>₹5,000 total</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <a href="tel:+918094285616" style={{
                flex: 1, background: "white", border: "2px solid #CACAFC", borderRadius: 16,
                padding: "14px", textAlign: "center", textDecoration: "none",
                color: "#004534", fontWeight: 700, fontSize: 14
              }}>📞 Call Us</a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`} target="_blank" rel="noreferrer" style={{
                flex: 1, background: "#25D366", color: "white", border: "none", borderRadius: 16,
                padding: "14px", textAlign: "center", textDecoration: "none", fontWeight: 700, fontSize: 14
              }}>💬 WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FAQ
// ============================================================
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{ padding: "100px 24px", background: "white" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#EDEDFE", color: "#004534", borderRadius: 20, padding: "8px 16px", fontSize: 13, fontWeight: 600, marginBottom: 16 }}>❓ FAQ</div>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, color: "#004534", letterSpacing: "-0.5px" }}>Frequently Asked Questions</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ border: "1px solid", borderColor: open === i ? "#004534" : "#CACAFC", borderRadius: 16, overflow: "hidden", transition: "border-color 0.2s" }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: "100%", background: open === i ? "#FAFFEE" : "white", border: "none",
                padding: "20px 24px", textAlign: "left", display: "flex", justifyContent: "space-between",
                alignItems: "center", cursor: "pointer", gap: 16, transition: "background 0.2s"
              }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#004534", lineHeight: 1.4 }}>{faq.q}</span>
                <span style={{ fontSize: 22, color: "#0C6951", flexShrink: 0, transform: open === i ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.2s" }}>+</span>
              </button>
              {open === i && (
                <div style={{ padding: "0 24px 20px", background: "#FAFFEE" }}>
                  <p style={{ fontSize: 15, color: "#0C6951", lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CONTACT
// ============================================================
const BACKEND_URL = typeof process !== "undefined" && process.env?.REACT_APP_BACKEND_URL
  ? process.env.REACT_APP_BACKEND_URL
  : "";

async function submitContact(data) {
  // Try real backend first
  if (BACKEND_URL) {
    const res = await fetch(`${BACKEND_URL}/api/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Server error");
    return await res.json();
  }
  // Fallback: simulate
  await new Promise(r => setTimeout(r, 1400));
  if (!data.name || !data.phone || !data.businessType) throw new Error("Please fill all required fields.");
  return { status: "success" };
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", businessType: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errMsg, setErrMsg] = useState("");

  const set = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading"); setErrMsg("");
    try {
      const res = await submitContact(form);
      if (res.status === "success") {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", businessType: "", message: "" });
        setTimeout(() => setStatus("idle"), 6000);
      }
    } catch (err) {
      setStatus("error"); setErrMsg(err.message || "Something went wrong. Please try again.");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputStyle = {
    width: "100%", padding: "12px 14px", border: "1.5px solid #CACAFC",
    borderRadius: 10, fontSize: 15, outline: "none", fontFamily: "inherit",
    background: "white", color: "#111827", boxSizing: "border-box",
    transition: "border-color 0.2s"
  };

  return (
    <section id="contact" style={{ padding: "100px 24px", background: "linear-gradient(155deg,#004534 0%,#0C6951 100%)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.5px" }}>
            Ready to Grow Your Business?
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.72)", maxWidth: 500, margin: "0 auto" }}>
            Fill in the form and our team will reach out within 24 hours
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 48 }} className="contact-grid">
          {/* Info */}
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "white", marginBottom: 28 }}>Let's Connect</h3>
            {[
              { emoji: "📧", label: "Email", value: "ydvrahul1906@gmail.com", href: "mailto:ydvrahul1906@gmail.com" },
              { emoji: "📞", label: "Phone", value: "+91 80942 85616", href: "tel:+918094285616" },
              { emoji: "💬", label: "WhatsApp", value: "Chat with us now", href: `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}` },
              { emoji: "📍", label: "Location", value: "Akbarpur Nagar, Ahmedabad" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 16, marginBottom: 24, alignItems: "flex-start" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{c.emoji}</div>
                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 4 }}>{c.label}</div>
                  {c.href ? (
                    <a href={c.href} style={{ fontSize: 15, color: "#D3FF62", fontWeight: 600, textDecoration: "none" }}>{c.value}</a>
                  ) : (
                    <div style={{ fontSize: 15, color: "white", fontWeight: 600 }}>{c.value}</div>
                  )}
                </div>
              </div>
            ))}

            <div style={{ marginTop: 32 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 12 }}>We Work With</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["🏋️ Gyms", "🧘 Wellness", "🐾 Pet Shops", "💇 Salons", "☕ Cafes", "🏥 Clinics", "📚 Tutors", "🔧 Repair Shops"].map((t, i) => (
                  <span key={i} style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", borderRadius: 12, padding: "6px 12px", fontSize: 13 }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ background: "white", borderRadius: 24, padding: 36, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "#004534", marginBottom: 12 }}>Message Sent!</h3>
                <p style={{ color: "#0C6951", fontSize: 15, lineHeight: 1.65 }}>
                  Thank you! Our team will contact you within 24 hours via call and WhatsApp to discuss how we can help your business grow.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#004534", marginBottom: 4 }}>Get a Free Consultation</h3>

                {status === "error" && (
                  <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "12px 16px", fontSize: 14, color: "#dc2626" }}>{errMsg}</div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Full Name *</label>
                    <input name="name" value={form.name} onChange={set} required placeholder="Your name"
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "#004534"}
                      onBlur={e => e.target.style.borderColor = "#CACAFC"} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Phone *</label>
                    <input name="phone" value={form.phone} onChange={set} required type="tel" placeholder="+91 80942 85616"
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "#004534"}
                      onBlur={e => e.target.style.borderColor = "#CACAFC"} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Email Address</label>
                  <input name="email" value={form.email} onChange={set} type="email" placeholder="you@business.com"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#004534"}
                    onBlur={e => e.target.style.borderColor = "#CACAFC"} />
                </div>

                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Business Type *</label>
                  <select name="businessType" value={form.businessType} onChange={set} required
                    style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="">Select your business type</option>
                    <option value="gym">🏋️ Gym / Fitness Center</option>
                    <option value="wellness">🧘 Wellness Center / Spa</option>
                    <option value="petshop">🐾 Pet Shop</option>
                    <option value="salon">💇 Salon / Beauty Parlor</option>
                    <option value="cafe">☕ Cafe / Restaurant</option>
                    <option value="clinic">🏥 Clinic / Medical</option>
                    <option value="tutor">📚 Tutoring / Classes</option>
                    <option value="other">Other Local Business</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Tell Us About Your Business</label>
                  <textarea name="message" value={form.message} onChange={set} rows={3}
                    placeholder="What are your biggest challenges? What goals do you want to achieve?"
                    style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
                    onFocus={e => e.target.style.borderColor = "#004534"}
                    onBlur={e => e.target.style.borderColor = "#CACAFC"} />
                </div>

                <button type="submit" disabled={status === "loading"} style={{
                  background: status === "loading" ? "#9ca3af" : "#D3FF62",
                  color: "#004534", border: "none", borderRadius: 12,
                  padding: "15px", fontSize: 16, fontWeight: 800,
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  transition: "all 0.2s"
                }}>
                  {status === "loading" ? "⏳ Sending..." : "📩 Send Message & Get Free Consultation"}
                </button>
                <p style={{ textAlign: "center", fontSize: 12, color: "#807979" }}>We'll respond within 24 hours. No spam, promise. 🤝</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer style={{ background: "#002920", color: "white", padding: "64px 24px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: 48, marginBottom: 48 }} className="footer-grid">
          <div>
            <div style={{ marginBottom: 16, cursor: "pointer" }} onClick={() => go("home")}>
              <LogoSVG height={42} darkText={false} />
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 20, maxWidth: 280 }}>
              Empowering local businesses with digital solutions. Google Maps, Websites, WhatsApp — all for ₹5,000 one-time.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {["📍", "🌐", "💬"].map((e, i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{e}</div>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: 700, color: "white", marginBottom: 16, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.8px" }}>Services</h4>
            {["Google Maps Optimization", "Website Creation", "WhatsApp Integration"].map((s, i) => (
              <button key={i} onClick={() => go("services")} style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.55)", fontSize: 14, cursor: "pointer", padding: "4px 0", textAlign: "left", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#D3FF62"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}
              >{s}</button>
            ))}
          </div>

          <div>
            <h4 style={{ fontWeight: 700, color: "white", marginBottom: 16, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.8px" }}>Company</h4>
            {[["About", "about"], ["Pricing", "pricing"], ["FAQ", "faq"], ["Contact", "contact"]].map(([l, id], i) => (
              <button key={i} onClick={() => go(id)} style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.55)", fontSize: 14, cursor: "pointer", padding: "4px 0", textAlign: "left", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#D3FF62"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}
              >{l}</button>
            ))}
          </div>

          <div>
            <h4 style={{ fontWeight: 700, color: "white", marginBottom: 16, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.8px" }}>Contact</h4>
            {[
              { emoji: "📧", text: "ydvrahul1906@gmail.com", href: "mailto:ydvrahul1906@gmail.com" },
              { emoji: "📞", text: "+91 80942 85616", href: "tel:+918094285616" },
              { emoji: "📍", text: "Akbarpur Nagar, Ahmedabad" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                <span>{c.emoji}</span>
                {c.href ? (
                  <a href={c.href} style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, textDecoration: "none" }}>{c.text}</a>
                ) : (
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 14 }}>{c.text}</span>
                )}
              </div>
            ))}
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`} target="_blank" rel="noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#25D366", color: "white", borderRadius: 12,
              padding: "10px 16px", fontSize: 13, fontWeight: 700, textDecoration: "none", marginTop: 8
            }}>💬 Chat on WhatsApp</a>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>© {new Date().getFullYear()} LocalRise Digital. All rights reserved.</p>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>Made with ❤️ for local businesses across India</p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// APP
// ============================================================
export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const ids = ["home", "services", "about", "pricing", "faq", "contact"];
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActiveSection(id); }, { threshold: 0.25 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: white; }
        button, input, select, textarea { font-family: inherit; }

        @keyframes floatOrb {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(50px,-50px) scale(1.1); }
          66% { transform: translate(-30px,30px) scale(0.9); }
        }
        @keyframes floatCard {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulseRing {
          0% { transform: translate(-50%,-50%) scale(0.5); opacity: 0.8; }
          100% { transform: translate(-50%,-50%) scale(2.5); opacity: 0; }
        }
        @keyframes sparkle {
          0%,100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.2); }
        }
        @keyframes shine {
          0%,90%,100% { opacity: 0; }
          95% { opacity: 1; }
        }
        @keyframes wa-bounce {
          0%,20%,50%,80%,100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        @media (max-width: 768px) {
          .desk-nav { display: none !important; }
          .mob-btn { display: block !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-visual { display: none !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) {
          .mob-btn { display: none !important; }
        }
      `}</style>

      <NavBar activeSection={activeSection} />
      <Hero />
      <Services />
      <Testimonials />
      <About />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
