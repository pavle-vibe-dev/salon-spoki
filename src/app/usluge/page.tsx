"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const servicesDetail = [
  {
    title: "Kompletan tretman",
    image: "/images/service-grooming.jpg",
    description:
      "Sveobuhvatna nega koja uključuje kupanje profesionalnim šamponima prilagođenim tipu dlake, feniranje, temeljno raščešljavanje, šišanje u skladu sa standardima rase ili željama vlasnika, higijenu ušiju i očiju, i završni parfem za pse.",
  },
  {
    title: "Kupanje i feniranje",
    image: "/images/service-bath.jpg",
    description:
      "Tretman namenjen održavanju higijene između dva šišanja. Koristimo vrhunsku kozmetiku koja hrani dlaku, a profesionalno feniranje i izduvavanje uklanja svu mrtvu dlaku i nečistoće sa kože.",
  },
  {
    title: "Furminiranje (Uklanjanje poddlake)",
    image: "/images/service-brushing.jpg",
    description:
      "Spas protiv linjanja! Specijalnim alatima detaljno izvlačimo mrtvu poddlaku kod rasa koje se ne šišaju (poput labradora, retrivera, haskija, samojeda). Smanjuje linjanje u kući i do 80%.",
  },
  {
    title: "Higijenski tretman (Intimna regija i šape)",
    image: "/images/service-paw.jpg",
    description:
      "Fokusiran na kritične zone. Obuhvata brijanje dlaka između jastučića na šapama (kako se ne bi skupljali blato i čičkovi), skraćivanje noktiju i pažljivo uređivanje intimne regije iz higijenskih razloga.",
  },
];

export default function Usluge() {
  return (
    <div>
      {/* ═══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: "var(--color-body)",
          padding: "8rem 0 6rem",
        }}
      >
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
              style={{
                backgroundColor: "rgba(255,73,23,0.10)",
                border: "1px solid rgba(255,73,23,0.25)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 100 100" fill="var(--color-orange)">
                <ellipse cx="20" cy="28" rx="10" ry="13" />
                <ellipse cx="42" cy="18" rx="9" ry="12" />
                <ellipse cx="64" cy="20" rx="9" ry="12" />
                <ellipse cx="82" cy="33" rx="9" ry="12" />
                <path d="M50 40 C28 40 16 55 18 70 C20 82 30 88 50 88 C70 88 80 82 82 70 C84 55 72 40 50 40Z" />
              </svg>
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--color-orange)", fontFamily: "var(--font-fredoka), Fredoka, sans-serif" }}
              >
                Premium Pet Grooming
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-passion-one), "Passion One", sans-serif',
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
              fontWeight: 700,
              color: "var(--color-blue)",
              marginBottom: "1.25rem",
              lineHeight: 1.05,
            }}
          >
            Naše Usluge &<br />
            <span style={{ color: "var(--color-orange)" }}>Profesionalni Tretmani</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            style={{
              maxWidth: "640px",
              margin: "0 auto",
              color: "var(--color-blue-secondary)",
              fontSize: "1.1rem",
              lineHeight: 1.7,
            }}
          >
            Svakom ljubimcu pristupamo sa puno ljubavi, strpljenja i vrhunskom kozmetikom.
            Pogledajte kako negujemo Vašeg najboljeg prijatelja.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          USLUGE — Detaljan pregled
      ══════════════════════════════════════════════ */}
      <section
        aria-label="Detaljan pregled usluga"
        style={{ backgroundColor: "#ffffff", padding: "6rem 0" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-12">

          <div className="text-center mb-14">
            <h2
              style={{
                fontFamily: 'var(--font-passion-one), "Passion One", sans-serif',
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 700,
                color: "var(--color-blue)",
                marginBottom: "0.75rem",
              }}
            >
              Detaljan pregled naših usluga
            </h2>
            <p style={{ color: "var(--color-blue-secondary)", fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto" }}>
              Sve što treba da znate o tretmanima koje pružamo — od šišanja do higijenskog tretmana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {servicesDetail.map((svc, idx) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: EASE, delay: idx * 0.1 }}
                className="group"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "24px",
                  boxShadow: "0 4px 24px rgba(0,9,88,0.06)",
                  border: "1px solid rgba(0,9,88,0.07)",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 12px 48px rgba(0,9,88,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,9,88,0.06)";
                }}
              >
                {/* Image */}
                <div
                  style={{
                    width: "100%",
                    height: "clamp(200px, 30vw, 280px)",
                    position: "relative",
                    overflow: "hidden",
                    backgroundColor: "var(--color-body)",
                  }}
                >
                  <Image
                    src={svc.image}
                    alt={svc.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </div>

                {/* Content */}
                <div style={{ padding: "2rem 2rem 2.5rem" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-fredoka), Fredoka, sans-serif",
                      fontWeight: 700,
                      fontSize: "1.3rem",
                      color: "var(--color-blue)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {svc.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--color-blue-secondary)",
                      fontSize: "0.95rem",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {svc.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: "var(--color-body)",
          padding: "6rem 0",
          textAlign: "center",
        }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-passion-one), "Passion One", sans-serif',
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 700,
                color: "var(--color-blue)",
                marginBottom: "0.75rem",
                lineHeight: 1.2,
              }}
            >
              Vaš ljubimac zaslužuje kraljevski tretman.
            </h2>
            <p
              style={{
                color: "var(--color-blue-secondary)",
                fontSize: "1.1rem",
                marginBottom: "2rem",
              }}
            >
              Izabrali ste uslugu?
            </p>
            <Link
              href="/zakazivanje"
              className="btn"
              style={{
                fontFamily: "var(--font-fredoka), Fredoka, sans-serif",
                fontWeight: 600,
                fontSize: "1.1rem",
                paddingInline: "3.5rem",
                height: "64px",
                textDecoration: "none",
              }}
            >
              ZAKAŽITE ODMAH
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
