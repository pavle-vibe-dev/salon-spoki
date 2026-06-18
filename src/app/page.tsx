"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, HeartHandshake, CalendarCheck } from "lucide-react";

/* ── Slider data ── */
const heroSlides = [
  {
    id: 1,
    badge: "PREMIUM NEGA ZA VAŠEG LJUBIMCA",
    title: "SALON ZA PSE SPOKI\nŠIŠANJE PASA\nNOVI BANOVCI.",
    titleAccent: "ŠIŠANJE PASA\nNOVI BANOVCI.",
    subtitle:
      "Profesionalni tretmani nege, kupanja i šišanja svih rasa pasa. Naš salon se nalazi u Novim Banovcima, a sa ponosom brinemo o ljubimcima iz Batajnice, Stare Pazove i okoline.",
    buttonText: "Zakažite termin",
    buttonHref: "/zakazivanje",
    image: "/images/slide1.png",
    bg: "#fff8f5",
    accent: "var(--color-orange)",
  },
  {
    id: 2,
    badge: "REŠITE SE DLAKA U KUĆI",
    title: "TRETMAN PROTIV\nLINJANJA PASA\nSPOKI SALON.",
    titleAccent: "SPOKI SALON.",
    subtitle:
      "Profesionalno furminiranje i uklanjanje mrtve poddlake za sve rase. Smanjite linjanje kućnih ljubimaca do 90% uz naše specijalne premium tretmane u Novim Banovcima.",
    buttonText: "Pogledajte usluge",
    buttonHref: "/usluge",
    image: "/images/slide2.png",
    bg: "#f5faff",
    accent: "var(--color-blue)",
  },
  {
    id: 3,
    badge: "SVEOBUHVATNA HIGIJENA I SPA",
    title: "KUPANJE I NEGA\nTVOG LJUBIMCA\nSPOKI SALON.",
    titleAccent: "SPOKI SALON.",
    subtitle:
      "Profesionalno kupanje, feniranje, sečenje noktiju i čišćenje ušiju uz upotrebu najkvalitetnije kozmetike. Priuštite svom psu kompletan spa tretman i vrhunsku higijenu u Novim Banovcima.",
    buttonText: "Kontaktirajte nas",
    buttonHref: "/kontakt",
    image: "/images/slide3.jpg",
    bg: "#f5fff8",
    accent: "var(--color-orange)",
  },
];

/* ── Framer Motion ── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const textVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92, x: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE, delay: 0.15 },
  },
};

/* ── Dog category / pricing data ── */
const bundleData = [
  {
    id: 1, image: "/images/dog-categ-1.png", name: "Mali", dogCategory: "1 - 9 kg", color: "#ff4917",
    services: [
      { name: "Kompletan tretman", price: "3.000", list: ["Šišanje", "Kupanje", "Feniranje", "Sređivanje intimne regije", "Seckanje noktića", "Parfemisanje"] },
      { name: "Kupanje", price: "1.000", list: ["Kupanje", "Feniranje", "Parfemisanje"] },
      { name: "Furminiranje", price: "1.800", list: ["Furminiranje", "Češljanje", "Feniranje", "Parfemisanje"] },
    ],
  },
  {
    id: 2, image: "/images/dog-categ-2.png", name: "Srednji", dogCategory: "10 - 19 kg", color: "#fbb040",
    services: [
      { name: "Kompletan tretman", price: "4.000", list: ["Šišanje", "Kupanje", "Feniranje", "Sređivanje intimne regije", "Seckanje noktića", "Parfemisanje"] },
      { name: "Kupanje", price: "1.500", list: ["Kupanje", "Feniranje", "Parfemisanje"] },
      { name: "Furminiranje", price: "2.500", list: ["Furminiranje", "Češljanje", "Feniranje", "Parfemisanje"] },
    ],
  },
  {
    id: 3, image: "/images/dog-categ-3.png", name: "Veliki", dogCategory: "20 - 29 kg", color: "#3f7a8e",
    services: [
      { name: "Kompletan tretman", price: "5.000", list: ["Šišanje", "Kupanje", "Feniranje", "Sređivanje intimne regije", "Seckanje noktića", "Parfemisanje"] },
      { name: "Kupanje", price: "2.000", list: ["Kupanje", "Feniranje", "Parfemisanje"] },
      { name: "Furminiranje", price: "3.000", list: ["Furminiranje", "Češljanje", "Feniranje", "Parfemisanje"] },
    ],
  },
  {
    id: 4, image: "/images/dog-categ-4.png", name: "Extra veliki", dogCategory: "30 - 39 kg", color: "#512772",
    services: [
      { name: "Kompletan tretman", price: "6.000+", list: ["Šišanje", "Kupanje", "Feniranje", "Sređivanje intimne regije", "Seckanje noktića", "Parfemisanje"] },
      { name: "Kupanje", price: "2.500", list: ["Kupanje", "Feniranje", "Parfemisanje"] },
      { name: "Furminiranje", price: "3.500", list: ["Furminiranje", "Češljanje", "Feniranje", "Parfemisanje"] },
    ],
  },
];

/* ── Floating paw prints ── */
const pawPositions = [
  { top: "12%", left: "4%",  size: 22, rotate: -20, opacity: 0.12 },
  { top: "70%", left: "7%",  size: 16, rotate: 15,  opacity: 0.09 },
  { top: "25%", right: "5%", size: 18, rotate: 30,  opacity: 0.10 },
  { top: "80%", right: "8%", size: 24, rotate: -10, opacity: 0.08 },
  { top: "50%", left: "50%", size: 14, rotate: 45,  opacity: 0.06 },
];

function PawIcon({ size = 24, color = "#000958" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill={color}>
      <ellipse cx="20" cy="28" rx="10" ry="13" />
      <ellipse cx="42" cy="18" rx="9"  ry="12" />
      <ellipse cx="64" cy="20" rx="9"  ry="12" />
      <ellipse cx="82" cy="33" rx="9"  ry="12" />
      <path d="M50 40 C28 40 16 55 18 70 C20 82 30 88 50 88 C70 88 80 82 82 70 C84 55 72 40 50 40Z" />
    </svg>
  );
}

/* ── Main Component ── */
export default function Home() {
  const [[activeIdx, direction], setSlide] = useState([0, 0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  /* Pricing — active dog category */
  const [activeCategory, setActiveCategory] = useState(1);
  const activeBundle = bundleData.find((b) => b.id === activeCategory) ?? bundleData[0];

  const slide = heroSlides[activeIdx];

  const goTo = useCallback(
    (nextIdx: number, dir: number) => {
      setSlide([(nextIdx + heroSlides.length) % heroSlides.length, dir]);
    },
    []
  );

  /* Auto-play */
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => goTo(activeIdx + 1, 1), 5500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, activeIdx, goTo]);

  return (
    <div>
      {/* ═══════════════════════════════════════════════
          HERO SLIDER
      ══════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: "calc(100vh - 76px)",
          backgroundColor: slide.bg,
          transition: "background-color 0.7s ease",
        }}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        aria-label="Hero slider"
      >
        {/* Floating paw prints */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {pawPositions.map((p, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: p.top,
                left: (p as { left?: string }).left,
                right: (p as { right?: string }).right,
                opacity: p.opacity,
                rotate: p.rotate,
              }}
              animate={{ y: [0, -10, 0], rotate: [p.rotate, p.rotate + 8, p.rotate] }}
              transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: "easeInOut" }}
            >
              <PawIcon size={p.size} color="var(--color-blue)" />
            </motion.div>
          ))}
        </div>

        {/* Main slide content */}
        <div className="section-container h-full flex items-center py-12 md:py-20">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* LEFT — Text */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`text-${activeIdx}`}
                className="flex flex-col gap-6 order-2 lg:order-1"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
                }}
              >
                {/* Badge */}
                {slide.badge && (
                  <motion.div
                    variants={textVariants}
                    className="inline-flex items-center gap-2 self-start rounded-full px-4 py-1.5"
                    style={{
                      backgroundColor: "rgba(255,73,23,0.10)",
                      border: "1px solid rgba(255,73,23,0.25)",
                    }}
                  >
                    <PawIcon size={14} color="var(--color-orange)" />
                    <span
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: "var(--color-orange)", fontFamily: "var(--font-fredoka), Fredoka, sans-serif" }}
                    >
                      {slide.badge}
                    </span>
                  </motion.div>
                )}

                {/* Heading */}
                <motion.h1
                  variants={textVariants}
                  style={{
                    fontFamily: 'var(--font-passion-one), "Passion One", sans-serif',
                    fontSize: "clamp(2.6rem, 6vw, 5rem)",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "-0.02em",
                    color: "var(--color-blue)",
                    lineHeight: 1.0,
                    whiteSpace: "pre-line",
                  }}
                >
                  {slide.title.replace(slide.titleAccent, "")}
                  <span style={{ color: "var(--color-orange)" }}>{slide.titleAccent}</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  variants={textVariants}
                  className="text-base md:text-lg leading-relaxed max-w-lg"
                  style={{ color: "var(--color-blue-secondary)" }}
                >
                  {slide.subtitle}
                </motion.p>

                {/* CTA buttons */}
                <motion.div variants={textVariants} className="flex items-center gap-4 flex-wrap">
                  <Link
                    href={slide.buttonHref}
                    className="btn"
                    style={{ fontFamily: "var(--font-fredoka), Fredoka, sans-serif", fontWeight: 600 }}
                  >
                    {slide.buttonText}
                  </Link>
                </motion.div>


              </motion.div>
            </AnimatePresence>

            {/* RIGHT — Dog image */}
            <div className="relative flex justify-center items-center order-1 lg:order-2" style={{ maxWidth: "100%" }}>
              {/* Slide image — perfect circle with border, shadow, and floating animation */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`img-${activeIdx}`}
                    custom={direction}
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.35 } }}
                    className="relative z-20 rounded-full overflow-hidden shadow-xl border-2 border-[#FF4E11] p-1 bg-white transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl"
                    style={{ width: "min(400px, 85vw)", height: "min(400px, 85vw)", maxWidth: "100%" }}
                  >
                    <Image
                      src={slide.image}
                      alt={`Slide ${activeIdx + 1} — ${slide.title}`}
                      fill
                      sizes="(max-width: 768px) 85vw, 400px"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                      priority={activeIdx === 0}
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>


            </div>
          </div>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={() => goTo(activeIdx - 1, -1)}
          aria-label="Prethodni slajd"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-md"
          style={{ backgroundColor: "#ffffff", color: "var(--color-orange-light)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-orange)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--color-orange-light)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
        >
          <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
            <path d="M165.66 202.34a8 8 0 01-11.32 11.32l-80-80a8 8 0 010-11.32l80-80a8 8 0 0111.32 11.32L91.31 128z" />
          </svg>
        </button>

        <button
          onClick={() => goTo(activeIdx + 1, 1)}
          aria-label="Sledeći slajd"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-md"
          style={{ backgroundColor: "#ffffff", color: "var(--color-orange-light)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-orange)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--color-orange-light)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
        >
          <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
            <path d="M181.66 133.66l-80 80a8 8 0 01-11.32-11.32L164.69 128 90.34 53.66a8 8 0 0111.32-11.32l80 80a8 8 0 010 11.32z" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > activeIdx ? 1 : -1)}
              aria-label={`Slajd ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width: i === activeIdx ? "28px" : "10px",
                height: "10px",
                borderRadius: "5px",
                backgroundColor: i === activeIdx ? "var(--color-orange)" : "rgba(255,73,23,0.3)",
                border: "none",
                outline: "none",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div
          className="absolute bottom-8 right-6 z-30 text-sm font-bold tabular-nums"
          style={{ color: "var(--color-blue-secondary)", fontFamily: "var(--font-fredoka), Fredoka, sans-serif" }}
        >
          {String(activeIdx + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          ZAŠTO SPOKI? — Why Spoki?
      ══════════════════════════════════════════════ */}
      <section
        aria-label="Zašto Spoki"
        style={{ backgroundColor: "var(--color-body)", padding: "6rem 0" }}
      >
        <div className="section-container">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2
              style={{
                fontFamily: 'var(--font-passion-one), "Passion One", sans-serif',
                fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                fontWeight: 700,
                color: "var(--color-blue)",
                marginBottom: "0.75rem",
              }}
            >
              Zašto Spoki?
            </h2>
            <p style={{ color: "var(--color-blue-secondary)", fontSize: "1.05rem" }}>
              Tri razloga zašto nam vlasnici pasa veruju
            </p>
          </div>

          {/* 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            {/* Col 1 — Premium Kozmetika */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
              className="card"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "3rem 2rem",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,73,23,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                  color: "var(--color-orange)",
                }}
              >
                <Sparkles size={32} />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-fredoka), Fredoka, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  color: "var(--color-blue)",
                  marginBottom: "0.75rem",
                }}
              >
                Premium Kozmetika
              </h3>
              <p style={{ color: "var(--color-blue-secondary)", fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>
                Koristimo isključivo vrhunske, profesionalne i antialergijske šampone i regeneratore
                prilagođene tipu dlake vašeg ljubimca.
              </p>
            </motion.div>

            {/* Col 2 — Strpljenje i Ljubav */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
              className="card"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "3rem 2rem",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,73,23,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                  color: "var(--color-orange)",
                }}
              >
                <HeartHandshake size={32} />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-fredoka), Fredoka, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  color: "var(--color-blue)",
                  marginBottom: "0.75rem",
                }}
              >
                Strpljenje i Ljubav
              </h3>
              <p style={{ color: "var(--color-blue-secondary)", fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>
                Pristupamo svakom psu individualno, polako i bez stresa. Sigurnost i udobnost vašeg
                psa su nam na prvom mestu.
              </p>
            </motion.div>

            {/* Col 3 — Online Zakazivanje */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
              className="card"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "3rem 2rem",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,73,23,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                  color: "var(--color-orange)",
                }}
              >
                <CalendarCheck size={32} />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-fredoka), Fredoka, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  color: "var(--color-blue)",
                  marginBottom: "0.75rem",
                }}
              >
                Online Zakazivanje
              </h3>
              <p style={{ color: "var(--color-blue-secondary)", fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>
                Zaboravite na beskrajne telefonske pozive. Izaberite veličinu psa, tretman i zakažite
                termin preko našeg sajta za manje od 2 minuta.
              </p>
            </motion.div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-12">
            <Link
              href="/zakazivanje"
              className="btn"
              style={{
                fontFamily: "var(--font-fredoka), Fredoka, sans-serif",
                fontWeight: 600,
                fontSize: "1.1rem",
                padding: "1rem 2.5rem",
              }}
            >
              Zakažite termin odmah
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          HOW BIG YOUR DOG IS? — Pricing
      ══════════════════════════════════════════════ */}
      <section
        aria-label="Kategorije pasa i cene"
        style={{ backgroundColor: "#ffffff", padding: "6rem 0" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-12">

          {/* Heading */}
          <div className="text-center mb-14">
            <h2
              style={{
                fontFamily: 'var(--font-passion-one), "Passion One", sans-serif',
                fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                fontWeight: 700,
                color: "var(--color-blue)",
                marginBottom: "0.75rem",
              }}
            >
              Koliko je veliki Vaš pas?
            </h2>
            <p style={{ color: "var(--color-blue-secondary)", fontSize: "1.05rem" }}>
              Izaberite kategoriju Vašeg psa
            </p>
          </div>

          {/* Dog category circles */}
          <div className="flex flex-wrap justify-between gap-y-10 gap-x-4 mb-20 w-full">
            {bundleData.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex flex-col items-center gap-4 transition-all duration-200"
                  style={{ cursor: "pointer", border: "none", background: "none", outline: "none" }}
                >
                  <div
                    style={{
                      width: "clamp(120px, 22vw, 200px)",
                      height: "clamp(120px, 22vw, 200px)",
                      borderRadius: "50%",
                      backgroundColor: isActive ? cat.color : "#f0f0f8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      boxShadow: isActive ? `0 0 0 4px ${cat.color}44, 0 8px 24px ${cat.color}33` : "0 4px 12px rgba(0,9,88,0.08)",
                      transform: isActive ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    <div
                      style={{
                        width: "75%",
                        height: "75%",
                        position: "relative",
                      }}
                    >
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 768px) 22vw, 200px"
                        style={{ objectFit: "contain", objectPosition: "center" }}
                      />
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-fredoka), Fredoka, sans-serif",
                      fontWeight: 700,
                      fontSize: "1.25rem",
                      color: isActive ? cat.color : "var(--color-blue)",
                      transition: "color 0.2s",
                    }}
                  >
                    {cat.name}
                  </span>
                  <span
                    style={{
                      fontSize: "1rem",
                      color: "var(--color-blue-secondary)",
                      marginTop: "-0.3rem",
                    }}
                  >
                    {cat.dogCategory}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            {activeBundle.services.map((service, idx) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: idx * 0.1 }}
                className="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "3rem 2rem",
                  position: "relative",
                  overflow: "hidden",
                  borderTop: `4px solid ${activeBundle.color}`,
                }}
              >
                {/* Price */}
                <div
                  style={{
                    fontSize: "clamp(2.4rem, 4vw, 3.6rem)",
                    fontFamily: 'var(--font-passion-one), "Passion One", sans-serif',
                    fontWeight: 700,
                    color: "var(--color-orange)",
                    marginBottom: "0.25rem",
                    lineHeight: 1,
                  }}
                >
                  {service.price}
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--color-blue-secondary)",
                    marginBottom: "1.25rem",
                  }}
                >
                  RSD
                </div>

                {/* Plan name */}
                <h3
                  style={{
                    fontFamily: "var(--font-fredoka), Fredoka, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    color: "var(--color-blue)",
                    marginBottom: "1.25rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {service.name}
                </h3>

                {/* Divider */}
                <div
                  style={{
                    width: "36px",
                    height: "3px",
                    borderRadius: "2px",
                    backgroundColor: activeBundle.color,
                    marginBottom: "1.25rem",
                  }}
                />

                {/* Service list */}
                <ul style={{ width: "100%", listStyle: "none", padding: 0, margin: 0 }}>
                  {service.list.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.45rem 0",
                        fontSize: "0.95rem",
                        color: "var(--color-blue-secondary)",
                        textAlign: "left",
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 256 256" fill={activeBundle.color} style={{ flexShrink: 0 }}>
                        <path d="M229.66 77.66l-128 128a8 8 0 01-11.32 0l-56-56a8 8 0 0111.32-11.32L96 188.69 218.34 66.34a8 8 0 0111.32 11.32z" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

              </motion.div>
            ))}
          </div>

          {/* Guide CTA */}
          <div className="flex justify-center mt-16">
            <Link
              href="/vodic-za-velicine"
              className="inline-flex items-center gap-3"
              style={{
                fontFamily: "var(--font-fredoka), Fredoka, sans-serif",
                fontWeight: 600,
                fontSize: "1.05rem",
                color: "#ffffff",
                backgroundColor: "var(--color-orange)",
                padding: "1rem 2.5rem",
                borderRadius: "9999px",
                textDecoration: "none",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 20px rgba(255,73,23,0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-orange-hover)";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(255,73,23,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-orange)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,73,23,0.35)";
              }}
            >
              <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
                <path d="M216 40H40a16 16 0 00-16 16v144a16 16 0 0016 16h176a16 16 0 0016-16V56a16 16 0 00-16-16zm0 160H40V56h176z" />
                <path d="M176 96a8 8 0 01-8 8H88a8 8 0 010-16h80a8 8 0 018 8zm0 32a8 8 0 01-8 8H88a8 8 0 010-16h80a8 8 0 018 8zm-24 32a8 8 0 01-8 8h-48a8 8 0 010-16h48a8 8 0 018 8z" />
              </svg>
              Pogledajte detaljan vodič po rasama
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
